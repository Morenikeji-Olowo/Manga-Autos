import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      toast.success('Reset link sent to your email!')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Car Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-900 to-red-700">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=1200&fit=crop"
          alt="Luxury Car Interior"
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
            <h2 className="text-4xl font-bold mb-4">Reset Password</h2>
            <p className="text-white/80 leading-relaxed">
              Don't worry! We'll send you a link to reset your password and get back on the road.
            </p>
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
            <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
            <p className="text-gray-500 mt-2">
              Remember your password?{' '}
              <Link to="/auth/login" className="text-red-500 font-semibold hover:text-red-600">
                Back to Login
              </Link>
            </p>
          </div>

          {!isSubmitted ? (
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      placeholder="you@example.com"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    We'll send you a link to reset your password
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
                >
                  {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Send Reset Link'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <i className="fas fa-check-circle text-4xl text-green-500 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
              <p className="text-gray-600 mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-red-500 font-medium hover:text-red-600"
              >
                <i className="fas fa-arrow-left"></i>
                Back to Login
              </Link>
            </div>
          )}

          {/* Footer Text */}
          <p className="text-center text-xs text-gray-400 mt-8">
            AI-assisted workspace to craft and elevate your ideas.
          </p>
        </div>
      </div>
    </div>
  )
}