import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getProductos, crearProducto } from '../api/productos'
import { getLotes } from '../api/lotes'
import { useNavigate } from 'react-router-dom'

function Productos() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [lotes, setLotes] = useState([])
  const [form, setForm] = useState({
    nombre: '', presentacion: '', stock_disponible: '', precio_venta: '', lote_id: ''
  })

  useEffect(() => {
    cargarProductos()
    cargarLotes()
  }, [])

  const cargarProductos = async () => {
    const datos = await getProductos(token)
    setProductos(datos)
  }

  const cargarLotes = async () => {
    const datos = await getLotes(token)
    setLotes(datos)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const datos = {
      ...form,
      lote_id: form.lote_id === '' ? null : form.lote_id
    }
    await crearProducto(token, datos)
    cargarProductos()
    setForm({ nombre: '', presentacion: '', stock_disponible: '', precio_venta: '', lote_id: '' })
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
          <h1 className="text-3xl font-bold mb-8">Productos 📦</h1>

          {/* Formulario */}
          <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-[#39FF14] mb-4">Registrar nuevo producto</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className={inputClass} />
              <input name="presentacion" placeholder="Presentación (ej: 250g)" value={form.presentacion} onChange={handleChange} className={inputClass} />
              <input name="stock_disponible" placeholder="Stock disponible" value={form.stock_disponible} onChange={handleChange} className={inputClass} />
              <input name="precio_venta" placeholder="Precio de venta" value={form.precio_venta} onChange={handleChange} className={inputClass} />
              <select name="lote_id" value={form.lote_id} onChange={handleChange} className={selectClass}>
                <option value="">Sin lote</option>
                {lotes.map((lote) => (
                  <option key={lote.id} value={lote.id}>
                    {lote.tipo_cafe} - {lote.calidad}
                  </option>
                ))}
              </select>
              <button type="submit" className="bg-[#39FF14] text-black font-bold py-3 rounded-lg hover:bg-[#2dd10f] transition">
                Registrar producto
              </button>
            </form>
          </div>

          {/* Tabla */}
          <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#39FF14]/20">
              <h2 className="text-xl font-bold text-[#39FF14]">Productos registrados</h2>
            </div>
            <table className="w-full">
              <thead className="bg-[#0a0a0a]/80">
                <tr>
                  {['Nombre', 'Presentación', 'Stock', 'Precio'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-gray-400 text-sm font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productos.map((producto, i) => (
                  <tr key={producto.id} className={`border-t border-[#39FF14]/10 hover:bg-[#39FF14]/5 transition ${i % 2 === 0 ? '' : 'bg-[#111]/50'}`}>
                    <td className="px-6 py-4">{producto.nombre}</td>
                    <td className="px-6 py-4">{producto.presentacion}</td>
                    <td className="px-6 py-4">{producto.stock_disponible}</td>
                    <td className="px-6 py-4">S/ {producto.precio_venta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Productos