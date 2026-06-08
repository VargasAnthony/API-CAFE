import axios from 'axios'
import { API } from './config'

const getProductos = async (token) => {
  const respuesta = await axios.get(`${API}/productos`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

const crearProducto = async (token, datos) => {
  const respuesta = await axios.post(`${API}/productos`, datos, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

export { getProductos, crearProducto }