import { Link } from 'react-router-dom'

export default function CheckEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to your email. Please check your inbox and click the link to activate your account.
        </p>
        <Link 
          to="/auth/login" 
          className="inline-block bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}