const carBrands = [
  'All Brands', 'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Lexus',
  'Toyota', 'Ferrari', 'Lamborghini', 'Bentley', 'Range Rover',
  'Maserati', 'Jaguar', 'Ford', 'Honda'
]
const transmissions = ['All', 'automatic', 'manual', 'CVT']
const fuelTypes = ['All', 'petrol', 'diesel', 'electric', 'hybrid']

export default function CarFilters({ filters, sortBy, isFilterOpen, handleFilterChange, setSortBy, clearFilters, setIsFilterOpen }) {
  return (
    <div className="sticky top-20 z-30 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
        <div className="hidden lg:flex items-center gap-4 flex-wrap">
          {/* Brand Filter */}
          <select
            value={filters.make || 'All Brands'}
            onChange={(e) => handleFilterChange('make', e.target.value === 'All Brands' ? '' : e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
            style={{ borderColor: '#E8D9CC' }}
          >
            {carBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="w-28 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
              style={{ borderColor: '#E8D9CC' }}
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-28 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
              style={{ borderColor: '#E8D9CC' }}
            />
          </div>

          {/* Year Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min Year"
              value={filters.minYear}
              onChange={(e) => handleFilterChange('minYear', e.target.value)}
              className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
              style={{ borderColor: '#E8D9CC' }}
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max Year"
              value={filters.maxYear}
              onChange={(e) => handleFilterChange('maxYear', e.target.value)}
              className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
              style={{ borderColor: '#E8D9CC' }}
            />
          </div>

          {/* Transmission */}
          <select
            value={filters.transmission || 'All'}
            onChange={(e) => handleFilterChange('transmission', e.target.value === 'All' ? '' : e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
            style={{ borderColor: '#E8D9CC' }}
          >
            {transmissions.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>

          {/* Fuel Type */}
          <select
            value={filters.fuelType || 'All'}
            onChange={(e) => handleFilterChange('fuelType', e.target.value === 'All' ? '' : e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
            style={{ borderColor: '#E8D9CC' }}
          >
            {fuelTypes.map(f => (
              <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm ml-auto"
            style={{ borderColor: '#E8D9CC' }}
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="mostViewed">Most Viewed</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="text-sm hover:opacity-80 font-body"
            style={{ color: '#6B4226' }}
          >
            Clear All
          </button>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden w-full flex items-center justify-between px-4 py-3 border rounded-lg"
          style={{ borderColor: '#E8D9CC' }}
        >
          <span className="font-body text-sm">Filters & Sort</span>
          <i className={`fas fa-chevron-${isFilterOpen ? 'up' : 'down'} text-gray-500`}></i>
        </button>

        {/* Mobile Filters Panel */}
        {isFilterOpen && (
          <div className="lg:hidden mt-4 space-y-3">
            <select
              value={filters.make || 'All Brands'}
              onChange={(e) => handleFilterChange('make', e.target.value === 'All Brands' ? '' : e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
              style={{ borderColor: '#E8D9CC' }}
            >
              {carBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
                style={{ borderColor: '#E8D9CC' }}
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
                style={{ borderColor: '#E8D9CC' }}
              />
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Year"
                value={filters.minYear}
                onChange={(e) => handleFilterChange('minYear', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
                style={{ borderColor: '#E8D9CC' }}
              />
              <input
                type="number"
                placeholder="Max Year"
                value={filters.maxYear}
                onChange={(e) => handleFilterChange('maxYear', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
                style={{ borderColor: '#E8D9CC' }}
              />
            </div>

            <select
              value={filters.transmission || 'All'}
              onChange={(e) => handleFilterChange('transmission', e.target.value === 'All' ? '' : e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
              style={{ borderColor: '#E8D9CC' }}
            >
              {transmissions.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>

            <select
              value={filters.fuelType || 'All'}
              onChange={(e) => handleFilterChange('fuelType', e.target.value === 'All' ? '' : e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
              style={{ borderColor: '#E8D9CC' }}
            >
              {fuelTypes.map(f => (
                <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4226] font-body text-sm"
              style={{ borderColor: '#E8D9CC' }}
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="mostViewed">Most Viewed</option>
            </select>

            <button
              onClick={clearFilters}
              className="w-full py-2 rounded-lg font-body text-sm transition"
              style={{ background: '#F5EDE3', color: '#6B4226' }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
