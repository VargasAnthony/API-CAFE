import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { registrarVenta } from '../api/ventas'
import { getProductos } from '../api/productos'

function Ventas() {
  const { token } = useAuth()
  const [ventas, setVentas] = useState([])
  const [productos, setProductos] = useState([])
  const [form, setForm] = useState({
    cliente: '',
    comprobante: 'boleta',
    num_comprobante: '',
    total: 0,
    usuario_id: null,
    detalle: []
  })
  const [item, setItem] = useState({
    producto_id: '',
    cantidad: '',
    precio_unitario: '',
    precio_total: ''
  })

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    const datos = await getProductos(token)
    setProductos(datos)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleItemChange = (e) => {
    const nuevoItem = { ...item, [e.target.name]: e.target.value }
    // calcula el precio total automáticamente
    if (nuevoItem.cantidad && nuevoItem.precio_unitario) {
      nuevoItem.precio_total = Number(nuevoItem.cantidad) * Number(nuevoItem.precio_unitario)
    }
    setItem(nuevoItem)
  }

  const agregarItem = () => {
    if (!item.producto_id || !item.cantidad || !item.precio_unitario) return
    setForm({
      ...form,
      detalle: [...form.detalle, item],
      total: Number(form.total) + Number(item.precio_total)
    })
    setItem({ producto_id: '', cantidad: '', precio_unitario: '', precio_total: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const datos = {
        ...form,
        total: Number(form.total)
    }
    await registrarVenta(token, datos)
    setForm({
        cliente: '',
        comprobante: 'boleta',
        num_comprobante: '',
        total: 0,
        usuario_id: null,
        detalle: []
    })
  }

  return (
    <div>
      <h1>Registrar Venta</h1>

      <h2>Datos de la venta</h2>
      <form onSubmit={handleSubmit}>
        <input name="cliente" placeholder="Cliente" value={form.cliente} onChange={handleChange} />
        <select name="comprobante" value={form.comprobante} onChange={handleChange}>
          <option value="boleta">Boleta</option>
          <option value="factura">Factura</option>
        </select>
        <input name="num_comprobante" placeholder="N° Comprobante" value={form.num_comprobante} onChange={handleChange} />

        <h3>Agregar producto al detalle</h3>
        <select name="producto_id" value={item.producto_id} onChange={handleItemChange}>
          <option value="">Selecciona un producto</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} - {p.presentacion} (Stock: {p.stock_disponible})
            </option>
          ))}
        </select>
        <input name="cantidad" placeholder="Cantidad" value={item.cantidad} onChange={handleItemChange} />
        <input name="precio_unitario" placeholder="Precio unitario" value={item.precio_unitario} onChange={handleItemChange} />
        <button type="button" onClick={agregarItem}>Agregar producto</button>

        <h3>Detalle de la venta</h3>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {form.detalle.map((d, index) => (
              <tr key={index}>
                <td>{productos.find(p => p.id === d.producto_id)?.nombre}</td>
                <td>{d.cantidad}</td>
                <td>{d.precio_unitario}</td>
                <td>{d.precio_total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>Total: S/ {form.total}</p>
        <button type="submit">Registrar venta</button>
      </form>
    </div>
  )
}

export default Ventas