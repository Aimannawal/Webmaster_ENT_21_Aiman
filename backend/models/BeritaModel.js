import pool from '../config/db.js'

const selectColumns = `
  SELECT b.id, b.judul, b.slug, b.kategori_id, b.admin_id, b.thumbnail, b.ringkasan, b.isi,
    b.status, b.views, b.created_at, b.updated_at, k.nama AS kategori_nama, k.slug AS kategori_slug,
    a.nama AS penulis
  FROM berita b
  LEFT JOIN kategori k ON k.id = b.kategori_id
  LEFT JOIN admins a ON a.id = b.admin_id
`

export const getAll = async ({ search = '', kategori = '', status = '', page = 1, limit = 9 }) => {
  const conditions = []
  const values = []
  if (search) { conditions.push('b.judul LIKE ?'); values.push(`%${search}%`) }
  if (kategori) { conditions.push('(k.slug = ? OR b.kategori_id = ?)'); values.push(kategori, Number(kategori) || 0) }
  if (status) { conditions.push('b.status = ?'); values.push(status) }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const offset = (page - 1) * limit
  const [rows] = await pool.execute(`${selectColumns} ${where} ORDER BY b.created_at DESC LIMIT ? OFFSET ?`, [...values, limit, offset])
  const [countRows] = await pool.execute(`SELECT COUNT(*) AS total FROM berita b LEFT JOIN kategori k ON k.id = b.kategori_id ${where}`, values)
  return { rows, total: countRows[0].total }
}

export const getBySlug = async (slug) => {
  const [rows] = await pool.execute(`${selectColumns} WHERE b.slug = ? LIMIT 1`, [slug])
  return rows[0] || null
}

export const getById = async (id) => {
  const [rows] = await pool.execute(`${selectColumns} WHERE b.id = ? LIMIT 1`, [id])
  return rows[0] || null
}

export const create = async (data) => {
  const [result] = await pool.execute(
    'INSERT INTO berita (judul, slug, kategori_id, admin_id, thumbnail, ringkasan, isi, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [data.judul, data.slug, data.kategori_id || null, data.admin_id, data.thumbnail || null, data.ringkasan, data.isi, data.status || 'draft']
  )
  return getById(result.insertId)
}

export const update = async (id, data) => {
  const fields = ['judul = ?', 'slug = ?', 'kategori_id = ?', 'ringkasan = ?', 'isi = ?', 'status = ?']
  const values = [data.judul, data.slug, data.kategori_id || null, data.ringkasan, data.isi, data.status || 'draft']
  if (data.thumbnail !== undefined) { fields.push('thumbnail = ?'); values.push(data.thumbnail) }
  values.push(id)
  await pool.execute(`UPDATE berita SET ${fields.join(', ')} WHERE id = ?`, values)
  return getById(id)
}

export const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM berita WHERE id = ?', [id])
  return result.affectedRows > 0
}

export const incrementViews = async (id) => {
  await pool.execute('UPDATE berita SET views = views + 1 WHERE id = ?', [id])
}
