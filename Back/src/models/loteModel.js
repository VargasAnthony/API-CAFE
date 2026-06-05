import { pool } from '../config/db.js'

const obtenerTodos = async () => {
  const resultado = await pool.query(
    'SELECT * FROM lote ORDER BY fecha_ingreso ASC'
  )
  return resultado.rows
}

const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    'SELECT * FROM lote WHERE id = $1',
    [id]
  )
  return resultado.rows[0]
}

const crearLote = async (datos) => {
  const { tipo_cafe, calidad, proceso, costo_por_kg, stock_kg, fecha_ingreso, proveedor_id } = datos

  const resultado = await pool.query(
    'INSERT INTO lote (tipo_cafe, calidad, proceso, costo_por_kg, stock_kg, fecha_ingreso, proveedor_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [tipo_cafe, calidad, proceso, costo_por_kg, stock_kg, fecha_ingreso, proveedor_id]
  )
  return resultado.rows[0]
}