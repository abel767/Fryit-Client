import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('')
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );
      localStorage.setItem('tempEmail', data.email)
      toast.success('OTP sent to your email!');
      setShowOTPModal(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-email`, {
        email: localStorage.getItem('tempEmail'),
        code: otp,
      });
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.removeItem('tempEmail')
      toast.success('Account verified!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register('username', { required: true })}
        />
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="auth-footer">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      <div className='auth-providers'>
        <button
        onClick={()=>window.open(`${import.meta.env.VITE_API_URL}/auth/google`, '_self')}
        className='google-btn'
        ><img src="/google-icon.png" alt="" width='20'/>Sign up with Goolge</button>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="otp-modal">
          <h3>Enter OTP</h3>
          <input 
            type="text" 
            placeholder="6-digit code" 
            onChange={(e) => setOtp(e.target.value)} 
          />
          <button onClick={() => verifyOTP(otp)}>Verify</button>
        </div>
      )}
    </div>
  );
}