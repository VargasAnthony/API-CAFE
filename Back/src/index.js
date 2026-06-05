import express from 'express'
import dotenv from 'dotenv'
import { pool } from './config/db.js'
import { router as authRouter } from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/auth', authRouter)

// Probar conexión a la base de datos
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Conectado a PostgreSQL - Supabase'))
  .catch((err) => console.error('❌ Error conectando a la BD:', err))

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Bienvenido a la API de Café Ecovaar! ☕' })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})

