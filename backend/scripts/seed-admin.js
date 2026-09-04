import bcrypt from 'bcrypt'
import pool from '../config/db.js'

const password = await bcrypt.hash('admin123', 10)
await pool.execute(
  `INSERT INTO admins (nama, email, password) VALUES (?, ?, ?)
   ON DUPLICATE KEY UPDATE nama = VALUES(nama), password = VALUES(password)`,
  ['Aiman', 'admin@portalberita.test', password]
)
console.log('Admin siap: admin@portalberita.test / admin123')
await pool.end()
