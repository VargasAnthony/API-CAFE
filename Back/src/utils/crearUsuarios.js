import bcrypt from 'bcryptjs'
import { pool } from '../config/db.js'
import dotenv from 'dotenv'

dotenv.config()

const password_hash = await bcrypt.hash('123456', 10)

await pool.query(
  `INSERT INTO usuario (nombre, apellido, email, password_hash, rol_id)
   VALUES ($1, $2, $3, $4, (SELECT id FROM rol WHERE nombre_rol = 'admin'))`,
  ['Admin', 'Ecovaar', 'admin@ecovaar.com', password_hash]
)

console.log('✅ Usuario admin creado')
process.exit()