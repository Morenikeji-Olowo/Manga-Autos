import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages (we'll create these)
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetail from './pages/CarDetail'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import AdminDashboard from './pages/Admin/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App