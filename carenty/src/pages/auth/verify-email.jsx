import { Link, useSearchParams } from 'react-router-dom'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status') // success | invalid | error

  const states = {
    success: {
      icon: 'fa-check-circle',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
      title: 'Email Verified!',
      message: 'Your account has been successfully verified. You can now log in.',
    },
    invalid: {
      icon: 'fa-times-circle',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      title: 'Invalid Link',
      message: 'This verification link is invalid or has already been used.',
    },
    error: {
      icon: 'fa-exclamation-circle',
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
      title: 'Something went wrong',
      message: 'We couldn\'t verify your email. Please try again or request a new link.',
    },
  }

  const current = states[status] || states.error

  return (
    <div className="min-h-screen flex">
      {/* Left Side - same as Signup */}
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

          {/* Icon */}
          <div className={`w-20 h-20 ${current.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <i className={`fas ${current.icon} ${current.iconColor} text-3xl`}></i>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">{current.title}</h1>
          <p className="text-gray-500 mb-8">{current.message}</p>

          {/* Actions */}
          <div className="space-y-3">
            {status === 'success' && (
              <Link
                to="/login"
                className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition"
              >
                Go to Login
              </Link>
            )}
            {(status === 'invalid' || status === 'error') && (
              <>
                <Link
                  to="/auth/check-email"
                  className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition"
                >
                  Resend Verification Email
                </Link>
                <Link
                  to="signup"
                  className="block w-full border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition text-sm"
                >
                  Back to Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
