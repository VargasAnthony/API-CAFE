import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { registrarVenta } from '../api/ventas'
import { getProductos } from '../api/productos'
import { useNavigate } from 'react-router-dom'

function Ventas() {
  const { token } = useAuth()
  const navigate = useNavigate()
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
    const datos = { ...form, total: Number(form.total) }
    await registrarVenta(token, datos)
    setForm({
      cliente: '', comprobante: 'boleta', num_comprobante: '',
      total: 0, usuario_id: null, detalle: []
    })
  }

  const inputClass = "bg-[#0a0a0a] border border-[#39FF14]/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39FF14] transition w-full"
  const selectClass = "bg-[#0a0a0a] border border-[#39FF14]/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39FF14] transition w-full"

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="min-h-screen bg-black/60">

        {/* Navbar */}
        <nav className="bg-[#1a1a1a]/90 border-b border-[#39FF14]/20 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            <span className="text-[#39FF14] font-bold text-xl">Café Ecovaar</span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="border border-[#39FF14]/30 text-[#39FF14] px-4 py-2 rounded-lg hover:bg-[#39FF14]/10 transition"
          >
            ← Dashboard
          </button>
        </nav>

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Registrar Venta 💰</h1>

          <form onSubmit={handleSubmit}>
            {/* Datos de la venta */}
            <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-[#39FF14] mb-4">Datos de la venta</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="cliente" placeholder="Cliente" value={form.cliente} onChange={handleChange} className={inputClass} />
                <select name="comprobante" value={form.comprobante} onChange={handleChange} className={selectClass}>
                  <option value="boleta">Boleta</option>
                  <option value="factura">Factura</option>
                </select>
                <input name="num_comprobante" placeholder="N° Comprobante" value={form.num_comprobante} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {/* Agregar productos */}
            <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-[#39FF14] mb-4">Agregar producto</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select name="producto_id" value={item.producto_id} onChange={handleItemChange} className={selectClass}>
                  <option value="">Selecciona un producto</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} - {p.presentacion} (Stock: {p.stock_disponible})
                    </option>
                  ))}
                </select>
                <input name="cantidad" placeholder="Cantidad" value={item.cantidad} onChange={handleItemChange} className={inputClass} />
                <input name="precio_unitario" placeholder="Precio unitario" value={item.precio_unitario} onChange={handleItemChange} className={inputClass} />
                <button type="button" onClick={agregarItem} className="bg-[#39FF14]/20 border border-[#39FF14] text-[#39FF14] font-bold py-3 rounded-lg hover:bg-[#39FF14]/30 transition">
                  + Agregar
                </button>
              </div>
            </div>

            {/* Detalle */}
            <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl overflow-hidden mb-6">
              <div className="p-6 border-b border-[#39FF14]/20 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#39FF14]">Detalle de la venta</h2>
                <span className="text-2xl font-bold text-white">Total: <span className="text-[#39FF14]">S/ {form.total}</span></span>
              </div>
              <table className="w-full">
                <thead className="bg-[#0a0a0a]/80">
                  <tr>
                    {['Producto', 'Cantidad', 'Precio unitario', 'Subtotal'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-gray-400 text-sm font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {form.detalle.map((d, index) => (
                    <tr key={index} className="border-t border-[#39FF14]/10 hover:bg-[#39FF14]/5 transition">
                      <td className="px-6 py-4">{productos.find(p => p.id === d.producto_id)?.nombre}</td>
                      <td className="px-6 py-4">{d.cantidad}</td>
                      <td className="px-6 py-4">S/ {d.precio_unitario}</td>
                      <td className="px-6 py-4">S/ {d.precio_total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button type="submit" className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-xl hover:bg-[#2dd10f] transition text-lg">
              Registrar venta
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Ventas