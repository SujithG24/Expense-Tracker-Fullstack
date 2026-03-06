import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  // Updated state to match Backend DTO (UserRequest)
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ message: '', isError: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      setStatus({ message: 'Registration successful! Redirecting...', isError: false });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setStatus({ message: 'Registration failed. Check if email already exists.', isError: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4">
      <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-emerald-500 mb-2">Create Account</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">Join the Expense Tracker system</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input 
              type="text" name="name" placeholder="Enter your name" 
              onChange={handleChange} required 
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" name="email" placeholder="example@gmail.com" 
              onChange={handleChange} required 
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              type="password" name="password" placeholder="••••••••" 
              onChange={handleChange} required 
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-900/20">
            Sign Up
          </button>
        </form>

        {status.message && (
          <div className={`mt-6 p-3 border rounded-lg text-sm text-center ${status.isError ? 'bg-red-900/30 border-red-500 text-red-400' : 'bg-emerald-900/30 border-emerald-500 text-emerald-400'}`}>
            {status.message}
          </div>
        )}

        <p className="mt-8 text-center text-slate-500 text-sm">
          Already have an account? <Link to="/login" className="text-emerald-400 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;