import { pool } from '../config/db.js'

const reporteVentas = async (periodo) => {
  const resultado = await pool.query(`
    SELECT 
      DATE_TRUNC($1, fecha_venta) as periodo,
      COUNT(*) as total_ventas,
      SUM(total) as ingresos_totales
    FROM venta
    GROUP BY DATE_TRUNC($1, fecha_venta)
    ORDER BY periodo DESC
  `, [periodo])
  return resultado.rows
}

const reporteStock = async () => {
  const resultado = await pool.query(`
    SELECT nombre, presentacion, stock_disponible
    FROM producto
    WHERE stock_disponible < 10
    ORDER BY stock_disponible ASC
  `)
  return resultado.rows
}

const reporteCompras = async (periodo) => {
  const resultado = await pool.query(`
    SELECT 
      DATE_TRUNC($1, fecha_ingreso) as periodo,
      COUNT(*) as total_lotes,
      SUM(stock_kg) as kg_totales,
      SUM(costo_por_kg * stock_kg) as costo_total
    FROM lote
    GROUP BY DATE_TRUNC($1, fecha_ingreso)
    ORDER BY periodo DESC
  `, [periodo])
  return resultado.rows
}

export { reporteVentas, reporteStock, reporteCompras }