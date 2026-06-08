import axios from 'axios'
import { API } from './config'

const getReporteVentas = async (token, periodo) => {
  const respuesta = await axios.get(`${API}/reportes/ventas?periodo=${periodo}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

const getReporteStock = async (token) => {
  const respuesta = await axios.get(`${API}/reportes/stock`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

const getReporteCompras = async (token, periodo) => {
  const respuesta = await axios.get(`${API}/reportes/compras?periodo=${periodo}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

export { getReporteVentas, getReporteStock, getReporteCompras }