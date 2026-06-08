import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getProductos, crearProducto } from '../api/productos'
import { getLotes } from '../api/lotes'

function Productos() {
    const { token } = useAuth()
    const [productos, setProductos] = useState([])
    const [lotes, setLotes] = useState([])
    const [form, setForm] = useState({
    nombre: '', presentacion: '', stock_disponible: '', precio_venta: '', lote_id: ''
    })

    useEffect(() => {
        cargarProductos()
    }, [])

    const cargarProductos = async () => {
        const datos = await getProductos(token)
        setProductos(datos)
    }

    useEffect(() => {
    cargarProductos()
    cargarLotes()
    }, [])

    const cargarLotes = async () => {
    const datos = await getLotes(token)
    setLotes(datos)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const datos = {
            ...form,
            lote_id: form.lote_id === '' ? null : form.lote_id
        }
        await crearProducto(token, datos)
        cargarProductos()
        setForm({ nombre: '', presentacion: '', stock_disponible: '', precio_venta: '', lote_id: '' })
    }
    return (
        <div>
            <h1>Productos</h1>
            <h2>Registrar nuevo producto</h2>
            <form onSubmit={handleSubmit}>
                <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
                <input name="presentacion" placeholder="Presentacion" value={form.presentacion} onChange={handleChange} />
                <input name="stock_disponible" placeholder="Stock Disponible" value={form.stock_disponible} onChange={handleChange} />
                <input name="precio_venta" placeholder="Precio de Venta" value={form.precio_venta} onChange={handleChange} />
                <select name="lote_id" value={form.lote_id} onChange={handleChange}>
                <option value="">Sin lote</option>
                {lotes.map((lote) => (
                    <option key={lote.id} value={lote.id}>
                    {lote.tipo_cafe} - {lote.calidad}
                    </option>
                ))}
                </select>
                <button type="submit">Registrar producto</button>
            </form>
            <h2>Productos Registrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Presentacion</th>
                        <th>Stock</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.presentacion}</td>
                            <td>{producto.stock_disponible}</td>
                            <td>{producto.precio_venta}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Productos