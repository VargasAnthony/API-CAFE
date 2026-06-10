import { encontrarPorEmail, obtenerTodos, obtenerPorId, desactivarUsuario as desactivarUsuarioModel, crearUsuario as crearUsuarioModel, obtenerRoles } from "../models/usuarioModel.js"

const postUsuario = async (req, res) => {
  try {
    const datos = req.body
    const nuevoUsuario = await crearUsuarioModel(datos)
    res.status(201).json(nuevoUsuario)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error interno del servidor' })
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

const getUsuarios = async (req, res) => {
    try {
        const obten = await obtenerTodos()
        res.json(obten)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'ERROR INTERNO DEL SERVIDOR' })
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

const getRoles = async (req, res) => {
  try {
    const roles = await obtenerRoles()
    res.json(roles)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export { getUsuarios, getUsuariosPorId, desactivarUsuario, postUsuario, getRoles }