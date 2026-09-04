import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'

const uploadDir = path.resolve('public/uploads')
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`)
})

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true)
  else cb(new Error('File harus berupa gambar'))
}

export default multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })
