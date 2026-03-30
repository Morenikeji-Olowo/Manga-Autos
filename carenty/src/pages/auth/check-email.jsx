import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import authService from '../../services/authService'

export default function CheckEmail() {
  // getting email form state
  const { state } = useLocation()
  const email = state?.email

  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const handleResend = async () => {
    if (!email) {
      toast.error('Email not found. Please sign up again.')
      return
    }
    setResending(true)
    try {
      await authService.resendVerificatiion(email)
      setResent(true)
      toast.success('Verification email resent!')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to resend. Try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Keep original */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-900 to-red-700">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=1200&fit=crop"
          alt="Luxury Sports Car"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full text-center">

          {/* Icon - Updated to brown */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#F5EDE3' }}>
            <i className="fas fa-envelope text-3xl" style={{ color: '#6B4226' }}></i>
          </div>

          {/* Text */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Check your email</h1>
          <p className="text-gray-500 mb-2">
            We've sent a verification link to{' '}
            {email
              ? <strong className="text-gray-900">{email}</strong>
              : 'your email address'
            }.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Click the link in the email to activate your account. If you don't see it, check your spam folder.
          </p>

          {/* Steps - Updated to brown */}
          <div className="rounded-2xl p-5 mb-8 text-left space-y-4" style={{ background: '#FDF9F2' }}>
            {[
              { icon: 'fa-inbox', text: 'Open your email inbox' },
              { icon: 'fa-envelope-open-text', text: 'Find the email from us' },
              { icon: 'fa-mouse-pointer', text: 'Click the verification link' },
              { icon: 'fa-check-circle', text: 'Your account is ready!' },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#F5EDE3' }}>
                  <i className={`fas ${step.icon} text-sm`} style={{ color: '#6B4226' }}></i>
                </div>
                <span className="text-sm text-gray-600">{step.text}</span>
              </div>
            ))}
          </div>

          {/* Actions - Updated button to brown */}
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full text-white font-semibold py-3 rounded-xl transition"
              style={{ background: '#6B4226' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#8B5E3C'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#6B4226'}
            >
              Go to Login
            </Link>
            <Link
              to="/signup"
              className="block w-full border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition text-sm"
            >
              Wrong email? Sign up again
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Didn't receive anything?{' '}
            <button
              onClick={handleResend}
              disabled={resending || resent}
              className="font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
              style={{ color: '#6B4226' }}
            >
              {resending ? 'Sending...' : resent ? 'Email sent ✓' : 'Resend email'}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}