import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getReporteVentas, getReporteStock, getReporteCompras } from '../api/reportes'
import { useNavigate } from 'react-router-dom'

function Reportes() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [periodo, setPeriodo] = useState('month')
  const [reporteVentas, setReporteVentas] = useState([])
  const [reporteStock, setReporteStock] = useState([])
  const [reporteCompras, setReporteCompras] = useState([])

  useEffect(() => {
    cargarReportes()
  }, [periodo])

  const cargarReportes = async () => {
    const ventas = await getReporteVentas(token, periodo)
    const stock = await getReporteStock(token)
    const compras = await getReporteCompras(token, periodo)
    setReporteVentas(ventas)
    setReporteStock(stock)
    setReporteCompras(compras)
  }

  const thClass = "px-6 py-3 text-left text-gray-400 text-sm font-medium"
  const tdClass = "px-6 py-4"

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Reportes 📊</h1>
            <div className="flex items-center gap-3">
              <label className="text-gray-400">Período:</label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="bg-[#0a0a0a] border border-[#39FF14]/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-[#39FF14] transition"
              >
                <option value="week">Semanal</option>
                <option value="month">Mensual</option>
                <option value="year">Anual</option>
              </select>
            </div>
          </div>

          {/* Reporte Ventas */}
          <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl overflow-hidden mb-6">
            <div className="p-6 border-b border-[#39FF14]/20">
              <h2 className="text-xl font-bold text-[#39FF14]">💰 Ventas</h2>
            </div>
            <table className="w-full">
              <thead className="bg-[#0a0a0a]/80">
                <tr>
                  <th className={thClass}>Período</th>
                  <th className={thClass}>Total ventas</th>
                  <th className={thClass}>Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {reporteVentas.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-4 text-gray-500 text-center">Sin datos</td></tr>
                ) : reporteVentas.map((r, i) => (
                  <tr key={i} className="border-t border-[#39FF14]/10 hover:bg-[#39FF14]/5 transition">
                    <td>{r.periodo ? new Date(r.periodo).toLocaleDateString('es-PE', { timeZone: 'UTC' }) : '-'}</td>
                    <td className={tdClass}>{r.total_ventas}</td>
                    <td className={tdClass + " text-[#39FF14] font-bold"}>S/ {r.ingresos_totales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reporte Stock Bajo */}
          <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl overflow-hidden mb-6">
            <div className="p-6 border-b border-[#39FF14]/20">
              <h2 className="text-xl font-bold text-[#39FF14]">⚠️ Stock bajo</h2>
            </div>
            <table className="w-full">
              <thead className="bg-[#0a0a0a]/80">
                <tr>
                  <th className={thClass}>Producto</th>
                  <th className={thClass}>Presentación</th>
                  <th className={thClass}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {reporteStock.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-4 text-gray-500 text-center">Sin productos con stock bajo ✅</td></tr>
                ) : reporteStock.map((r, i) => (
                  <tr key={i} className="border-t border-[#39FF14]/10 hover:bg-[#39FF14]/5 transition">
                    <td className={tdClass}>{r.nombre}</td>
                    <td className={tdClass}>{r.presentacion}</td>
                    <td className={tdClass + " text-red-400 font-bold"}>{r.stock_disponible}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reporte Compras */}
          <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#39FF14]/20">
              <h2 className="text-xl font-bold text-[#39FF14]">🌱 Compras</h2>
            </div>
            <table className="w-full">
              <thead className="bg-[#0a0a0a]/80">
                <tr>
                  <th className={thClass}>Período</th>
                  <th className={thClass}>Total lotes</th>
                  <th className={thClass}>Kg totales</th>
                  <th className={thClass}>Costo total</th>
                </tr>
              </thead>
              <tbody>
                {reporteCompras.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-4 text-gray-500 text-center">Sin datos</td></tr>
                ) : reporteCompras.map((r, i) => (
                  <tr key={i} className="border-t border-[#39FF14]/10 hover:bg-[#39FF14]/5 transition">
                    <td>{r.periodo ? new Date(r.periodo).toLocaleDateString('es-PE', { timeZone: 'UTC' }) : '-'}</td>
                    <td className={tdClass}>{r.total_lotes}</td>
                    <td className={tdClass}>{r.kg_totales} kg</td>
                    <td className={tdClass + " text-[#39FF14] font-bold"}>S/ {r.costo_total}</td>
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

export default Reportes