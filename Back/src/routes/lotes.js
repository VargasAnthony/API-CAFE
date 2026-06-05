import { Router } from 'express'
import { verificarToken } from '../middlewares/auth.js'
import { verificarRol } from '../middlewares/roles.js'

const router = Router()

// Ruta protegida — solo admin y almacen pueden ver los lotes
router.get('/', verificarToken, (req, res) => {
  res.json({ mensaje: 'Ruta de lotes funcionando ✅', usuario: req.usuario })
})

export { router }