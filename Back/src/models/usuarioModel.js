import { pool } from '../config/db.js'
import bcrypt from 'bcryptjs'

const encontrarPorEmail = async (email) => {
  const resultado = await pool.query(
    'SELECT * FROM usuario WHERE email = $1',
    [email]
  )
  return resultado.rows[0]
}


const obtenerTodos = async () => {
  const resultado = await pool.query(
    'SELECT id, nombre, apellido, email, rol_id, activo FROM usuario ORDER BY nombre ASC'
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

const crearUsuario = async (datos) => {
  const { nombre, apellido, email, password, rol_id } = datos
  const password_hash = await bcrypt.hash(password, 10)
  const resultado = await pool.query(
    'INSERT INTO usuario (nombre, apellido, email, password_hash, rol_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, apellido, email, rol_id',
    [nombre, apellido, email, password_hash, rol_id]
  )
  return resultado.rows[0]
}

const obtenerRoles = async () => {
  const resultado = await pool.query('SELECT * FROM rol')
  return resultado.rows
}

export { encontrarPorEmail, obtenerTodos, obtenerPorId, desactivarUsuario, crearUsuario, obtenerRoles }