import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../api/config'

function Dashboard() {
  const { cerrarSesion, token } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    lotes: 0,
    productos: 0,
    stockBajo: 0
  })

  useEffect(() => {
    cargarStats()
  }, [])

  const cargarStats = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const [lotes, productos, reporteStock] = await Promise.all([
        axios.get(`${API}/lotes`, { headers }),
        axios.get(`${API}/productos`, { headers }),
        axios.get(`${API}/reportes/stock`, { headers })
      ])
      setStats({
        lotes: lotes.data.length,
        productos: productos.data.length,
        stockBajo: reporteStock.data.length
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    cerrarSesion()
    navigate('/')
  }

  const modulos = [
    { nombre: 'Lotes', icono: '🌱', ruta: '/lotes', descripcion: 'Gestión de lotes de café' },
    { nombre: 'Productos', icono: '📦', ruta: '/productos', descripcion: 'Productos disponibles' },
    { nombre: 'Ventas', icono: '💰', ruta: '/ventas', descripcion: 'Registrar ventas' },
    { nombre: 'Reportes', icono: '📊', ruta: '/reportes', descripcion: 'Informes estadísticos' },
  ]

  const estadisticas = [
    { label: 'Lotes registrados', valor: stats.lotes, icono: '🌱' },
    { label: 'Productos activos', valor: stats.productos, icono: '📦' },
    { label: 'Stock bajo', valor: stats.stockBajo, icono: '⚠️' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Navbar */}
      <nav className="bg-[#1a1a1a] border-b border-[#39FF14]/20 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-[#39FF14] font-bold text-xl">Café Ecovaar</span>
        </div>
        <button
          onClick={handleLogout}
          className="border border-[#39FF14]/30 text-[#39FF14] px-4 py-2 rounded-lg hover:bg-[#39FF14]/10 transition"
        >
          Cerrar sesión
        </button>
      </nav>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-8">Bienvenido al sistema de gestión</p>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {estadisticas.map((stat) => (
            <div key={stat.label} className="bg-[#1a1a1a] border border-[#39FF14]/20 rounded-2xl p-6 flex items-center gap-4">
              <span className="text-4xl">{stat.icono}</span>
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-[#39FF14] text-3xl font-bold">{stat.valor}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Usuarios a lo ancho */}
        <h2 className="text-xl font-bold mb-4 text-gray-300">Módulos</h2>
        <div
          onClick={() => navigate('/usuarios')}
          className="bg-[#1a1a1a] border border-[#39FF14]/20 rounded-2xl p-8 cursor-pointer hover:border-[#39FF14] hover:shadow-lg hover:shadow-[#39FF14]/10 transition mb-6 flex items-center gap-6"
        >
          <span className="text-5xl">👥</span>
          <div>
            <h2 className="text-2xl font-bold text-[#39FF14]">Usuarios</h2>
            <p className="text-gray-400 mt-1">Gestión de usuarios del sistema</p>
          </div>
        </div>

        {/* 4 módulos en grid 2x2 */}
        <div className="grid grid-cols-2 gap-6">
          {modulos.map((modulo) => (
            <div
              key={modulo.nombre}
              onClick={() => navigate(modulo.ruta)}
              className="bg-[#1a1a1a] border border-[#39FF14]/20 rounded-2xl p-10 cursor-pointer hover:border-[#39FF14] hover:shadow-lg hover:shadow-[#39FF14]/10 transition"
            >
              <span className="text-5xl">{modulo.icono}</span>
              <h2 className="text-2xl font-bold text-[#39FF14] mt-4">{modulo.nombre}</h2>
              <p className="text-gray-400 mt-2">{modulo.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard