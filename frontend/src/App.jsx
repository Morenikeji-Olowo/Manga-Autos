import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Listings from "./pages/Listings";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Listings Page */}
      <Route path="/listings" element={<Listings />} />

      {/* About Page */}
      <Route path="/about" element={<About />} />

      <Route path="/car/:id" element={<CarDetails />} />

      {/* (We will add this later) */}
      {/* Car Details Page (dynamic route) */}
      {/* <Route path="/car/:id" element={<CarDetails />} /> */}
    </Routes>
  );
}

export default App;