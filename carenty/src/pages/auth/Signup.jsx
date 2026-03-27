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
    const result = await signup({
      username: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password
    })

    if (result?.success) {
      toast.success('Account created! Please check your email.')
      navigate('/auth/check-email')
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message || 'Something went wrong')
  }
}

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-900 to-red-700">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=1200&fit=crop"
          alt="Luxury Sports Car"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="max-w-md w-full py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign Up</h1>
          <p className="text-gray-500 mb-6">
            Already have an account?{' '}
            <Link to="/login" className="text-red-500 font-semibold hover:text-red-600">
              Log In
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-500"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-red-500 hover:text-red-600">Terms of Service</a> and{' '}
                  <a href="#" className="text-red-500 hover:text-red-600">Privacy Policy</a>
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create an Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}