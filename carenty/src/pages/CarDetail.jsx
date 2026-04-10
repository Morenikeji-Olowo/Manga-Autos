import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import carService from '../services/carsService'
import { 
  Heart, Share2, MapPin, Fuel, Gauge, Calendar, 
  Settings, Shield, Award, Check, X, 
  Phone, MessageCircle, Clock, Users, 
  Zap, Sparkles, TrendingUp, Eye, 
  ChevronLeft, ChevronRight, Maximize2,
  Navigation, Battery, Wind, Car as CarIcon
} from 'lucide-react'

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [similarCars, setSimilarCars] = useState([])
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchCarDetails = async () => {
      setIsLoading(true)
      try {
        const data = await carService.getCarById(id)
        setCar(data)
        // Fetch similar cars based on make/model
        const similar = await carService.getSimilarCars(id, data.make, data.model)
        setSimilarCars(similar)
      } catch (error) {
        console.error('Error fetching car details:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCarDetails()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen pt-20">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500 font-body">Loading vehicle details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen pt-20">
          <div className="text-center">
            <CarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-body">Vehicle not found</p>
            <Link to="/cars" className="mt-4 inline-block text-gray-900 underline font-body">
              Back to listings
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Helper to get nested basicDetails
  const details = car.basicDetails || {}

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb - Clean & Minimal */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm font-body">
            <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/cars" className="text-gray-500 hover:text-gray-900">Cars</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/cars?make=${car.make}`} className="text-gray-500 hover:text-gray-900">{car.make}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{car.model} {details.year}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN - Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={car.images?.[selectedImage] || `https://placehold.co/800x600/1a1a1a/white?text=${car.make}+${car.model}`}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
              
              {/* Action Buttons */}
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2.5 bg-white/95 backdrop-blur rounded-full hover:bg-white transition shadow-sm"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
              <button className="absolute top-4 right-16 p-2.5 bg-white/95 backdrop-blur rounded-full hover:bg-white transition shadow-sm">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {car.images?.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-gray-900 shadow-md' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Specs Cards */}
            <div className="grid grid-cols-4 gap-3 mt-6">
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 mx-auto text-gray-500 mb-1.5" />
                <p className="text-xs text-gray-500 font-body">Year</p>
                <p className="text-sm font-semibold text-gray-900">{details.year || '—'}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <Gauge className="w-5 h-5 mx-auto text-gray-500 mb-1.5" />
                <p className="text-xs text-gray-500 font-body">Mileage</p>
                <p className="text-sm font-semibold text-gray-900">{details.mileage?.toLocaleString() || '—'} km</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <Fuel className="w-5 h-5 mx-auto text-gray-500 mb-1.5" />
                <p className="text-xs text-gray-500 font-body">Fuel</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">{details.fuelType || '—'}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <Settings className="w-5 h-5 mx-auto text-gray-500 mb-1.5" />
                <p className="text-xs text-gray-500 font-body">Transmission</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">{details.transmission || '—'}</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Car Information */}
          <div>
            {/* Title & Price */}
            <div className="mb-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {car.make} {car.model}
                  </h1>
                  <p className="text-gray-500 mt-2 font-body">
                    {details.year} • {details.condition === 'excellent' ? '✨ Excellent Condition' : 
                                 details.condition === 'good' ? '✓ Good Condition' : 
                                 details.condition === 'fair' ? '• Fair Condition' : 'Premium Vehicle'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl lg:text-4xl font-bold text-gray-900">
                    ₦{car.price?.toLocaleString()}
                  </p>
                  {car.negotiable && (
                    <p className="text-sm text-green-600 font-medium mt-1">Price negotiable</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location & Status */}
            <div className="flex flex-wrap items-center gap-3 text-gray-500 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-body">{car.currentLocation || 'Lagos, Nigeria'}</span>
              </div>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-body">Listed {new Date(car.listedDate).toLocaleDateString()}</span>
              </div>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-body">{car.views || 0} views</span>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'specifications', label: 'Specifications' },
                  { id: 'features', label: 'Features' },
                  { id: 'history', label: 'Vehicle History' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium transition-colors font-body ${
                      activeTab === tab.id
                        ? 'text-gray-900 border-b-2 border-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-8 min-h-[300px]">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed font-body">
                    {car.description || `Experience luxury and performance with this ${details.year} ${car.make} ${car.model}. 
                    This well-maintained vehicle offers exceptional comfort, advanced technology features, and outstanding reliability. 
                    Perfect for both city commuting and long-distance journeys.`}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Zap className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500 font-body">Engine</p>
                        <p className="text-sm font-semibold text-gray-900">{details.engineSize || '—'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Navigation className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500 font-body">Drivetrain</p>
                        <p className="text-sm font-semibold text-gray-900 uppercase">{details.drivetrain || '—'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Users className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500 font-body">Seating</p>
                        <p className="text-sm font-semibold text-gray-900">5 Seats</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Sparkles className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500 font-body">Condition</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize">{details.condition || 'Excellent'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Section */}
                  {car.benefits?.length > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3 font-body">✨ Special Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {car.benefits.map((benefit, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-700">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <SpecItem label="Make" value={car.make} />
                    <SpecItem label="Model" value={car.model} />
                    <SpecItem label="Year" value={details.year} />
                    <SpecItem label="Mileage" value={details.mileage ? `${details.mileage.toLocaleString()} km` : '—'} />
                    <SpecItem label="Fuel Type" value={details.fuelType ? details.fuelType.toUpperCase() : '—'} />
                    <SpecItem label="Transmission" value={details.transmission ? details.transmission.toUpperCase() : '—'} />
                    <SpecItem label="Engine Size" value={details.engineSize || '—'} />
                    <SpecItem label="Drivetrain" value={details.drivetrain ? details.drivetrain.toUpperCase() : '—'} />
                    <SpecItem label="Exterior Color" value={details.exteriorColor || '—'} />
                    <SpecItem label="Interior Color" value={details.interiorColor || '—'} />
                    <SpecItem label="Grade" value={details.grade || '—'} />
                    <SpecItem label="Top Speed" value={details.speed ? `${details.speed} km/h` : '—'} />
                    {details.vin && <SpecItem label="VIN" value={details.vin} className="font-mono" />}
                    {details.plateNumber && <SpecItem label="Plate Number" value={details.plateNumber} />}
                  </div>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="space-y-6">
                  {car.comfort?.length > 0 && (
                    <FeatureSection title="Comfort & Convenience" icon={Settings} items={car.comfort} />
                  )}
                  {car.safety?.length > 0 && (
                    <FeatureSection title="Safety" icon={Shield} items={car.safety} />
                  )}
                  {car.multimedia?.length > 0 && (
                    <FeatureSection title="Multimedia & Entertainment" icon={Award} items={car.multimedia} />
                  )}
                  {car.security?.length > 0 && (
                    <FeatureSection title="Security" icon={Shield} items={car.security} />
                  )}
                  {(!car.comfort?.length && !car.safety?.length && !car.multimedia?.length && !car.security?.length) && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No features listed. Contact seller for more details.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Vehicle History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-4">
                  <HistoryItem 
                    label="Accidents or Damages" 
                    value={car.vechicleHistory?.accidentsOrDamages} 
                    positiveText="None Reported" 
                    negativeText="Reported"
                  />
                  <HistoryItem 
                    label="One Owner Vehicle" 
                    value={car.vechicleHistory?.oneOwnerVehicle} 
                    positiveText="Yes" 
                    negativeText="No"
                  />
                  <HistoryItem 
                    label="Personal Use Only" 
                    value={car.vechicleHistory?.personalUseOnly} 
                    positiveText="Yes" 
                    negativeText="No"
                  />
                  <HistoryItem 
                    label="Service History Available" 
                    value={car.vechicleHistory?.serviceHistoryAvailable} 
                    positiveText="Available" 
                    negativeText="Not Available"
                  />
                  <HistoryItem 
                    label="Imported Vehicle" 
                    value={car.vechicleHistory?.importedVehicle} 
                    positiveText="Foreign Used" 
                    negativeText="Local Used"
                  />
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900">Vehicle History Verified</p>
                        <p className="text-sm text-green-700 mt-0.5">This vehicle's history has been reviewed by our team</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-medium font-body"
              >
                <Phone className="w-4 h-4" />
                Show Contact
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700 font-body">
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Similar Cars Section */}
        {similarCars.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Similar Cars</h2>
                <p className="text-gray-500 mt-1 font-body">You might also like these vehicles</p>
              </div>
              <Link to="/cars" className="text-sm text-gray-600 hover:text-gray-900 font-body">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCars.slice(0, 4).map(similarCar => (
                <SimilarCarCard key={similarCar._id} car={similarCar} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowContactModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Contact Seller</h3>
                <button onClick={() => setShowContactModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-body">Phone Number</p>
                    <p className="text-base font-semibold">+234 802 345 6789</p>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-gray-900 text-white rounded-lg font-body">Call</button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-body">WhatsApp</p>
                    <p className="text-base font-semibold">+234 802 345 6789</p>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg font-body">Chat</button>
                </div>
                <p className="text-xs text-gray-400 text-center pt-2 font-body">
                  Contact seller directly for inquiries about this {car.make} {car.model}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Helper Components
function SpecItem({ label, value, className = '' }) {
  return (
    <div className="py-2">
      <p className="text-xs text-gray-500 font-body">{label}</p>
      <p className={`text-sm font-medium text-gray-900 mt-0.5 ${className}`}>{value || '—'}</p>
    </div>
  )
}

function FeatureSection({ title, icon: Icon, items }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-gray-500" />
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-600 font-body">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function HistoryItem({ label, value, positiveText, negativeText }) {
  const isPositive = value === true
  const isNegative = value === false
  
  let displayText = '—'
  let textColor = 'text-gray-600'
  
  if (isPositive) {
    displayText = positiveText
    textColor = 'text-green-600'
  } else if (isNegative) {
    displayText = negativeText
    textColor = value !== undefined ? 'text-gray-600' : 'text-gray-400'
  }
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <span className="text-sm text-gray-600 font-body">{label}</span>
      <span className={`text-sm font-medium ${textColor}`}>{displayText}</span>
    </div>
  )
}

function SimilarCarCard({ car }) {
  const details = car.basicDetails || {}
  
  return (
    <Link to={`/cars/${car._id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={car.images?.[0] || `https://placehold.co/400x300/1a1a1a/white?text=${car.make}`}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900">{car.make} {car.model}</h3>
          <p className="text-xs text-gray-500 mt-1">{details.year} • {details.mileage?.toLocaleString()} km</p>
          <p className="text-lg font-bold text-gray-900 mt-2">₦{car.price?.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{car.currentLocation?.split(',')[0]}</p>
        </div>
      </div>
    </Link>
  )
}