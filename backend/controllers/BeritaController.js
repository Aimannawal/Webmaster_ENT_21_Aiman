import * as Berita from '../models/BeritaModel.js'

const slugify = (value) => value.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const payload = (body, adminId, thumbnail) => ({
  judul: body.judul?.trim(), slug: slugify(body.slug || body.judul || ''), kategori_id: body.kategori_id ? Number(body.kategori_id) : null,
  admin_id: adminId, thumbnail, ringkasan: body.ringkasan?.trim(), isi: body.isi?.trim(), status: body.status === 'published' ? 'published' : 'draft'
})
const validate = (data) => !data.judul || !data.ringkasan || !data.isi

export async function getAll(req, res) {
  const isAdmin = Boolean(req.admin)
  const page = Math.max(Number(req.query.page) || 1, 1)
  const limit = Math.min(Math.max(Number(req.query.limit) || 9, 1), 50)
  const filters = { ...req.query, page, limit, status: isAdmin ? req.query.status : 'published' }
  const result = await Berita.getAll(filters)
  res.json({ success: true, data: result.rows, pagination: { page, limit, total: result.total, totalPages: Math.ceil(result.total / limit) } })
}

export async function getBySlug(req, res) {
  const item = await Berita.getBySlug(req.params.slug)
  if (!item || item.status !== 'published') return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' })
  await Berita.incrementViews(item.id)
  item.views += 1
  res.json({ success: true, data: item })
}

export async function getById(req, res) {
  const item = await Berita.getById(req.params.id)
  if (!item) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' })
  res.json({ success: true, data: item })
}

export async function create(req, res) {
  const data = payload(req.body, req.admin.id, req.file ? `/uploads/${req.file.filename}` : null)
  if (validate(data)) return res.status(422).json({ success: false, message: 'Judul, ringkasan, dan isi wajib diisi' })
  res.status(201).json({ success: true, data: await Berita.create(data) })
}

export async function update(req, res) {
  const existing = await Berita.getById(req.params.id)
  if (!existing) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' })
  const data = payload(req.body, req.admin.id, req.file ? `/uploads/${req.file.filename}` : existing.thumbnail)
  if (validate(data)) return res.status(422).json({ success: false, message: 'Judul, ringkasan, dan isi wajib diisi' })
  res.json({ success: true, data: await Berita.update(req.params.id, data) })
}

export async function remove(req, res) { res.json({ success: true, data: await Berita.remove(req.params.id) }) }
