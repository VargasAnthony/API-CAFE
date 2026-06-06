import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const { cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    cerrarSesion()
    navigate('/')
  }

  return (
    <div>
      <h1>Dashboard - Café Ecovaar ☕</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <div>
        <h2>Módulos</h2>
        <button onClick={() => navigate('/lotes')}>Lotes</button>
        <button onClick={() => navigate('/productos')}>Productos</button>
        <button onClick={() => navigate('/ventas')}>Ventas</button>
        <button onClick={() => navigate('/reportes')}>Reportes</button>
      </div>
    </div>
  )
}

export default Dashboard