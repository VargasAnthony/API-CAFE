import express from 'express'
import dotenv from 'dotenv'
import { pool } from './config/db.js'
import { router as authRouter } from './routes/auth.js'
import { router as lotesRouter } from './routes/lotes.js'
import { router as proveedoresRouter } from './routes/proveedores.js'
import { router as productosRouter } from './routes/productos.js'
import { router as ventasRouter } from './routes/ventas.js'
import { router as usuariosRouter } from './routes/usuarios.js'
import { router as reportesRouter } from './routes/reportes.js'



dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/lotes', lotesRouter)
app.use('/api/proveedores', proveedoresRouter)
app.use('/api/productos', productosRouter)
app.use('/api/ventas', ventasRouter)
app.use('/api/usuarios', usuariosRouter)
app.use('/api/reportes', reportesRouter)

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

