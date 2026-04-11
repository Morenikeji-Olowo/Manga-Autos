import { Share2 } from 'lucide-react'
import toast from 'react-hot-toast'

const ShareButton = ({ car }) => {
  const handleShare = async () => {
    const url = window.location.href
    const shareData = {
      title: `${car.make} ${car.model} - ${car.name}`,
      text: `Check out this ${car.basicDetails?.year} ${car.make} ${car.model} for ₦${car.price?.toLocaleString()}`,
      url
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error('Share failed:', err.message)
        toast.error('Sharing failed. Please try again.')
      }
    } else {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <button onClick={handleShare} className="p-2 sm:p-2.5 bg-white/95 backdrop-blur rounded-full hover:bg-white transition shadow-sm">
      <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
    </button>
  )
}

export default ShareButton