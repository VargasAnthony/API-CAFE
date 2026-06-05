// Importar el pool de pg y dotenv
import { Pool } from 'pg'
import dotenv from 'dotenv'

// Cargar las variables del .env
dotenv.config()

// Crear el pool de conexiones usando DATABASE_URL del .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Exportar el pool para usarlo en otros archivos
export { pool }