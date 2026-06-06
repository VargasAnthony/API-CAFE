import { reporteVentas, reporteStock, reporteCompras } from '../models/reporteModel.js'

const getReporteVentas = async (req, res) => {
  try {
    // req.query.periodo viene de la URL así: /api/reportes/ventas?periodo=month
    // Si no mandan nada, por defecto usa 'month'
    const periodo = req.query.periodo || 'month'
    const reporte = await reporteVentas(periodo)
    res.json(reporte)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const getReporteStock = async (req, res) => {
  try {
    // Este no necesita período — siempre muestra productos con stock bajo
    const reporte = await reporteStock()
    res.json(reporte)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const getReporteCompras = async (req, res) => {
  try {
    const periodo = req.query.periodo || 'month'
    const reporte = await reporteCompras(periodo)
    res.json(reporte)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export { getReporteVentas, getReporteStock, getReporteCompras }