import { Router } from 'express'
import { verificarToken } from '../middlewares/auth.js'
import { getUsuarios, getUsuariosPorId, desactivarUsuario } from '../controllers/usuarioController.js'


const router = Router()

router.get('/', verificarToken, getUsuarios)
router.get('/:id', verificarToken, getUsuariosPorId)
router.put('/:id/desactivar', verificarToken, desactivarUsuario)

export { router }
