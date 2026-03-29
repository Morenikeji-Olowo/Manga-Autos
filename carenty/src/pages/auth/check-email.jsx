import { Link } from 'react-router-dom'

export default function CheckEmail() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (same as Signup) */}
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
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-envelope text-red-500 text-3xl"></i>
          </div>

          {/* Text */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Check your email</h1>
          <p className="text-gray-500 mb-2">
            We've sent a verification link to your email address.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Click the link in the email to activate your account. If you don't see it, check your spam folder.
          </p>

          {/* Steps */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left space-y-4">
            {[
              { icon: 'fa-inbox', text: 'Open your email inbox' },
              { icon: 'fa-envelope-open-text', text: 'Find the email from us' },
              { icon: 'fa-mouse-pointer', text: 'Click the verification link' },
              { icon: 'fa-check-circle', text: 'Your account is ready!' },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${step.icon} text-red-500 text-sm`}></i>
                </div>
                <span className="text-sm text-gray-600">{step.text}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition"
            >
              Go to Login
            </Link>
            <Link
              to="/auth/signup"
              className="block w-full border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition text-sm"
            >
              Wrong email? Sign up again
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Didn't receive anything?{' '}
            <button className="text-red-500 hover:text-red-600 font-medium">
              Resend email
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
