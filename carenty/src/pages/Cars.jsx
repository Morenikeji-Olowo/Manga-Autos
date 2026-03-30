import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import CarCard from '../components/cars/CarCard'
import carService from '../services/carsService'
import CarFilters from '../components/cars/CarFilters'

export default function Cars() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minYear: searchParams.get('minYear') || '',
    maxYear: searchParams.get('maxYear') || '',
    transmission: searchParams.get('transmission') || '',
    fuelType: searchParams.get('fuelType') || '',
    condition: searchParams.get('condition') || '',
    used: searchParams.get('used') || '',
    search: searchParams.get('search') || '',
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch cars whenever filters or sort changes
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await carService.getCars(filters, sortBy)
        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [filters, sortBy])

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'All' && value !== 'All Brands') {
        params.append(key, value)
      }
    })
    params.append('sort', sortBy)
    setSearchParams(params)
  }, [filters, sortBy, setSearchParams])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      make: '', minPrice: '', maxPrice: '', minYear: '', maxYear: '',
      transmission: '', fuelType: '', condition: '', used: '', search: '',
    })
    setSortBy('newest')
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 bg-gradient-to-b from-[#F5EDE3] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold text-center mb-4" style={{ color: '#4B2E2B' }}>
            Find Your Perfect Ride
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto font-body">
            Browse through our curated collection of luxury and premium vehicles.
            Each car is handpicked and verified for quality.
          </p>
        </div>
      </section>

      {/* Filters */}
      <CarFilters
        filters={filters}
        sortBy={sortBy}
        isFilterOpen={isFilterOpen}
        handleFilterChange={handleFilterChange}
        setSortBy={setSortBy}
        clearFilters={clearFilters}
        setIsFilterOpen={setIsFilterOpen}
      />

      {/* Cars Grid */}
      <section className="py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <i className="fas fa-spinner fa-spin text-4xl" style={{ color: '#6B4226' }}></i>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <i className="fas fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
              <p className="text-gray-600">Failed to load cars. Please try again.</p>
            </div>
          ) : data?.listings?.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-car-side text-5xl mb-4" style={{ color: '#D6C4B2' }}></i>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#4B2E2B' }}>No cars found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 rounded-full text-white font-body text-sm transition"
                style={{ background: '#6B4226' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#8B5E3C'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#6B4226'}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600 font-body">
                  Showing <span className="font-semibold">{data?.listings?.length || 0}</span> cars
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.listings?.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>

              {/* Pagination */}
              {data?.pagination && data.pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  <button
                    disabled={data.pagination.page === 1}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams)
                      params.set('page', String(data.pagination.page - 1))
                      setSearchParams(params)
                    }}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 font-body">
                    Page {data.pagination.page} of {data.pagination.pages}
                  </span>
                  <button
                    disabled={data.pagination.page === data.pagination.pages}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams)
                      params.set('page', String(data.pagination.page + 1))
                      setSearchParams(params)
                    }}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
