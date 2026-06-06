import axios from 'axios'

const API = 'http://localhost:3000/api'

const login = async (email, password) => {
  const respuesta = await axios.post(`${API}/auth/login`, { email, password })
  return respuesta.data
}

export { login }