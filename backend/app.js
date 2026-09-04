import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import kategoriRoutes from './routes/kategoriRoutes.js'
import beritaRoutes from './routes/beritaRoutes.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const allowedOrigins = ['http://localhost:3001', 'http://127.0.0.1:3001']
app.use((req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Origin tidak diizinkan oleh CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
}))
app.options(/.*/, cors({ origin: allowedOrigins, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))
app.get('/api/health', (_req, res) => res.json({ success: true, message: 'API is running' }))
app.use('/api/auth', authRoutes)
app.use('/api/kategori', kategoriRoutes)
app.use('/api/berita', beritaRoutes)
app.use((_req, res) => res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' }))
app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(error.status || 500).json({ success: false, message: error.message || 'Terjadi kesalahan server' })
})

const port = Number(process.env.PORT) || 3001
app.listen(port, () => console.log(`API berjalan di http://localhost:${port}`))
