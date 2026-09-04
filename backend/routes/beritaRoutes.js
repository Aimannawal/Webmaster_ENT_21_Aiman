import { Router } from 'express'
import * as controller from '../controllers/BeritaController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'

const router = Router()
const optionalAuth = (req, _res, next) => {
  if (!req.headers.authorization) return next()
  return authMiddleware(req, _res, next)
}
router.get('/', optionalAuth, controller.getAll)
router.get('/id/:id', authMiddleware, controller.getById)
router.get('/:slug', controller.getBySlug)
router.post('/', authMiddleware, upload.single('thumbnail'), controller.create)
router.put('/:id', authMiddleware, upload.single('thumbnail'), controller.update)
router.delete('/:id', authMiddleware, controller.remove)
export default router
