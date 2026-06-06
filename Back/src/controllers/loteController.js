import { obtenerTodos, obtenerPorId, crearLote as crearLoteModel } from '../models/loteModel.js'

const getLotes = async (req, res) => {
  try {
    const obten = await obtenerTodos()
    res.json(obten)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const getLotePorId = async (req, res) => {
  try {
    const { id } = req.params
    const lote = await obtenerPorId(id)
    if (!lote) return res.status(404).json({ error: 'Lote no encontrado' })
    res.json(lote)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const crearLote = async (req, res) => {
  try {
    const datos = req.body
    const creaLote = await crearLoteModel(datos)
    res.status(201).json(creaLote)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export { getLotes, getLotePorId, crearLote }