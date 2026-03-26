import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages (we'll create these)
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetail from './pages/CarDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App