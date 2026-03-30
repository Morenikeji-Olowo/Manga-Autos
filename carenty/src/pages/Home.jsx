import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

const featuredCars = [
  {
    id: 1,
    brand: 'BMW',
    model: 'M5 Competition',
    year: 2024,
    price: '$85,000',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
    tag: 'Hot Deal',
  },
  {
    id: 2,
    brand: 'Mercedes',
    model: 'G-Class AMG',
    year: 2023,
    price: '$142,000',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
    tag: 'Premium',
  },
  {
    id: 3,
    brand: 'Porsche',
    model: 'Cayenne Turbo',
    year: 2024,
    price: '$112,000',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
    tag: 'New Arrival',
  },
  {
    id: 4,
    brand: 'Audi',
    model: 'RS7 Sportback',
    year: 2023,
    price: '$96,000',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
    tag: 'Featured',
  },
]

const gridImages = [
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=400&h=400&fit=crop',
]
const carBrands = [
  { name: 'BMW', img: '/brands/bmw.png' },
  { name: 'Mercedes', img: '/brands/mercedes.png' },
  { name: 'Ford', img: '/brands/ford.png' },
  { name: 'Honda', img: '/brands/honda.jpg' },
  { name: 'Toyota', img: '/brands/toyota.png' },
  { name: 'Lexus', img: '/brands/lexus.png' },
]
// ── Main Page ─────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Navbar />

      {/* Global Font Styles */}
      <style>{`
        /* Modern fonts - Roboto as primary, Poppins as secondary */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Roboto:wght@300;400;500;700;900&family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Roboto', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        /* Only hero/splash section uses Playfair Display */
        .hero-splash * {
          font-family: 'Playfair Display', 'Georgia', serif !important;
        }
        
        /* Rest of the site uses Roboto/Poppins */
        .font-modern {
          font-family: 'Roboto', 'Poppins', sans-serif;
        }
        
        .font-heading {
          font-family: 'Poppins', 'Roboto', sans-serif;
          font-weight: 600;
        }
        
        .font-body {
          font-family: 'Roboto', sans-serif;
        }
        
        /* Override any existing font-display classes */
        .font-display {
          font-family: 'Playfair Display', serif !important;
        }
        
        /* Animation styles */
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-up {
          opacity: 0;
          animation: fadeSlideUp 0.6s ease forwards;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        
        .hero-word {
          opacity: 0;
          animation: fadeSlideUp 0.6s ease forwards;
        }
        
        .grid-photo {
          transition: transform 0.5s ease;
        }
        
        .grid-photo:hover {
          transform: scale(1.05);
        }
        
        .ticker-wrap {
          overflow: hidden;
          white-space: nowrap;
        }
        
        .ticker-inner {
          display: inline-block;
          animation: ticker 30s linear infinite;
        }
        
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .car-card {
          transition: all 0.3s ease;
        }
        
        .car-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* ── Hero / Splash ───────────────────────────────── */}
<section
  className="p-7 min-h-screen flex items-center relative overflow-hidden"
  style={{ background: '#2b1c12' }} // coffee brown
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
    <div className="grid lg:grid-cols-2 gap-12 items-center">

      {/* LEFT — YOUR ORIGINAL TEXT */}
      <div>
        {/* Badge */}
        <div
          className=" m-5 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ background: '#3a2618', color: '#e6c3a3' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#e6c3a3]"></span>
          Nigeria's Premier Car Marketplace
        </div>

        {/* HEADLINE (UNCHANGED TEXT, JUST STYLED BETTER) */}
        <div className="leading-[0.9] uppercase">
          <h1 className="text-5xl lg:text-7xl font-bold text-white">
            My brotha,
          </h1>
          <h1 className="text-5xl lg:text-7xl font-extrabold italic text-[#e6c3a3]">
            get yourself
          </h1>
          <h1 className="text-5xl lg:text-7xl font-bold text-white">
            a car that fits
          </h1>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-[#e6c3a3]">
            your style
          </h1>
          <h1 className="text-4xl lg:text-6xl italic text-[#bfa18a]">
            Today.
          </h1>
        </div>

        {/* SUBTEXT */}
        <p className="mt-6 text-sm max-w-md text-[#cbb3a3]">
          Handpicked luxury and premium vehicles. Verified listings. Real people. Real deals.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          <a
            href="/cars"
            className="px-6 py-3 rounded-full text-sm font-semibold transition hover:opacity-90"
            style={{ background: '#e6c3a3', color: '#2b1c12' }}
          >
            Browse Cars →
          </a>

          <a
            href="/contact"
            className="text-sm font-semibold flex items-center text-white"
          >
            Talk to Us
          </a>
        </div>

        {/* STATS */}
        <div className="flex gap-8 mt-12">
          {[
            { num: '500+', label: 'Cars Listed' },
            { num: '10K+', label: 'Happy Buyers' },
            { num: '16+', label: 'Years Selling' },
          ].map((stat) => (
            <div key={stat.num}>
              <p className="text-2xl font-bold text-white">{stat.num}</p>
              <p className="text-xs text-[#cbb3a3]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — GRID LIKE YOUR IMAGE */}
      <div className="pt-24 hidden lg:grid grid-cols-3 gap-4">

        {/* BIG LEFT IMAGE */}
        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden">
          <img src={gridImages[0]} className="w-full h-full object-cover" />
        </div>

        {/* RIGHT TOP */}
        <div className="rounded-2xl overflow-hidden">
          <img src={gridImages[1]} className="w-full h-full object-cover" />
        </div>

        {/* RIGHT MIDDLE */}
        <div className="rounded-2xl overflow-hidden">
          <img src={gridImages[2]} className="w-full h-full object-cover" />
        </div>

        {/* BOTTOM LEFT */}
        <div className="rounded-2xl overflow-hidden">
          <img src={gridImages[3]} className="w-full h-full object-cover" />
        </div>

        {/* BOTTOM RIGHT */}
        <div className="col-span-2 rounded-2xl overflow-hidden">
          <img src={gridImages[4]} className="w-full h-full object-cover" />
        </div>

      </div>
    </div>
  </div>

  {/* Glow */}
  <div
    className="absolute right-0 top-1/2 w-80 h-80 rounded-full blur-3xl opacity-20"
    style={{ background: '#e6c3a3' }}
  ></div>
</section>

      {/* ── Brand Ticker ─────────────────────────────────── */}
{/* ── Brand Ticker ─────────────────────────────────── */}
<section className="py-8 border-y" style={{ borderColor: 'var(--cream-dark)', background: 'var(--cream-dark)' }}>
  <div className="ticker-wrap">
    <div className="ticker-inner">
      {[...carBrands, ...carBrands].map((brand, idx) => (
        <div key={idx} className="inline-flex items-center gap-3 mx-8">
          <img 
            src={brand.img} 
            alt={brand.name}
            className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <span className="text-gray-300 ml-8">·</span>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ── Featured Cars ─────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 font-heading" style={{ color: 'var(--brown-light)' }}>
              Handpicked
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold" style={{ color: 'var(--brown-dark)' }}>
              Cars on Display
            </h2>
          </div>
          <Link to="/cars" className="hidden md:flex items-center gap-2 text-sm font-medium transition hover:opacity-70 font-body"
            style={{ color: 'var(--brown)' }}>
            View all <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredCars.map((car, idx) => (
            <Link
              key={car.id}
              to={`/cars/${car.id}`}
              className="car-card group block rounded-2xl overflow-hidden"
              style={{ background: 'white', animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={car.image} alt={car.model}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full font-heading"
                    style={{ background: 'var(--brown)', color: 'white' }}>
                    {car.tag}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1 font-heading" style={{ color: 'var(--brown-light)' }}>
                  {car.brand} · {car.year}
                </p>
                <h3 className="font-heading text-lg font-bold mb-2" style={{ color: 'var(--brown-dark)' }}>
                  {car.model}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold font-heading" style={{ color: 'var(--brown)' }}>{car.price}</span>
                  <span className="text-xs px-3 py-1.5 rounded-full font-medium transition group-hover:opacity-90 font-body"
                    style={{ background: 'var(--cream)', color: 'var(--brown)' }}>
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── About Section ─────────────────────────────────── */}
<section className="py-24 px-6 lg:px-10" style={{ background: 'var(--brown-dark)' }}>
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative h-96 lg:h-[500px]">
        <div className="rounded-2xl overflow-hidden absolute inset-0">
          <img
            src="/smota.png"
            alt="Owner"
            className="w-full h-full object-cover object-center"
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-2xl z-10">
          <p className="font-heading text-2xl font-bold" style={{ color: 'var(--brown)' }}>16+</p>
          <p className="text-xs text-gray-500 mt-0.5 font-body">Years in the game</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-4 font-heading" style={{ color: 'var(--brown-light)' }}>
          About Us
        </p>
        <h2 className="font-heading text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
          We know cars<br />
          <span className="italic font-display" style={{ color: 'var(--cream-dark)' }}>better than anyone.</span>
        </h2>
        <p className="text-base leading-relaxed mb-4 font-body" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Started from a simple belief — every person deserves a car that matches their energy, their life, and their budget. We've been making that happen for over 16 years across Nigeria.
        </p>
        <p className="text-base leading-relaxed mb-10 font-body" style={{ color: 'rgba(255,255,255,0.6)' }}>
          No gimmicks. No inflated prices. Just real cars, real deals, and real people who know what they're talking about.
        </p>
        <Link to="/about"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition hover:opacity-90 font-heading"
          style={{ background: 'var(--cream)', color: 'var(--brown-dark)' }}>
          Our Story →
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* ── Footer Nav ───────────────────────────────────── */}
      <footer style={{ background: 'var(--brown-dark)' }}>
        <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--brown-light)' }}>
                    <span className="text-white text-xs font-bold font-heading">D</span>
                  </div>
                  <span className="font-heading text-xl text-white">Dribe</span>
                </div>
                <p className="text-sm leading-relaxed font-body" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Nigeria's most trusted car marketplace.
                </p>
                <div className="flex gap-4 mt-6">
                  {['instagram', 'twitter', 'facebook'].map(s => (
                    <a key={s} href="#"
                      className="w-9 h-9 rounded-full flex items-center justify-center transition hover:opacity-80"
                      style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <i className={`fab fa-${s} text-white text-sm`}></i>
                    </a>
                  ))}
                </div>
              </div>

              {[
                {
                  title: 'Cars', links: [
                    { label: 'Browse All', to: '/cars' },
                    { label: 'New Arrivals', to: '/cars?filter=new' },
                    { label: 'Luxury', to: '/cars?filter=luxury' },
                    { label: 'SUVs', to: '/cars?body=SUV' },
                  ]
                },
                {
                  title: 'Company', links: [
                    { label: 'About', to: '/about' },
                    { label: 'Contact', to: '/contact' },
                    { label: 'FAQ', to: '/faq' },
                    { label: 'Blog', to: '/blog' },
                  ]
                },
                {
                  title: 'Account', links: [
                    { label: 'Sign Up', to: '/auth/signup' },
                    { label: 'Log In', to: '/login' },
                    { label: 'Profile', to: '/profile' },
                    { label: 'Saved Cars', to: '/saved' },
                  ]
                },
              ].map(col => (
                <div key={col.title}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-5 font-heading"
                    style={{ color: 'var(--brown-light)' }}>
                    {col.title}
                  </p>
                  <div className="space-y-3">
                    {col.links.map(link => (
                      <Link key={link.to} to={link.to}
                        className="block text-sm transition hover:opacity-80 font-body"
                        style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="text-xs font-body" style={{ color: 'rgba(255,255,255,0.3)' }}>
                © {new Date().getFullYear()} Sarkin Mota. All rights reserved.
              </p>
              <div className="flex gap-6">
                {['Privacy Policy', 'Terms of Service', 'Cookies'].map(item => (
                  <a key={item} href="#" className="text-xs transition hover:opacity-80 font-body"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}