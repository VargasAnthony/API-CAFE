import { pool } from '../config/db.js'

const obtenerTodos = async () => {
    const resultado = await pool.query(
        'SELECT * FROM producto ORDER BY nombre ASC'
    )
    return resultado.rows
}

const obtenerPorId = async (id) => {
    const resultado = await pool.query(
        'SELECT * FROM producto WHERE id = $1',
        [id]
    )
    return resultado.rows[0]    
}

const crearProducto = async (datos) => {
    const { nombre, presentacion, stock_disponible, precio_venta, lote_id } = datos
    const resultado = await pool.query(
        'INSERT INTO producto (nombre, presentacion, stock_disponible, precio_venta, lote_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nombre, presentacion, stock_disponible, precio_venta, lote_id]
    )
    return resultado.rows[0]
}

export { obtenerTodos, obtenerPorId, crearProducto }