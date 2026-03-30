import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'

/* ─── Animated Counter ─────────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let n = 0
        const step = target / 50
        const timer = setInterval(() => {
          n += step
          if (n >= target) {
            setCount(target)
            clearInterval(timer)
          } else {
            setCount(Math.floor(n))
          }
        }, 20)
        return () => clearInterval(timer)
      }
    }, { threshold: 0.5 })

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('new')

  // Handle actions that require login
//   const handleRequireAuth = (action) => {
//     if (!isAuthenticated) {
//       toast.error('Please login to continue')
//       navigate('/auth/login')
//       return false
//     }
//     return true
//   }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/cars?search=${searchQuery}`)
    }
  }

  const handleFindCar = () => {
    navigate('/cars')
  }

  const handleDiscover = () => {
    navigate('/cars')
  }

  const handleBrowseCar = (carType) => {
    navigate(`/cars?type=${carType}`)
  }

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION - With Big Car Image */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Text Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Best Dealer for Your
                <br />
                <span className="text-red-500">Four Wheeler</span>
              </h1>
              <p className="text-gray-500 text-lg mb-8">
                Get the best price for each type of car
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex items-center bg-white border border-gray-200 rounded-full shadow-lg overflow-hidden max-w-lg mb-8">
                <i className="fas fa-search ml-5 text-gray-400"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search space name or keyword"
                  className="flex-1 py-4 px-4 outline-none text-gray-700"
                />
                <button type="submit" className="bg-red-500 text-white px-6 py-3 m-1 rounded-full hover:bg-red-600 transition font-semibold">
                  Q Search
                </button>
              </form>

              {/* Stats */}
              <div className="flex items-center gap-12">
                {[
                  { val: 50, suffix: '+', label: 'Sales per Month' },
                  { val: 30, suffix: '+', label: 'Car Brands' },
                  { val: 10, suffix: '+', label: 'Store Branches' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-black text-red-500">
                      <Counter target={stat.val} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - BIG CAR IMAGE */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-full">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-red-500/10 rounded-full blur-3xl"></div>
                {/* Car Illustration */}
                <img 
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=450&fit=crop"
                  alt="Luxury Sports Car"
                  className="relative z-10 w-full h-auto object-contain rounded-2xl"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 z-20">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <i className="fas fa-check text-red-500 text-xs"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold">Best Price</p>
                    <p className="text-xs text-gray-500">Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CAR CATEGORY CARDS - SpeedZ Sport, Dynamix City, etc. */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'SpeedZ Sport', type: 'Car', icon: 'fa-car', color: 'red', gradient: 'from-red-50 to-red-100' },
              { name: 'Dynamix City', type: 'Car', icon: 'fa-city', color: 'blue', gradient: 'from-blue-50 to-blue-100' },
              { name: 'OA Type Z', type: 'Convertible', icon: 'fa-car-side', color: 'purple', gradient: 'from-purple-50 to-purple-100' },
              { name: 'Turbo SUV', type: 'CarType', icon: 'fa-truck', color: 'green', gradient: 'from-green-50 to-green-100' },
            ].map((car, idx) => (
              <div 
                key={idx}
                onClick={() => handleBrowseCar(car.name)}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className={`h-48 bg-gradient-to-br ${car.gradient} flex items-center justify-center`}>
                  <i className={`fas ${car.icon} text-6xl text-${car.color}-500 group-hover:scale-110 transition-transform`}></i>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-xl text-gray-900">{car.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{car.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* VALUE PROPOSITION - Cheap Prices With Quality Cars */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Text */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Cheap Prices With Quality Cars
                <br />
                <span className="text-red-500">Is Always Excellent</span>
              </h2>
              <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
                We Have Everything
                <br />
                Your Car Needs
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                Who wants to buy used, Certified and new cars, this is the best place for them. 
                There are many types of cars in our store, new, old, etc. Come to our store and find your dream car.
              </p>
              <button 
                onClick={handleDiscover}
                className="bg-red-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-red-600 transition shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                Discover Today
                <i className="fas fa-arrow-right text-sm"></i>
              </button>
            </div>

            {/* Right Side - Car Image */}
            <div className="relative">
              <div className="bg-red-500 rounded-2xl h-80 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop"
                  alt="Luxury Car"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Quote */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4">
                <p className="text-sm font-bold text-gray-900">"Best service ever!"</p>
                <p className="text-xs text-gray-500">- Michael Okonkwo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CAR FINDER SECTION - New Car / Used Cars / Certified Used Cars */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Find Your Perfect Ride</h2>
            <p className="text-gray-500 mt-2">Filter through hundreds of cars to find your match</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {[
              { id: 'new', label: 'New car' },
              { id: 'used', label: 'Used Cars' },
              { id: 'certified', label: 'Certified Used Cars' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-red-500 focus:bg-white transition">
                <option>Brand / Model</option>
                <option>Toyota</option>
                <option>Honda</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Lexus</option>
              </select>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-red-500 focus:bg-white transition">
                <option>Condition</option>
                <option>New</option>
                <option>Like New</option>
                <option>Excellent</option>
                <option>Good</option>
              </select>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-red-500 focus:bg-white transition">
                <option>Price Range</option>
                <option>₦1M - ₦5M</option>
                <option>₦5M - ₦10M</option>
                <option>₦10M - ₦20M</option>
                <option>₦20M+</option>
              </select>
            </div>
            <button 
              onClick={handleFindCar}
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2"
            >
              <i className="fas fa-search"></i>
              Find Car
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ALL CARS PREVIEW */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Cars</h2>
            <Link to="/cars" className="text-red-500 hover:underline text-sm">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Mercedes S-Class', price: '₦89,900', year: '2024', type: 'Luxury Sedan' },
              { name: 'BMW 7 Series', price: '₦95,500', year: '2024', type: 'Luxury Sedan' },
              { name: 'Audi RS7', price: '₦112,000', year: '2024', type: 'Sports Sedan' },
              { name: 'Lexus LS', price: '₦76,800', year: '2024', type: 'Luxury Sedan' },
            ].map((car, idx) => (
              <div key={idx} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <i className="fas fa-car-side text-5xl text-gray-400 group-hover:scale-110 transition"></i>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{car.name}</h3>
                  <p className="text-xs text-gray-500">{car.year} • {car.type}</p>
                  <p className="text-red-500 font-bold mt-2">{car.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* WE HAVE ALL TYPE CARS + BLOG CONTENT */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* All Type Cars Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Have All Type Cars</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Lorem Ipsum is simply dummy text of the Lorem Ipsum has been the industry's standard
              during text ever since the 1500s
            </p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {['Rolls-Royce', 'Jaguar Car', 'Porsche Car', 'BMW Car', 'Bugatti', 'Ferrari'].map((brand, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md hover:-translate-y-1 transition cursor-pointer">
                <div className="w-12 h-12 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <i className="fas fa-car text-red-500 text-xl"></i>
                </div>
                <span className="text-sm font-medium text-gray-700">{brand}</span>
              </div>
            ))}
          </div>

          {/* Blog Content */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Blog Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['Rolls-Royce', 'Jaguar Car', 'Porsche Car', 'BMW Car'].map((post, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="bg-gray-200 rounded-xl overflow-hidden h-48 mb-3">
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <i className="fas fa-car-side text-4xl text-gray-500"></i>
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-800 group-hover:text-red-500 transition">{post}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FOOTER */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <i className="fas fa-car-side text-2xl text-red-500"></i>
                <span className="font-bold text-xl">Dribe</span>
              </div>
              <p className="text-gray-400 text-sm">Find your dream car in Nigeria. Trusted by thousands.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/cars" className="hover:text-white">All Cars</Link></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2"><i className="fas fa-phone-alt w-5"></i> +1234567890</li>
                <li className="flex items-center gap-2"><i className="fas fa-envelope w-5"></i> support@drivo.com</li>
                <li className="flex items-center gap-2"><i className="fas fa-map-marker-alt w-5"></i> Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
          <hr className="border-gray-800 mb-6" />
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Dribe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}