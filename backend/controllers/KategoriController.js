import * as Kategori from '../models/KategoriModel.js'

const slugify = (value) => value.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export async function getAll(_req, res) { res.json({ success: true, data: await Kategori.getAll() }) }
export async function create(req, res) {
  const nama = req.body.nama?.trim()
  if (!nama) return res.status(422).json({ success: false, message: 'Nama kategori wajib diisi' })
  res.status(201).json({ success: true, data: await Kategori.create({ nama, slug: slugify(req.body.slug || nama) }) })
}
export async function update(req, res) {
  const nama = req.body.nama?.trim()
  if (!nama) return res.status(422).json({ success: false, message: 'Nama kategori wajib diisi' })
  const item = await Kategori.update(req.params.id, { nama, slug: slugify(req.body.slug || nama) })
  if (!item) return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' })
  res.json({ success: true, data: item })
}
export async function remove(req, res) {
  const beritaCount = await Kategori.countBerita(req.params.id)
  if (beritaCount > 0) {
    return res.status(409).json({
      success: false,
      message: `Kategori masih digunakan oleh ${beritaCount} berita`,
      data: { beritaCount }
    })
  }
  res.json({ success: true, data: await Kategori.remove(req.params.id) })
}
