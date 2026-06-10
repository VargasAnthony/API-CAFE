import axios from 'axios'
import { API } from './config'

const getUsuarios = async (token) => {
  const respuesta = await axios.get(`${API}/usuarios`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

const crearUsuario = async (token, datos) => {
  const respuesta = await axios.post(`${API}/usuarios`, datos, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

const desactivarUsuario = async (token, id) => {
  const respuesta = await axios.put(`${API}/usuarios/${id}/desactivar`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

const getRoles = async (token) => {
  const respuesta = await axios.get(`${API}/usuarios/roles`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return respuesta.data
}

export { getUsuarios, crearUsuario, desactivarUsuario, getRoles }