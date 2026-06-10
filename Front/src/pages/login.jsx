import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { guardarToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const datos = await login(email, password)
      guardarToken(datos.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay oscuro con blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card del login */}
      <div className="relative z-10 bg-[#1a1a1a]/90 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-[#39FF14]/20 backdrop-blur-md">

        <div className="text-center mb-8">
          <img src="/logo.png" alt="Ecovaar Logo" className="w-24 h-24 mx-auto" />
          <h1 className="text-3xl font-bold text-[#39FF14] mt-3">Café Ecovaar</h1>
          <p className="text-gray-400 mt-1">Sistema de gestión</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#0a0a0a] border border-[#39FF14]/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39FF14] transition"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#0a0a0a] border border-[#39FF14]/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39FF14] transition"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-[#39FF14] text-black font-bold py-3 rounded-lg hover:bg-[#2dd10f] transition mt-2"
          >
            Ingresar
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login