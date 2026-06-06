import { crearVenta, crearDetalleVenta, descontarStock } from '../models/ventaModel.js'

const registrarVenta = async (req, res) => {
  try {
    const { cliente, comprobante, num_comprobante, total, usuario_id, detalle } = req.body
    const venta = await crearVenta({ cliente, comprobante, num_comprobante, total, usuario_id })
    for (const item of detalle) {
        await crearDetalleVenta({
            venta_id: venta.id,
            producto_id: item.producto_id,
            cantidad: item.cantidad,
            precio_unitario: item.precio_unitario,
            precio_total: item.precio_total
        })
        await descontarStock(item.cantidad, item.producto_id)
    }
    res.status(201).json(venta)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export { registrarVenta }