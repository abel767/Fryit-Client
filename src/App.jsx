import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/User/Login/Login'
import Register from './pages/User/register/Register'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminLayout from './pages/Admin/layouts/AdminLayouts'
import AdminDashboard from './pages/Admin/DashBoard'
import AdminUsers from './pages/Admin/AdminUsers'

function App() {
  return (
    <BrowserRouter>
      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  
  {/* User Dashboard */}
  <Route path="/dashboard" element={<Dashboard />} />

  {/* Admin Routes */}
  <Route path="/admin" element={<AdminLogin />} />
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="users" element={<AdminUsers />} />
  </Route>
</Routes>
    </BrowserRouter>
  )
}

export default App