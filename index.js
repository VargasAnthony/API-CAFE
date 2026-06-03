import express from 'express';
const app = express();
const PORT = 3000;

// Esto permite que tu API entienda cuando le mandes datos en formato JSON
app.use(express.json());

// Datos de prueba (El inventario inicial de Ecovaar)
let inventarioCafe = [
    { id: 1, nombre: "Café Espresso Premium", tipo: "Arábica", precio: 25.00, stock: 10 },
    { id: 2, nombre: "Café Moka Clásico", tipo: "Robusta", precio: 22.50, stock: 15 }
];

// RUTA 1: Saludo de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API oficial de Café Ecovaar! ☕');
});

// RUTA 2: Obtener todo el inventario de café
app.get('/api/cafe', (req, res) => {
    res.json(inventarioCafe);
});

// Levantar el servidor para que escuche peticiones
app.listen(PORT, () => {
    console.log(`Servidor corriendo con éxito en http://localhost:${PORT}`);
});