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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Roboto:wght@300;400;500;600;700&display=swap');
        
        :root {
          --brown: #6B4226;
          --brown-light: #8B5E3C;
          --brown-dark: #3D2314;
          --cream: #F5EFE6;
          --cream-dark: #EAE0D0;
          --text: #1C1007;
          --text-muted: #7A6552;
        }
        
        body { 
          font-family: 'Roboto', sans-serif; 
        }
        
        .font-display { 
          font-family: 'Playfair Display', serif !important; 
        }

        .nav-underline { 
          position: relative; 
        }
        
        .nav-underline::after {
          content: '';
          position: absolute;
          bottom: -2px; 
          left: 0;
          width: 0; 
          height: 1.5px;
          background: var(--brown);
          transition: width 0.3s ease;
        }
        
        .nav-underline:hover::after { 
          width: 100%; 
        }

        .dropdown-fade {
          opacity: 0;
          transform: translateY(-6px);
          animation: dropFadeIn 0.18s ease forwards;
        }
        
        @keyframes dropFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-slide {
          animation: mobileSlide 0.25s ease forwards;
        }
        
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-item {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .dropdown-item:hover {
          background: var(--cream);
          color: var(--brown);
          padding-left: 1.25rem;
        }
      `}</style>

      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300"
        style={{
          borderBottom: '1px solid #f0ece8',
          boxShadow: scrolled ? '0 2px 24px rgba(61,35,20,0.07)' : '0 1px 0 #f0ece8',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/image.png"
                alt="Sirkin Mota"
                className="h-10 lg:h-12 w-auto object-contain"
              />
              <span className="font-display text-lg lg:text-xl tracking-tight hidden sm:block" style={{ color: 'var(--brown-dark)' }}>
                Sirkin Mota
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Cars dropdown - Text only */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown('cars')}
                  className="nav-underline text-sm font-medium py-1"
                  style={{ color: 'var(--text)', fontFamily: "'Roboto', sans-serif" }}
                >
                  Cars
                </button>

                {activeDropdown === 'cars' && (
                  <div
                    className="dropdown-fade absolute top-8 left-0 bg-white rounded-lg py-2 min-w-[200px]"
                    style={{
                      border: '1px solid #ede8e2',
                      boxShadow: '0 10px 30px rgba(61,35,20,0.08)',
                    }}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="flex flex-col">
                      <Link
                        to="/cars"
                        className="dropdown-item px-4 py-2.5 text-sm"
                        style={{ color: 'var(--text)' }}
                      >
                        All Cars
                      </Link>
                      <Link
                        to="/cars?filter=new"
                        className="dropdown-item px-4 py-2.5 text-sm"
                        style={{ color: 'var(--text)' }}
                      >
                        New Arrivals
                      </Link>
                      <Link
                        to="/cars?filter=luxury"
                        className="dropdown-item px-4 py-2.5 text-sm"
                        style={{ color: 'var(--text)' }}
                      >
                        Luxury Collection
                      </Link>
                      <Link
                        to="/cars?filter=suv"
                        className="dropdown-item px-4 py-2.5 text-sm"
                        style={{ color: 'var(--text)' }}
                      >
                        SUVs
                      </Link>
                      <div className="border-t my-1" style={{ borderColor: '#f0ece8' }} />
                      <Link
                        to="/sell"
                        className="dropdown-item px-4 py-2.5 text-sm"
                        style={{ color: 'var(--text)' }}
                      >
                        Sell Your Car
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* About link */}
              <Link
                to="/about"
                className="nav-underline text-sm font-medium py-1"
                style={{ color: 'var(--text)', fontFamily: "'Roboto', sans-serif" }}
              >
                About
              </Link>

              {/* Work/Portfolio link */}
              <Link
                to="/work"
                className="nav-underline text-sm font-medium py-1"
                style={{ color: 'var(--text)', fontFamily: "'Roboto', sans-serif" }}
              >
                Work
              </Link>

              {/* Contact dropdown - Text only */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown('contact')}
                  className="nav-underline text-sm font-medium py-1"
                  style={{ color: 'var(--text)', fontFamily: "'Roboto', sans-serif" }}
                >
                  Contact
                </button>

                {activeDropdown === 'contact' && (
                  <div
                    className="dropdown-fade absolute top-8 left-0 bg-white rounded-lg py-2 min-w-[180px]"
                    style={{
                      border: '1px solid #ede8e2',
                      boxShadow: '0 10px 30px rgba(61,35,20,0.08)',
                    }}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to="/contact"
                      className="dropdown-item px-4 py-2.5 text-sm"
                      style={{ color: 'var(--text)' }}
                    >
                      Send Message
                    </Link>
                    <a
                      href="tel:+2348000000000"
                      className="dropdown-item px-4 py-2.5 text-sm block"
                      style={{ color: 'var(--text)' }}
                    >
                      Call Us
                    </a>
                    <Link
                      to="/contact#location"
                      className="dropdown-item px-4 py-2.5 text-sm"
                      style={{ color: 'var(--text)' }}
                    >
                      Visit Showroom
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* ── Desktop Auth ── */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
                    className="flex items-center gap-2 text-sm font-medium py-1"
                    style={{ color: 'var(--brown)' }}
                  >
                    <span>{user?.username?.split(' ')[0]}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'profile' ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {activeDropdown === 'profile' && (
                    <div
                      className="dropdown-fade absolute right-0 top-8 bg-white rounded-lg py-2 min-w-[160px]"
                      style={{
                        border: '1px solid #ede8e2',
                        boxShadow: '0 10px 30px rgba(61,35,20,0.08)',
                      }}
                    >
                      <Link
                        to="/profile"
                        onClick={() => setActiveDropdown(null)}
                        className="dropdown-item px-4 py-2.5 text-sm block"
                        style={{ color: 'var(--text)' }}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/saved"
                        onClick={() => setActiveDropdown(null)}
                        className="dropdown-item px-4 py-2.5 text-sm block"
                        style={{ color: 'var(--text)' }}
                      >
                        Saved Cars
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setActiveDropdown(null)}
                        className="dropdown-item px-4 py-2.5 text-sm block"
                        style={{ color: 'var(--text)' }}
                      >
                        My Orders
                      </Link>
                      {user?.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setActiveDropdown(null)}
                          className="dropdown-item px-4 py-2.5 text-sm block"
                          style={{ color: 'var(--text)' }}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <div className="border-t my-1" style={{ borderColor: '#f0ece8' }} />
                      <button
                        onClick={handleLogout}
                        className="dropdown-item px-4 py-2.5 text-sm w-full text-left"
                        style={{ color: '#dc2626' }}
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
                    className="text-sm font-medium py-1 transition hover:opacity-70"
                    style={{ color: 'var(--brown)' }}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 rounded-full text-sm font-medium text-white transition hover:opacity-90"
                    style={{ background: 'var(--brown)' }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-6 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
                style={{ background: 'var(--brown-dark)' }}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
                style={{ background: 'var(--brown-dark)' }}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                style={{ background: 'var(--brown-dark)' }}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu (Minimalist) ── */}
        {menuOpen && (
          <div
            className="mobile-slide lg:hidden border-t bg-white"
            style={{ borderColor: '#f0ece8' }}
          >
            <div className="px-6 py-6 space-y-4">
              {/* Mobile Nav Links */}
              <div className="space-y-1">
                {user?.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setActiveDropdown(null)}
                          className="dropdown-item px-4 py-2.5 text-sm block"
                          style={{ color: 'var(--text)' }}
                        >
                          Admin Panel
                        </Link>
                )}
                <Link
                  to="/cars"
                  className="block py-3 text-base font-medium border-b"
                  style={{ color: 'var(--text)', borderColor: '#f0ece8' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Cars
                </Link>
                <Link
                  to="/about"
                  className="block py-3 text-base font-medium border-b"
                  style={{ color: 'var(--text)', borderColor: '#f0ece8' }}
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/work"
                  className="block py-3 text-base font-medium border-b"
                  style={{ color: 'var(--text)', borderColor: '#f0ece8' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Work
                </Link>
                <Link
                  to="/contact"
                  className="block py-3 text-base font-medium border-b"
                  style={{ color: 'var(--text)', borderColor: '#f0ece8' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile Auth */}
              <div className="pt-4">
                {isAuthenticated ? (
                  <>
                    <div className="py-3 mb-2">
                      <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{user?.username}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block py-3 text-base font-medium border-b"
                      style={{ color: 'var(--text)', borderColor: '#f0ece8' }}
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/saved"
                      className="block py-3 text-base font-medium border-b"
                      style={{ color: 'var(--text)', borderColor: '#f0ece8' }}
                      onClick={() => setMenuOpen(false)}
                    >
                      Saved Cars
                    </Link>
                    <Link
                      to="/orders"
                      className="block py-3 text-base font-medium border-b"
                      style={{ color: 'var(--text)', borderColor: '#f0ece8' }}
                      onClick={() => setMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setMenuOpen(false)
                      }}
                      className="block py-3 text-base font-medium w-full text-left"
                      style={{ color: '#dc2626' }}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      className="text-center py-3 rounded-full border text-base font-medium transition hover:opacity-80"
                      style={{ borderColor: 'var(--brown)', color: 'var(--brown)' }}
                      onClick={() => setMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className="text-center py-3 rounded-full text-base font-medium text-white transition hover:opacity-90"
                      style={{ background: 'var(--brown)' }}
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
    </>
  )
}