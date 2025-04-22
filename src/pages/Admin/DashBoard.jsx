import {useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import AdminLayout from './layouts/AdminLayouts'

export default function Dashboard(){
    const [stats, setStats] = useState(null)
    
    useEffect (()=>{
        const fetchStats = async()=>{
            try{
                const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                setStats(data.data)
            }catch(err){
                toast.error('Failed to load dashboard stats')
                console.error(err)
            }
        }
        fetchStats()
    }, [])

    return (
        <AdminLayout>
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard title="Total Users" value={stats.totalUsers} />
              <StatCard title="Admins" value={stats.totalAdmins} />
              <StatCard title="Developers" value={stats.totalDevelopers} />
            </div>
          )}
        </AdminLayout>
      );
    }

function StatCard({title,value}){
    return (
        <div className='bg-white p-4 rounded shadow'>
            <h3 className='text-gray-500 text-sm'>{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    )
}