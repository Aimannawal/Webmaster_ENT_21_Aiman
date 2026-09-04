import jwt from 'jsonwebtoken'
import { findById } from '../models/AdminModel.js'

export default async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : null
    if (!token) return res.status(401).json({ success: false, message: 'Token tidak ditemukan' })
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'portal-berita-secret')
    const admin = await findById(payload.id)
    if (!admin) return res.status(401).json({ success: false, message: 'Admin tidak ditemukan' })
    req.admin = admin
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Token tidak valid' })
  }
}
