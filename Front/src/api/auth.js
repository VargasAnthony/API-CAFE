import axios from 'axios'
import { API } from './config'

const login = async (email, password) => {
  const respuesta = await axios.post(`${API}/auth/login`, { email, password })
  return respuesta.data
}

export { login }