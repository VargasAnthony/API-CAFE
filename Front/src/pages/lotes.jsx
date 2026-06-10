import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getLotes, crearLote } from '../api/lotes'
import { useNavigate } from 'react-router-dom'

function Lotes() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [lotes, setLotes] = useState([])
  const [form, setForm] = useState({
    tipo_cafe: '', calidad: '', proceso: '',
    costo_por_kg: '', stock_kg: '', fecha_ingreso: '', proveedor_id: null
  })

  useEffect(() => {
    cargarLotes()
  }, [])

  const cargarLotes = async () => {
    const datos = await getLotes(token)
    setLotes(datos)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await crearLote(token, form)
    cargarLotes()
    setForm({ tipo_cafe: '', calidad: '', proceso: '', costo_por_kg: '', stock_kg: '', fecha_ingreso: '', proveedor_id: null })
  }

  const inputClass = "bg-[#0a0a0a] border border-[#39FF14]/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39FF14] transition w-full"

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
      {/* Overlay oscuro */}
      <div className="min-h-screen bg-black/65">

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
          <h1 className="text-3xl font-bold mb-8">Lotes de Café 🌱</h1>

          {/* Formulario */}
          <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-[#39FF14] mb-4">Registrar nuevo lote</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <input name="tipo_cafe" placeholder="Tipo de café" value={form.tipo_cafe} onChange={handleChange} className={inputClass} />
              <input name="calidad" placeholder="Calidad" value={form.calidad} onChange={handleChange} className={inputClass} />
              <input name="proceso" placeholder="Proceso" value={form.proceso} onChange={handleChange} className={inputClass} />
              <input name="costo_por_kg" placeholder="Costo por kg" value={form.costo_por_kg} onChange={handleChange} className={inputClass} />
              <input name="stock_kg" placeholder="Stock en kg" value={form.stock_kg} onChange={handleChange} className={inputClass} />
              <input name="fecha_ingreso" type="date" value={form.fecha_ingreso} onChange={handleChange} className={inputClass} />
              <button type="submit" className="col-span-2 md:col-span-3 bg-[#39FF14] text-black font-bold py-3 rounded-lg hover:bg-[#2dd10f] transition">
                Registrar lote
              </button>
            </form>
          </div>

          {/* Tabla */}
          <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#39FF14]/20">
              <h2 className="text-xl font-bold text-[#39FF14]">Lotes registrados</h2>
            </div>
            <table className="w-full">
              <thead className="bg-[#0a0a0a]/80">
                <tr>
                  {['Tipo', 'Calidad', 'Proceso', 'Costo/kg', 'Stock kg', 'Fecha ingreso'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-gray-400 text-sm font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lotes.map((lote, i) => (
                  <tr key={lote.id} className={`border-t border-[#39FF14]/10 hover:bg-[#39FF14]/5 transition ${i % 2 === 0 ? '' : 'bg-[#111]/50'}`}>
                    <td className="px-6 py-4">{lote.tipo_cafe}</td>
                    <td className="px-6 py-4">{lote.calidad}</td>
                    <td className="px-6 py-4">{lote.proceso}</td>
                    <td className="px-6 py-4">S/ {lote.costo_por_kg}</td>
                    <td className="px-6 py-4">{lote.stock_kg} kg</td>
                    <td className="px-6 py-4">{new Date(lote.fecha_ingreso).toLocaleDateString()}</td>
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

export default Lotes