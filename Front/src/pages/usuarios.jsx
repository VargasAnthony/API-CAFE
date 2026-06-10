import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUsuarios, crearUsuario, desactivarUsuario, getRoles } from '../api/usuarios'
import { useNavigate } from 'react-router-dom'

function Usuarios() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [roles, setRoles] = useState([])
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', password: '', rol_id: ''
  })

  useEffect(() => {
    cargarUsuarios()
    cargarRoles()
  }, [])

  const cargarRoles = async () => {
    const datos = await getRoles(token)
    setRoles(datos)
  }

  const cargarUsuarios = async () => {
    const datos = await getUsuarios(token)
    setUsuarios(datos)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await crearUsuario(token, form)
    cargarUsuarios()
    setForm({ nombre: '', apellido: '', email: '', password: '', rol_id: '' })
  }

  const handleDesactivar = async (id) => {
    await desactivarUsuario(token, id)
    cargarUsuarios()
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
          <h1 className="text-3xl font-bold mb-8">Usuarios 👥</h1>

          {/* Formulario */}
          <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-[#39FF14] mb-4">Crear usuario</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className={inputClass} />
              <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} className={inputClass} />
              <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
              <input name="password" placeholder="Contraseña" type="password" value={form.password} onChange={handleChange} className={inputClass} />
              <select name="rol_id" value={form.rol_id} onChange={handleChange} className={inputClass}>
                <option value="">Selecciona un rol</option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.nombre_rol}
                  </option>
                ))}
              </select>
              <button type="submit" className="bg-[#39FF14] text-black font-bold py-3 rounded-lg hover:bg-[#2dd10f] transition">
                Crear usuario
              </button>
            </form>
          </div>

          {/* Tabla */}
          <div className="bg-[#1a1a1a]/90 border border-[#39FF14]/20 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#39FF14]/20">
              <h2 className="text-xl font-bold text-[#39FF14]">Usuarios registrados</h2>
            </div>
            <table className="w-full">
              <thead className="bg-[#0a0a0a]/80">
                <tr>
                  {['Nombre', 'Apellido', 'Email', 'Estado', 'Acción'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-gray-400 text-sm font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, i) => (
                  <tr key={u.id} className={`border-t border-[#39FF14]/10 hover:bg-[#39FF14]/5 transition ${i % 2 === 0 ? '' : 'bg-[#111]/50'}`}>
                    <td className="px-6 py-4">{u.nombre}</td>
                    <td className="px-6 py-4">{u.apellido}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${u.activo ? 'bg-[#39FF14]/20 text-[#39FF14]' : 'bg-red-500/20 text-red-400'}`}>
                        {u.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.activo && (
                        <button
                          onClick={() => handleDesactivar(u.id)}
                          className="border border-red-500/30 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500/10 transition text-sm"
                        >
                          Desactivar
                        </button>
                      )}
                    </td>
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

export default Usuarios