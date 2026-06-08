import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Lotes from './pages/Lotes'
import Productos from './pages/Productos'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lotes" element={<Lotes />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App