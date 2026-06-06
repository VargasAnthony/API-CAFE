import { obtenerTodos, obtenerPorId, crearProducto as crearProductoModel } from "../models/productoModel.js";

const getProductos = async (req, res) => {
    try{
        const obtener = await obtenerTodos()
        res.json(obtener)
    }   catch (error) {
        res.status(500).json({error: 'ERROR INTERNO DEL SERVIDOR'})
    }
}


const getProductosPorId = async (req, res) => {
    try {
        const { id } = req.params
        const producto = await obtenerPorId(id)
        if(!producto) return res.status(404).json({ error: 'proveedor no encontrado' })
            res.json(producto)
    } catch (error) {
        res.status(500).json({ error: 'ERROR INTERNO DEL SERVIDOR' })
    }
}


const crearProducto = async (req, res) => {
    try {
        const datos = req.body
        const nuevoProducto = await crearProductoModel(datos)
        res.status(201).json(nuevoProducto)
    }   catch (error) {
        res.status(500).json({ error: 'ERROR INTERNO DEL SERVIDOR' })
    }
}


export { getProductos, getProductosPorId, crearProducto }