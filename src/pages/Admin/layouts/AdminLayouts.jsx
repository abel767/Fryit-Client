import {Outlet, Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

export default function AdminLayout(){
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        if(!user || user.role !== 'admin'){
            navigate('/admin')
        }
    }, [user, navigate])

    const handleLogout = ()=>{
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      navigate('/admin')
    }

    return(
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              <Link to="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
                Dashboard
              </Link>
              <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">
                User Management
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <Outlet />
          </div>
        </div>
    )
}