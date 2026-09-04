import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findByEmail } from '../models/AdminModel.js'

export async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.status(422).json({ success: false, message: 'Email dan password wajib diisi' })
  const admin = await findByEmail(email)
  if (!admin || !(await bcrypt.compare(password, admin.password))) return res.status(401).json({ success: false, message: 'Email atau password salah' })
  const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET || 'portal-berita-secret', { expiresIn: '7d' })
  const { password: _password, ...safeAdmin } = admin
  res.json({ success: true, data: { token, admin: safeAdmin } })
}

export function me(req, res) { res.json({ success: true, data: req.admin }) }
