import { pool } from '../config/db.js'

const encontrarPorEmail = async (email) => {
  const resultado = await pool.query(
    'SELECT * FROM usuario WHERE email = $1',
    [email]
  )
  return resultado.rows[0]
}

export { encontrarPorEmail }