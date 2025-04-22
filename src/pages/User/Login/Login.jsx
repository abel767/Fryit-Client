import {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Login(){
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const onSubmit = async(data)=>{
        loading(true)
        try{
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,data
            )
            localStorage.setItem('accessToken', res.data.accessToken)
            toast.success('Login successful!')
            navigate('/dashboard')
        }catch(err){
            toast.error(err.response?.data?.message || 'Login failed')
         }finally{
             setLoading(false)
        }
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')

        if(token){
            localStorage.setItems('accessToken', token)
            navigate('/dashboard')
        }
    }, [])

    return(
        <div className='auth-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" 
                placeholder='Email'
                {...register('email', {required:true})}
                />
                <input type="password" 
                placeholder='Password'
                {...register('password', {required:true})}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging In...' : 'Login'}
                </button>
            </form>
            <div className='auth-footer'>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <button onClick={()=> window.open(`${import.meta.env.VITE_API_URL}/auth/google`, '_self')}>Login with Google</button>
            </div>
        </div>
    )
}