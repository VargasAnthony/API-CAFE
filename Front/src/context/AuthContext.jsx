import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [usuario, setUsuario] = useState(null)

  const guardarToken = (nuevoToken) => {
    localStorage.setItem('token', nuevoToken)
    setToken(nuevoToken)
  }

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    setToken('')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ token, usuario, guardarToken, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }