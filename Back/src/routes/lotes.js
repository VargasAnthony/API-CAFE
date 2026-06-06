import { Router } from 'express'
import { verificarToken } from '../middlewares/auth.js'
import { getLotes, getLotePorId, crearLote } from '../controllers/loteController.js'

const router = Router()

router.get('/', verificarToken, getLotes)
router.get('/:id', verificarToken, getLotePorId)
router.post('/', verificarToken, crearLote)

export { router }