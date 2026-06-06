import { Router } from 'express'
import { verificarToken } from '../middlewares/auth.js'
import { getReporteVentas, getReporteStock, getReporteCompras } from '../controllers/reporteController.js'

const router = Router()

// ?periodo=week, ?periodo=month, ?periodo=year
router.get('/ventas', verificarToken, getReporteVentas)
router.get('/stock', verificarToken, getReporteStock)
router.get('/compras', verificarToken, getReporteCompras)

export { router }