import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages (we'll create these)
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetail from './pages/CarDetail'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import CheckEmail from './pages/auth/check-email'
import VerifyEmail from './pages/auth/verify-email'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path='/auth/check-email' element={<CheckEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected - login required
        <Route path="/profile" element={
          <ProtectedRoute><div>Profile page coming soon</div></ProtectedRoute>
        } />
        <Route path="/saved" element={
          <ProtectedRoute><div>Saved cars coming soon</div></ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute><div>Orders coming soon</div></ProtectedRoute>
        } />

        {/* Admin only */}
        {/* <Route path="/admin" element={
          <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>
        } /> */} 
      </Routes>
    </BrowserRouter>
  )
}

export default App