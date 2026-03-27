import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import toast from 'react-hot-toast'

export default function Signup() {
  const navigate = useNavigate()
  const { signup, isLoading } = useAuthStore()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
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
  
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
    toast.error('Please fill in all fields')
    return
  }
  
  if (formData.password !== formData.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }
  
  if (formData.password.length < 6) {
    toast.error('Password must be at least 6 characters')
    return
  }
  
  if (!formData.agreeTerms) {
    toast.error('Please agree to the Terms and Conditions')
    return
  }

  try {
    await signup({
      username: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password
    })
    
    toast.success('Account created! Please check your email to verify your account.')
    navigate('/auth/check-email') // <-- create this page
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong. Please try again.')
  }
}

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Car Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-900 to-red-700">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=1200&fit=crop"
          alt="Luxury Sports Car"
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
            <h2 className="text-4xl font-bold mb-4">Create An Account</h2>
            <p className="text-white/80 leading-relaxed">
              Join thousands of drivers who trust Dribe for their car rental needs.
              Fast, secure, and reliable.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                ))}
              </div>
              <span className="text-sm text-white/70">Join 10,000+ happy drivers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="max-w-md w-full py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <i className="fas fa-car-side text-2xl text-red-500"></i>
              <span className="font-bold text-xl text-gray-900">Dribe</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
            <p className="text-gray-500 mt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-red-500 font-semibold hover:text-red-600">
                Log In
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Name Fields - First & Last */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      placeholder="Ethan"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      placeholder="Walker"
                    />
                  </div>
                </div>
              </div>

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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <i className="fas fa-check-circle absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-red-500 rounded border-gray-300 focus:ring-red-500"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-red-500 hover:text-red-600">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-red-500 hover:text-red-600">Privacy Policy</a>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                onSubmit={handleSubmit}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Create an Account'}
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

          {/* Social Signup */}
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
            AI-assisted workspace to craft and elevate your ideas.
          </p>
        </div>
      </div>
    </div>
  )
}