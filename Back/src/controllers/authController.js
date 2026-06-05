import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { encontrarPorEmail } from '../models/usuarioModel.js'

const login = async (req, res) => {
  try {
    // 1. Extraer email y password del body
    const { email, password } = req.body

    // 2. Buscar el usuario en la BD
    const usuario = await encontrarPorEmail(email)
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    // 3. Verificar la contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password_hash)
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    // 4. Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id, rol_id: usuario.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    res.json({ token })

  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export { login }