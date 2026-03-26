import { useParams, Link } from 'react-router-dom'

export default function CarDetail() {
  const { id } = useParams()
  
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/cars" className="text-red-500 hover:underline mb-6 inline-block">
          ← Back to Cars
        </Link>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
            <i className="fas fa-car-side text-8xl text-gray-400"></i>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">Car {id}</h1>
            <p className="text-gray-500 mb-4">2023 • 15,000 km • Automatic</p>
            <div className="text-3xl font-bold text-red-500 mb-6">₦25,000 <span className="text-base text-gray-400">/day</span></div>
            
            <div className="border-t border-b py-6 mb-6">
              <h3 className="font-semibold mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm">✓ Air Conditioning</span>
                <span className="text-sm">✓ Bluetooth</span>
                <span className="text-sm">✓ GPS Navigation</span>
                <span className="text-sm">✓ Backup Camera</span>
                <span className="text-sm">✓ Leather Seats</span>
                <span className="text-sm">✓ Sunroof</span>
              </div>
            </div>
            
            <button className="w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition font-semibold">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}