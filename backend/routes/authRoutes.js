import { Router } from 'express'
import { login, me } from '../controllers/AuthController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()
router.post('/login', login)
router.get('/me', authMiddleware, me)
export default router
