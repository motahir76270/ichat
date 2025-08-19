import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contextapi/index';
import { FiMail, FiLock, FiLogIn, FiAlertCircle, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';

const Login = () => {
  const URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      email: formdata.email,
      password: formdata.password
    };

    try {
      const { data } = await axios.post(`${URL}/api/data/login`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem('userData', JSON.stringify(data));
      localStorage.setItem('token', JSON.stringify(data.token));
      setUser(data);
      
      setFormdata({
        email: '',
        password: ''
      });

      navigate('/ichat');
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/400 border border-blue-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        {/* Header with back button for mobile */}
        <div className="md:hidden flex items-center p-4 bg-white border-b border-gray-100">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft className="text-gray-600" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-gray-800">Sign In</h1>
        </div>
        
        {/* Gradient header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white hidden md:block">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-blue-100 opacity-90">Sign in to continue your journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="flex items-center p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 animate-fade-in">
              <FiAlertCircle className="mr-3 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <div className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formdata.email}
                placeholder="Email address"
                required
                className="w-full pl-12 pr-4 py-3.5  border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={formdata.password}
                placeholder="Password"
                required
                className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <FiLogIn className="mr-2" />
                Sign in
              </>
            )}
          </button>
        </form>

        <div className="px-6 pb-6 pt-2 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link 
              to="/signUp" 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign up now
            </Link>
          </p>
        </div>
     
      </div>
    </div>
  );
};

export default Login;