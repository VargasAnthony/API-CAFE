import { Router } from 'express'
import { verificarToken } from '../middlewares/auth.js'
import { getProductos, getProductosPorId, crearProducto } from '../controllers/productoController.js'


const router = Router()

router.get('/', verificarToken, getProductos)
router.get('/:id', verificarToken, getProductosPorId)
router.post('/', verificarToken, crearProducto)

export { router }