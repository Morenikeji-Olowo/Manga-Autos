import { Link } from 'react-router-dom'
import { MapPin, Fuel, Gauge, Calendar, Heart } from 'lucide-react'

export default function CarCard({ car }) {
  const details = car.basicDetails || {}
  
  return (
    <Link to={`/cars/${car._id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={car.images?.[0] || `https://placehold.co/600x400/1a1a1a/white?text=${car.make}+${car.model}`}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button 
            onClick={(e) => {
              e.preventDefault()
              // Handle wishlist toggle
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition z-10 shadow-sm"
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition" />
          </button>
          
          {/* Status Badge */}
          {car.used === false ? (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-green-600/95 backdrop-blur text-white text-xs font-medium rounded-lg shadow-sm">
              Brand New
            </span>
          ) : (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-gray-900/95 backdrop-blur text-white text-xs font-medium rounded-lg shadow-sm">
              Local Used
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {car.make} {car.model}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">{details.year || '—'}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-xs text-gray-500 capitalize">{details.transmission || '—'}</span>
              </div>
            </div>
            <p className="text-xl font-bold text-gray-900">
              ₦{car.price?.toLocaleString()}
            </p>
          </div>

          {/* Specs Row */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-600 capitalize">{details.fuelType || '—'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-600">{details.mileage?.toLocaleString() || '—'} km</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-600">{car.currentLocation?.split(',')[0] || '—'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}