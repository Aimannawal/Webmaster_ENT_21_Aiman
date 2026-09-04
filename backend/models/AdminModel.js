import pool from '../config/db.js'

export const findByEmail = async (email) => {
  const [rows] = await pool.execute('SELECT id, nama, email, password, avatar, created_at, updated_at FROM admins WHERE email = ? LIMIT 1', [email])
  return rows[0] || null
}

export const findById = async (id) => {
  const [rows] = await pool.execute('SELECT id, nama, email, avatar, created_at, updated_at FROM admins WHERE id = ? LIMIT 1', [id])
  return rows[0] || null
}
