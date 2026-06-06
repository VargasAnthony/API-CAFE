import { obtenerTodos, obtenerPorId, crearProveedor as crearProveedorModel } from '../models/proveedorModel.js'

const getProveedores = async (req, res) => {
  try {
    const obten = await obtenerTodos()
    res.json(obten)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const getProveedorPorId = async (req, res) => {
  try {
    const { id } = req.params
    const proveedor = await obtenerPorId(id)
    if (!proveedor) return res.status(404).json({ error: 'proveedor no encontrado' })
    res.json(proveedor)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const crearProveedor = async (req, res) => {
  try {
    const datos = req.body
    const nuevoProveedor = await crearProveedorModel(datos)
    res.status(201).json(nuevoProveedor)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export { getProveedores, getProveedorPorId, crearProveedor }