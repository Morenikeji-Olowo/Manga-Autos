import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages (we'll create these)
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import CheckEmail from "./pages/auth/check-email";
import VerifyEmail from "./pages/auth/verify-email";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./admin/pages/Dashboard";
import AdminCars from "./admin/pages/ManageCars";
import AdminOrders from "./admin/pages/Orders";
import AdminPayments from "./admin/pages/Payments";
import AdminSettings from "./admin/pages/Settings";
import AdminLayout from "./admin/AdminLayout";
import Users from "./admin/pages/Users";
import ManageCars from "./admin/pages/ManageCars";
import AddCar from "./admin/pages/AddCar";
import EditCar from "./admin/pages/EditCar";
import AdminNavbar from "./admin/components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — have main Navbar */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/cars" element={<><Navbar /><Cars /></>} />
        <Route path="/cars/:id" element={<><Navbar /><CarDetail /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/check-email" element={<CheckEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Admin routes — AdminLayout handles its own navbar */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="cars" element={<ManageCars />} />
          <Route path="cars/add" element={<AddCar />} />
          <Route path="cars/:id/edit" element={<EditCar />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<Users />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
