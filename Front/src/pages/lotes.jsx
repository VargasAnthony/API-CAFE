import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getLotes, crearLote } from '../api/lotes'

function Lotes() {
  const { token } = useAuth()
  const [lotes, setLotes] = useState([])
  const [form, setForm] = useState({
    tipo_cafe: '', calidad: '', proceso: '',
    costo_por_kg: '', stock_kg: '', fecha_ingreso: '', proveedor_id: null
  })

  // useEffect se ejecuta cuando el componente carga
  useEffect(() => {
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
    await crearLote(token, form)
    cargarLotes() // recarga la lista
    setForm({ tipo_cafe: '', calidad: '', proceso: '',
      costo_por_kg: '', stock_kg: '', fecha_ingreso: '', proveedor_id: null })
  }

  return (
    <div>
      <h1>Lotes de Café</h1>

      <h2>Registrar nuevo lote</h2>
      <form onSubmit={handleSubmit}>
        <input name="tipo_cafe" placeholder="Tipo de café" value={form.tipo_cafe} onChange={handleChange} />
        <input name="calidad" placeholder="Calidad" value={form.calidad} onChange={handleChange} />
        <input name="proceso" placeholder="Proceso" value={form.proceso} onChange={handleChange} />
        <input name="costo_por_kg" placeholder="Costo por kg" value={form.costo_por_kg} onChange={handleChange} />
        <input name="stock_kg" placeholder="Stock en kg" value={form.stock_kg} onChange={handleChange} />
        <input name="fecha_ingreso" type="date" value={form.fecha_ingreso} onChange={handleChange} />
        <button type="submit">Registrar lote</button>
      </form>

      <h2>Lotes registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Calidad</th>
            <th>Proceso</th>
            <th>Costo/kg</th>
            <th>Stock kg</th>
            <th>Fecha ingreso</th>
          </tr>
        </thead>
        <tbody>
          {lotes.map((lote) => (
            <tr key={lote.id}>
              <td>{lote.tipo_cafe}</td>
              <td>{lote.calidad}</td>
              <td>{lote.proceso}</td>
              <td>{lote.costo_por_kg}</td>
              <td>{lote.stock_kg}</td>
              <td>{new Date(lote.fecha_ingreso).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Lotes