import { pool } from '../config/db.js'

const obtenerTodos = async () => {
  const resultado = await pool.query(
    'SELECT * FROM proveedores ORDER BY nombre ASC'
  )
  return resultado.rows
}

const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    'SELECT * FROM proveedores WHERE id = $1',
    [id]
  )
  return resultado.rows[0]
}

const crearProveedor = async (datos) => {
  const { nombre, contacto, telefono} = datos

  const resultado = await pool.query(
    'INSERT INTO lote (nombre, contacto, telefono) VALUES ($1, $2, $3) RETURNING *',
    [nombre, contacto, telefono]
  )
  return resultado.rows[0]
}

export { obtenerTodos, obtenerPorId, crearProveedor }