import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verificarToken = (req, res, next) => {
  // 1. Leer el token del header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  // 2. Si no hay token, rechazar
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado, token requerido' })
  }

  // 3. Verificar que el token sea válido
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

export { verificarToken }