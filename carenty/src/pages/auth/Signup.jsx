import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import AuthLayout from '../../components/layout/AuthLayout'

export default function Signup() {
  const navigate = useNavigate()
  const { signup, isLoading } = useAuthStore()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the Terms and Conditions'
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
      const result = await signup({
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      })

      if (result?.success) {
        navigate('/auth/check-email', { state: { email: formData.email } })
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong'
      // map backend errors to fields
      if (message.toLowerCase().includes('email')) {
        setErrors({ email: message })
      } else if (message.toLowerCase().includes('username')) {
        setErrors({ firstName: message })
      } else {
        setErrors({ general: message })
      }
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <AuthLayout>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="max-w-md w-full py-8">

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
          <p className="text-gray-500 mb-6">
            Already have an account?{' '}
            <Link to="/login" className="text-red-500 font-semibold hover:text-red-600">
              Log In
            </Link>
          </p>

          {/* General Error Banner */}
          {errors.general && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
              <i className="fas fa-exclamation-circle flex-shrink-0"></i>
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">

              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                      errors.firstName
                        ? 'border-red-400 focus:ring-red-300 bg-red-50'
                        : 'border-gray-200 focus:ring-red-500'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i> {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                      errors.lastName
                        ? 'border-red-400 focus:ring-red-300 bg-red-50'
                        : 'border-gray-200 focus:ring-red-500'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i> {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-300 bg-red-50'
                      : 'border-gray-200 focus:ring-red-500'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                    errors.password
                      ? 'border-red-400 focus:ring-red-300 bg-red-50'
                      : 'border-gray-200 focus:ring-red-500'
                  }`}
                />
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                    errors.confirmPassword
                      ? 'border-red-400 focus:ring-red-300 bg-red-50'
                      : 'border-gray-200 focus:ring-red-500'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i> {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-4 h-4 mt-0.5 text-red-500 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-red-500 hover:text-red-600">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-red-500 hover:text-red-600">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i> {errors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <><i className="fas fa-spinner fa-spin"></i> Creating account...</>
                ) : 'Create an Account'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </AuthLayout>
    </div>
  )
}
