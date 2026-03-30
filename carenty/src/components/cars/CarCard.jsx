import { Link } from 'react-router-dom'

export default function CarCard({ car }) {
  return (
    <Link
      key={car._id}
      to={`/cars/${car._id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={car.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {car.used && (
          <div className="absolute top-3 left-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-900/80 text-white">
              Used
            </span>
          </div>
        )}
        {!car.used && (
          <div className="absolute top-3 left-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: '#6B4226', color: 'white' }}>
              New
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-heading text-lg font-semibold mb-1" style={{ color: '#4B2E2B' }}>
              {car.make} {car.model}
            </h3>
            <p className="text-xs text-gray-500 font-body">{car.year} · {car.transmission}</p>
          </div>
          <i className="far fa-heart text-gray-400 hover:text-red-500 transition cursor-pointer"></i>
        </div>

        <p className="text-2xl font-bold mt-2" style={{ color: '#6B4226' }}>
          ${car.price.toLocaleString()}
        </p>

        <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-gray-500 font-body" style={{ borderColor: '#F0ECE8' }}>
          <span><i className="fas fa-gas-pump mr-1"></i> {car.fuelType}</span>
          <span><i className="fas fa-tachometer-alt mr-1"></i> {car.mileage?.toLocaleString()} km</span>
          <span><i className="fas fa-map-marker-alt mr-1"></i> Lagos</span>
        </div>
      </div>
    </Link>
  )
}
