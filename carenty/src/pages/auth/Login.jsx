import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const { login, isLoading } = useAuthStore()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // clear error on typing
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email'
    if (!formData.password) newErrors.password = 'Password is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const response = await login(formData.email, formData.password)

      if (!response.emailVerified) {
        setErrors({ general: 'Please verify your email before logging in.' })
        setTimeout(() => navigate('/auth/check-email', { state: { email: formData.email } }), 1500)
        return
      }

      navigate(from, { replace: true })
    } catch (error) {
      const message = error?.response?.data?.message || 'Invalid email or password'
      // map backend messages to specific fields
      if (message.toLowerCase().includes('email')) {
        setErrors({ email: message })
      } else if (message.toLowerCase().includes('password')) {
        setErrors({ password: message })
      } else {
        setErrors({ general: message })
      }
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Keep original gradient */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-900 to-red-700">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=1200&fit=crop"
          alt="Luxury Car"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-white">
            <i className="fas fa-car-side text-2xl"></i>
            <span className="font-bold text-xl">Dribe</span>
          </Link>
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-white/80 leading-relaxed">
              Drive your dreams with Dribe — Nigeria's premier car rental platform.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                ))}
              </div>
              <span className="text-sm text-white/70">Join 10,000+ happy drivers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <i className="fas fa-car-side text-2xl" style={{ color: '#6B4226' }}></i>
              <span className="font-bold text-xl text-gray-900">Dribe</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Log In</h1>
            <p className="text-gray-500 mt-2">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold hover:opacity-80" style={{ color: '#6B4226' }}>
                Sign Up
              </Link>
            </p>
          </div>

          {/* General Error Banner - Keep red for errors */}
          {errors.general && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
              <i className="fas fa-exclamation-circle flex-shrink-0"></i>
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <i className={`fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-sm ${errors.email ? 'text-red-400' : 'text-gray-400'}`}></i>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                      errors.email
                        ? 'border-red-400 focus:ring-red-300 bg-red-50'
                        : 'border-gray-200 focus:ring-[#6B4226] focus:border-[#6B4226]'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <i className={`fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-sm ${errors.password ? 'text-red-400' : 'text-gray-400'}`}></i>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                      errors.password
                        ? 'border-red-400 focus:ring-red-300 bg-red-50'
                        : 'border-gray-200 focus:ring-[#6B4226] focus:border-[#6B4226]'
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i> {errors.password}
                  </p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" style={{ accentColor: '#6B4226' }} />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/auth/forgot-password" className="text-sm hover:opacity-80" style={{ color: '#6B4226' }}>
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button - Brown */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: '#6B4226' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#8B5E3C'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#6B4226'}
              >
                {isLoading ? (
                  <><i className="fas fa-spinner fa-spin"></i> Logging in...</>
                ) : 'Log In'}
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

          {/* Social - Keep original colors for Google and Apple */}
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

          <p className="text-center text-xs text-gray-400 mt-8">
            By continuing, you agree to our{' '}
            <a href="#" className="hover:opacity-80" style={{ color: '#6B4226' }}>Terms of Service</a> and{' '}
            <a href="#" className="hover:opacity-80" style={{ color: '#6B4226' }}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}