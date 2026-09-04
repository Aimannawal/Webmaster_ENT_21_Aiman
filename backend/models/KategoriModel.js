import pool from '../config/db.js'

export const getAll = async () => {
  const [rows] = await pool.execute('SELECT id, nama, slug, created_at FROM kategori ORDER BY nama ASC')
  return rows
}

export const getById = async (id) => {
  const [rows] = await pool.execute('SELECT id, nama, slug, created_at FROM kategori WHERE id = ? LIMIT 1', [id])
  return rows[0] || null
}

export const create = async ({ nama, slug }) => {
  const [result] = await pool.execute('INSERT INTO kategori (nama, slug) VALUES (?, ?)', [nama, slug])
  return getById(result.insertId)
}

export const update = async (id, { nama, slug }) => {
  await pool.execute('UPDATE kategori SET nama = ?, slug = ? WHERE id = ?', [nama, slug, id])
  return getById(id)
}

export const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM kategori WHERE id = ?', [id])
  return result.affectedRows > 0
}
