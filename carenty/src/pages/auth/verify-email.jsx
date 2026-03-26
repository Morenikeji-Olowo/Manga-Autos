import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import process from 'process'

export default function VerifyEmail() {
  const { token } = useParams()  // grabs the token from URL
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify-email/${token}`)
        toast.success('Email verified! You can now log in.')
        navigate('/auth/login')
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Verification failed.')
        navigate('/auth/login')
      } finally {
        setLoading(false)
      }
    }
    verify()
  }, [token, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {loading ? (
        <p className="text-gray-600">Verifying your email...</p>
      ) : null}
    </div>
  )
}