import { Router } from "express"
import { verificarToken } from "../middlewares/auth.js"
import { registrarVenta } from "../controllers/ventaController.js"

const router = Router()

router.post('/', verificarToken, registrarVenta)

export { router }