import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const handleLogout = async () => {
    await logout()
    setActiveDropdown(null)
    navigate('/')
  }

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300"
      style={{
        boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
        borderBottom: '1px solid #e5e7eb'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/image.png"
              alt="Sirkin Mota"
              className="h-10 lg:h-12 w-auto object-contain"
            />
            <span className="text-xl lg:text-2xl font-bold text-gray-900 hidden sm:block">
              Sirkin Mota
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Cars Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown('cars')}
                className="text-gray-700 hover:text-gray-900 font-medium py-2"
              >
                Cars
              </button>

              {activeDropdown === 'cars' && (
                <div
                  className="absolute top-8 left-0 bg-white rounded-lg shadow-lg py-2 min-w-[200px] border border-gray-100"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to="/cars"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setActiveDropdown(null)}
                  >
                    All Cars
                  </Link>
                  <Link
                    to="/cars?filter=new"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setActiveDropdown(null)}
                  >
                    New Arrivals
                  </Link>
                  <Link
                    to="/cars?filter=luxury"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Luxury Collection
                  </Link>
                  <Link
                    to="/cars?filter=suv"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setActiveDropdown(null)}
                  >
                    SUVs
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <Link
                    to="/sell"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Sell Your Car
                  </Link>
                </div>
              )}
            </div>

            {/* About */}
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              About
            </Link>

            {/* Work */}
            <Link
              to="/work"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Work
            </Link>

            {/* Contact Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown('contact')}
                className="text-gray-700 hover:text-gray-900 font-medium py-2"
              >
                Contact
              </button>

              {activeDropdown === 'contact' && (
                <div
                  className="absolute top-8 left-0 bg-white rounded-lg shadow-lg py-2 min-w-[180px] border border-gray-100"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Send Message
                  </Link>
                  <a
                    href="tel:+2348000000000"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Call Us
                  </a>
                  <Link
                    to="/contact#location"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Visit Showroom
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  <span>{user?.username?.split(' ')[0]}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'profile' ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeDropdown === 'profile' && (
                  <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg py-2 min-w-[160px] border border-gray-100">
                    <Link
                      to="/profile"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Saved Cars
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Orders
                    </Link>
                    {user?.isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-gray-900 transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-900 transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-900 transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Nav Links */}
            <Link
              to="/cars"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Cars
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/work"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Auth */}
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <p className="font-medium text-gray-900">{user?.username}</p>
                  <p className="text-sm text-gray-500 mb-3">{user?.email}</p>
                  <Link
                    to="/profile"
                    className="block py-2 text-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block py-2 text-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Saved Cars
                  </Link>
                  <Link
                    to="/orders"
                    className="block py-2 text-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  {user?.isAdmin && (
                    <Link
                      to="/admin"
                      className="block py-2 text-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout()
                      setMenuOpen(false)
                    }}
                    className="block py-2 text-red-600 w-full text-left"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}