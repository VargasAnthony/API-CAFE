import { encontrarPorEmail, obtenerTodos, obtenerPorId, desactivarUsuario as desactivarUsuarioModel } from "../models/usuarioModel.js"

const getUsuarios = async (req, res) => {
    try{
        const obtener = await obtenerTodos()
        res.json(obtener)
    }   catch (error) {
        res.status(500).json({error: 'ERROR INTERNO DEL SERVIDOR'})
    }
}

const getUsuariosPorId = async (req, res) => {
    try{
        const { id } = req.params
        const usuario = await obtenerPorId(id)
        if(!usuario) return res.status(404).json({ error: 'usuario no encontrado'})
            res.json(usuario)
    } catch (error) {
        res.status(500).json({error: 'ERROR INTERNO DEL SERVIDOR' })
    }
}

const desactivarUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const usuario = await desactivarUsuarioModel(id)
    if (!usuario) return res.status(404).json({ error: 'usuario no encontrado' })
    res.json({ mensaje: 'Usuario desactivado', usuario })
  } catch (error) {
    res.status(500).json({ error: 'ERROR INTERNO DEL SERVIDOR' })
  }
}

export { getUsuarios, getUsuariosPorId, desactivarUsuario }