import axios from 'axios'
import { API } from './config'

const registrarVenta = async (token, datos) => {
  const respuesta = await axios.post(`${API}/ventas`, datos, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

export { registrarVenta }