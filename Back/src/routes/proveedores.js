import { Router } from 'express'
import { verificarToken } from '../middlewares/auth.js'
import { getProveedores, getProveedorPorId, crearProveedor } from '../controllers/proveedorController.js'

const router = Router()

router.get('/', verificarToken, getProveedores)
router.get('/:id', verificarToken, getProveedorPorId)
router.post('/', verificarToken, crearProveedor)

export { router }