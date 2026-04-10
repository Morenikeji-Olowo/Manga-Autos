import { useState, useEffect } from 'react'
import { Heart, X, LogIn } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'

export default function WishlistButton({ carId, className = '', size = 'md', onToggle }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showToastPopup, setShowToastPopup] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  // Auto-hide popup after 5 seconds
  useEffect(() => {
    if (showToastPopup) {
      const timer = setTimeout(() => setShowToastPopup(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showToastPopup])

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2 sm:p-2.5',
    lg: 'p-3'
  }

  const iconSizes = {
    sm: 'w-3 h-3 sm:w-4 sm:h-4',
    md: 'w-4 h-4 sm:w-5 sm:h-5',
    lg: 'w-5 h-5 sm:w-6 sm:h-6'
  }

  const handleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      setShowToastPopup(true)
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      const newState = !isWishlisted
      setIsWishlisted(newState)
      if (onToggle) onToggle(carId, newState)
    } catch (error) {
      console.error('Wishlist error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = () => {
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname)
    sessionStorage.setItem('wishlistIntent', carId)
    setShowToastPopup(false)
    navigate('/login')
  }

  return (
    <>
      <button
        onClick={handleWishlist}
        disabled={isLoading}
        className={`
          ${sizeClasses[size]} 
          bg-white/95 backdrop-blur rounded-full 
          hover:bg-white transition shadow-sm
          disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-95 transform transition-transform
          ${className}
        `}
      >
        {isLoading ? (
          <div className={`${iconSizes[size]} border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin`} />
        ) : (
          <Heart 
            className={`
              ${iconSizes[size]} 
              transition-all duration-200
              ${isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-700 hover:text-red-500'
              }
            `} 
          />
        )}
      </button>

      {/* Slide-in Toast Popup */}
      {showToastPopup && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-sm mx-4 overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Login to save this car</p>
                <p className="text-gray-400 text-xs mt-0.5">Create an account to build your wishlist</p>
              </div>
              <button
                onClick={handleLogin}
                className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-medium hover:bg-gray-100 transition"
              >
                Login
              </button>
              <button
                onClick={() => setShowToastPopup(false)}
                className="text-gray-500 hover:text-gray-300 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  )
}