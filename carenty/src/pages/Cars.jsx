import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import carService from '../services/carsService'
import CarFilters from '../components/cars/CarFilters'
import CarCard from '../components/cars/CarCard'
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'

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

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(v => v && v !== '').length

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Cleaner */}
      <section className="relative pt-20 pb-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Ride
            </h1>
            <p className="text-gray-500 font-body">
              Browse through our curated collection of premium vehicles. 
              
            </p>
          </div>
          
          {/* Search Bar - Enhanced */}
          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by make, model, or keyword..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-body"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar - Modern */}
      <div className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center justify-between py-4">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Make Filter */}
              <select
                value={filters.make || 'All Makes'}
                onChange={(e) => handleFilterChange('make', e.target.value === 'All Makes' ? '' : e.target.value)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white font-body"
              >
                <option>All Makes</option>
                <option>BMW</option>
                <option>Mercedes-Benz</option>
                <option>Audi</option>
                <option>Porsche</option>
                <option>Lexus</option>
                <option>Toyota</option>
                <option>Range Rover</option>
                <option>Ferrari</option>
                <option>Lamborghini</option>
              </select>
              
              {/* Price Range */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-28 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 font-body"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-28 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 font-body"
                />
              </div>

              {/* Transmission */}
              <select
                value={filters.transmission || 'Transmission'}
                onChange={(e) => handleFilterChange('transmission', e.target.value === 'Transmission' ? '' : e.target.value)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white font-body"
              >
                <option>Transmission</option>
                <option>Automatic</option>
                <option>Manual</option>
                <option>CVT</option>
              </select>

              {/* Fuel Type */}
              <select
                value={filters.fuelType || 'Fuel Type'}
                onChange={(e) => handleFilterChange('fuelType', e.target.value === 'Fuel Type' ? '' : e.target.value)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white font-body"
              >
                <option>Fuel Type</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>

              {/* Condition */}
              <select
                value={filters.used || 'Condition'}
                onChange={(e) => handleFilterChange('used', e.target.value === 'Condition' ? '' : e.target.value)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white font-body"
              >
                <option>Condition</option>
                <option value="false">Brand New</option>
                <option value="true">Local Used</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white font-body"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="mostViewed">Most Viewed</option>
              </select>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 font-body"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden py-3">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl bg-white"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-body">Filters & Sort</span>
                {activeFilterCount > 0 && (
                  <span className="px-1.5 py-0.5 text-xs bg-gray-900 text-white rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500 font-body">Sort: {sortBy === 'newest' ? 'Newest' : sortBy === 'price_asc' ? 'Price: Low' : 'Price: High'}</span>
            </button>
          </div>

          {/* Mobile Filters Panel */}
          {isFilterOpen && (
            <div className="lg:hidden py-4 space-y-3 border-t border-gray-100">
              <select
                value={filters.make || 'All Makes'}
                onChange={(e) => handleFilterChange('make', e.target.value === 'All Makes' ? '' : e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl font-body"
              >
                <option>All Makes</option>
                <option>BMW</option>
                <option>Mercedes-Benz</option>
                <option>Audi</option>
                <option>Porsche</option>
              </select>
              
              <div className="flex gap-2">
                <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => handleFilterChange('minPrice', e.target.value)} className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl font-body" />
                <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => handleFilterChange('maxPrice', e.target.value)} className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl font-body" />
              </div>

              <select value={filters.transmission || 'Transmission'} onChange={(e) => handleFilterChange('transmission', e.target.value === 'Transmission' ? '' : e.target.value)} className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl font-body">
                <option>Transmission</option>
                <option>Automatic</option>
                <option>Manual</option>
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl font-body">
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>

              <button onClick={clearFilters} className="w-full py-2 text-sm text-gray-600 border border-gray-200 rounded-xl font-body">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500 font-body">Finding your perfect ride...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 font-body">Failed to load cars. Please try again.</p>
              <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-xl font-body">
                Retry
              </button>
            </div>
          ) : data?.listings?.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
              <p className="text-gray-500 font-body">Try adjusting your filters to see more results.</p>
              <button
                onClick={clearFilters}
                className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-body hover:bg-gray-800 transition"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <p className="text-gray-500 font-body">
                  Showing <span className="font-semibold text-gray-900">{data?.listings?.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{data?.pagination?.total}</span> vehicles
                </p>
                {activeFilterCount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Active filters:</span>
                    <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-gray-700 underline">
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              {/* Cars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.listings?.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>

              {/* Pagination */}
              {data?.pagination && data.pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    disabled={data.pagination.page === 1}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams)
                      params.set('page', String(data.pagination.page - 1))
                      setSearchParams(params)
                    }}
                    className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition font-body"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, data.pagination.pages) }, (_, i) => {
                      let pageNum
                      if (data.pagination.pages <= 5) {
                        pageNum = i + 1
                      } else if (data.pagination.page <= 3) {
                        pageNum = i + 1
                      } else if (data.pagination.page >= data.pagination.pages - 2) {
                        pageNum = data.pagination.pages - 4 + i
                      } else {
                        pageNum = data.pagination.page - 2 + i
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => {
                            const params = new URLSearchParams(searchParams)
                            params.set('page', String(pageNum))
                            setSearchParams(params)
                          }}
                          className={`w-10 h-10 rounded-xl font-body transition ${
                            data.pagination.page === pageNum
                              ? 'bg-gray-900 text-white'
                              : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    disabled={data.pagination.page === data.pagination.pages}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams)
                      params.set('page', String(data.pagination.page + 1))
                      setSearchParams(params)
                    }}
                    className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition font-body"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
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