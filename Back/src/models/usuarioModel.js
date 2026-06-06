import { pool } from '../config/db.js'

const encontrarPorEmail = async (email) => {
  const resultado = await pool.query(
    'SELECT * FROM usuario WHERE email = $1',
    [email]
  )
  return resultado.rows[0]
}


const obtenerTodos = async () => {
  const resultado = await pool.query(
    'SELECT id, nombre, apellido, email, rol_id FROM usuario ORDER BY nombre ASC'
  )
  return resultado.rows
}

const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    'SELECT * FROM usuario WHERE id = $1',
    [id]
  )
  return resultado.rows[0]
}

const desactivarUsuario = async (id) => {
  const resultado = await pool.query(
    'UPDATE usuario SET activo = false WHERE id = $1 RETURNING *',
    [id]
  )
  return resultado.rows[0]
}

export { encontrarPorEmail, obtenerTodos, obtenerPorId, desactivarUsuario }