import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getReporteVentas, getReporteStock, getReporteCompras } from '../api/reportes'

function Reportes() {
  const { token } = useAuth()
  const [periodo, setPeriodo] = useState('month')
  const [reporteVentas, setReporteVentas] = useState([])
  const [reporteStock, setReporteStock] = useState([])
  const [reporteCompras, setReporteCompras] = useState([])

  useEffect(() => {
    cargarReportes()
  }, [periodo])

  const cargarReportes = async () => {
    const ventas = await getReporteVentas(token, periodo)
    const stock = await getReporteStock(token)
    const compras = await getReporteCompras(token, periodo)
    setReporteVentas(ventas)
    setReporteStock(stock)
    setReporteCompras(compras)
  }

  return (
    <div>
      <h1>Reportes</h1>

      <label>Período: </label>
      <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
        <option value="week">Semanal</option>
        <option value="month">Mensual</option>
        <option value="year">Anual</option>
      </select>

      <h2>Ventas</h2>
      <table>
        <thead>
          <tr>
            <th>Período</th>
            <th>Total ventas</th>
            <th>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {reporteVentas.map((r, i) => (
            <tr key={i}>
              <td>{new Date(r.periodo).toLocaleDateString()}</td>
              <td>{r.total_ventas}</td>
              <td>S/ {r.ingresos_totales}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Stock bajo</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Presentación</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {reporteStock.map((r, i) => (
            <tr key={i}>
              <td>{r.nombre}</td>
              <td>{r.presentacion}</td>
              <td>{r.stock_disponible}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Compras</h2>
      <table>
        <thead>
          <tr>
            <th>Período</th>
            <th>Total lotes</th>
            <th>Kg totales</th>
            <th>Costo total</th>
          </tr>
        </thead>
        <tbody>
          {reporteCompras.map((r, i) => (
            <tr key={i}>
              <td>{new Date(r.periodo).toLocaleDateString()}</td>
              <td>{r.total_lotes}</td>
              <td>{r.kg_totales}</td>
              <td>S/ {r.costo_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Reportes