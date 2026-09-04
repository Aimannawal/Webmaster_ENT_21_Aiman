import { Router } from 'express'
import * as controller from '../controllers/KategoriController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()
router.get('/', controller.getAll)
router.post('/', authMiddleware, controller.create)
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.remove)
export default router
