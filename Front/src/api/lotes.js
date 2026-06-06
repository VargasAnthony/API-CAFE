import axios from 'axios'
import { API } from './config'

const getLotes = async (token) => {
  const respuesta = await axios.get(`${API}/lotes`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

const crearLote = async (token, datos) => {
  const respuesta = await axios.post(`${API}/lotes`, datos, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

export { getLotes, crearLote }