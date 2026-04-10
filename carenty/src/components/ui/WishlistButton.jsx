import { useState } from 'react'
import { Heart } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast' // or your preferred toast library

export default function WishlistButton({ carId, className = '', size = 'md', onToggle }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, user } = useAuthStore()
  const navigate = useNavigate()

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
    
    // Auth check
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname)
      sessionStorage.setItem('wishlistIntent', carId)
      
      toast.error('Please log in to add items to your wishlist')
      navigate('/login')
      return
    }

    setIsLoading(true)
    try {
      // Your API call here
      // const response = await wishlistService.toggle(carId)
      
      // Simulate API
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const newState = !isWishlisted
      setIsWishlisted(newState)
      
      // Call optional callback
      if (onToggle) onToggle(carId, newState)
      
      // Show toast
      toast.success(newState ? 'Added to wishlist!' : 'Removed from wishlist')
    } catch (error) {
      console.error('Wishlist error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
  )
}