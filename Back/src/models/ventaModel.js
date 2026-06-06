import { pool } from '../config/db.js'

const crearVenta = async (datos) => {
    const { cliente, comprobante, num_comprobante, total, fecha_venta, usuario_id } = datos
    const resultado = await pool.query(
        'INSERT INTO venta (cliente, comprobante, num_comprobante, total, fecha_venta, usuario_id ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [cliente, comprobante, num_comprobante, total, fecha_venta, usuario_id]
    )
    return resultado.rows[0]
}

const crearDetalleVenta = async (datos) => {
    const { venta_id, producto_id, cantidad, precio_unitario, precio_total } = datos
    const resultado = await pool.query(
        'INSERT INTO detalle_venta ( venta_id, producto_id, cantidad, precio_unitario, precio_total ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [ venta_id, producto_id, cantidad, precio_unitario, precio_total ]
    )
    return resultado.rows[0]
}

const descontarStock = async (cantidad, producto_id) => {
    const resultado = await pool.query(
        'UPDATE producto SET stock_disponible = stock_disponible - $1 WHERE id = $2',
        [cantidad, producto_id]
    )
    return resultado.rows[0]
}

export { crearVenta, crearDetalleVenta, descontarStock }