import { Router } from 'express'
import { verificarToken } from '../middlewares/auth.js'
import { getUsuarios, getUsuariosPorId, desactivarUsuario, postUsuario, getRoles } from '../controllers/usuarioController.js'


const router = Router()

router.get('/roles', verificarToken, getRoles)
router.get('/', verificarToken, getUsuarios)
router.get('/:id', verificarToken, getUsuariosPorId)
router.post('/', verificarToken, postUsuario)
router.put('/:id/desactivar', verificarToken, desactivarUsuario)


export { router }