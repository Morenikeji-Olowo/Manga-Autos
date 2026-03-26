import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import toast from 'react-hot-toast'

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!formData.email || !formData.password) {
    toast.error('Please fill in all fields')
    return
  }

  try {
    const response = await login(formData.email, formData.password)

    if (!response.emailVerified) {
      // If email is not verified, redirect to "check email" page
      toast('Please verify your email before logging in.')
      navigate(`/auth/check-email?email=${formData.email}`)
      return
    }

    toast.success('Login successful!')
    navigate('/')
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Invalid email or password')
  }
}

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Car Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-900 to-red-700">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=1200&fit=crop"
          alt="Luxury Car"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-between p-12 text-white">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-white">
              <i className="fas fa-car-side text-2xl"></i>
              <span className="font-bold text-xl">Dribe</span>
            </Link>
          </div>
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-white/80 leading-relaxed">
              Drive your dreams with Dribe — Nigeria's premier car rental platform.
              Access thousands of verified vehicles at your fingertips.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                ))}
              </div>
              <span className="text-sm text-white/70">Join 10,000+ happy drivers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <i className="fas fa-car-side text-2xl text-red-500"></i>
              <span className="font-bold text-xl text-gray-900">Dribe</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Log In</h1>
            <p className="text-gray-500 mt-2">
              Don't have an account?{' '}
              <Link to="/auth/signup" className="text-red-500 font-semibold hover:text-red-600">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Your Email
                </label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-red-500 rounded border-gray-300 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/auth/forgot-password" className="text-sm text-red-500 hover:text-red-600">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Log In'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
              <i className="fab fa-google text-red-500"></i>
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
              <i className="fab fa-apple text-gray-900"></i>
              <span className="text-gray-700 font-medium">Continue with Apple</span>
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-xs text-gray-400 mt-8">
            By continuing, you agree to our{' '}
            <a href="#" className="text-red-500">Terms of Service</a> and{' '}
            <a href="#" className="text-red-500">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}