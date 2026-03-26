import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { carsService } from '../services/carsService'
import toast from 'react-hot-toast'

export default function Cars() {
 const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 })

  useEffect(() => {
    loadCars()
  }, [filters])

  const loadCars = async () => {
    setLoading(true)
    try {
      const response = await carsService.getCars({
        ...filters,
        page: pagination.page,
        limit: 12
      })
      
      setCars(response.data)
      setPagination({
        page: response.page,
        total: response.total,
        totalPages: response.totalPages
      })
    } catch (error) {
      toast.error('Failed to load cars')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = (newFilters) => {
    setFilters(newFilters)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Автомобили в наличии</h1>
          <p className="text-gray-500 mt-2">Более {cars.length} автомобилей в вашем городе</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <i className="fas fa-chart-line text-red-500"></i>
              </div>
              <div>
                <p className="text-xs text-gray-500">На рынке продажа авто</p>
                <p className="text-lg font-bold text-gray-900">16+ лет</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fas fa-percent text-green-500"></i>
              </div>
              <div>
                <p className="text-xs text-gray-500">Выгодный кредит от</p>
                <p className="text-lg font-bold text-gray-900">5.05%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="fas fa-shield-alt text-blue-500"></i>
              </div>
              <div>
                <p className="text-xs text-gray-500">Техническая гарантия</p>
                <p className="text-lg font-bold text-gray-900">12 месяцев</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brands Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Бренды автомобилей</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {brands.slice(0, 7).map((brand, idx) => (
              <button
                key={idx}
                onClick={() => setFilters(prev => ({ ...prev, brand: brand === 'All Brands' ? '' : brand }))}
                className="text-center p-3 rounded-xl border border-gray-100 hover:border-red-500 hover:bg-red-50 transition group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-100 mb-2">
                  <i className="fas fa-car text-gray-500 group-hover:text-red-500"></i>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-red-500">{brand}</span>
                <span className="text-xs text-gray-400 block">(13)</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button className="text-red-500 font-medium text-sm hover:text-red-600 flex items-center gap-1">
              Перейти в каталог <i className="fas fa-arrow-right text-xs"></i>
            </button>
            <button className="text-gray-500 font-medium text-sm hover:text-gray-600 flex items-center gap-1">
              Показать больше брендов <i className="fas fa-chevron-down text-xs"></i>
            </button>
          </div>
        </div>

        {/* Main Content: Filters + Cars Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Filter Sidebar - Desktop */}
          <div className={`lg:w-80 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Подобрать автомобиль</h2>
                <button onClick={resetFilters} className="text-xs text-gray-400 hover:text-red-500">
                  Сбросить
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Бренд</label>
                  <select
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50"
                  >
                    <option value="">Все бренды</option>
                    {brands.slice(1).map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Цена (от - до)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="priceMin"
                      value={filters.priceMin}
                      onChange={handleFilterChange}
                      placeholder="от"
                      className="w-1/2 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="number"
                      name="priceMax"
                      value={filters.priceMax}
                      onChange={handleFilterChange}
                      placeholder="до"
                      className="w-1/2 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Коробка передач</label>
                  <select
                    name="transmission"
                    value={filters.transmission}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  >
                    {transmissions.map(t => (
                      <option key={t} value={t === 'All' ? '' : t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Body Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Тип кузова</label>
                  <select
                    name="bodyType"
                    value={filters.bodyType}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  >
                    {bodyTypes.map(t => (
                      <option key={t} value={t === 'All' ? '' : t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Year Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Год выпуска</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="yearMin"
                      value={filters.yearMin}
                      onChange={handleFilterChange}
                      placeholder="от"
                      className="w-1/2 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="number"
                      name="yearMax"
                      value={filters.yearMax}
                      onChange={handleFilterChange}
                      placeholder="до"
                      className="w-1/2 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Топливо</label>
                  <select
                    name="fuelType"
                    value={filters.fuelType}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  >
                    {fuelTypes.map(t => (
                      <option key={t} value={t === 'All' ? '' : t}>{t}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={applyFilters}
                  disabled={isLoading}
                  className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition mt-4"
                >
                  {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Подобрать авто'}
                </button>
              </div>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="flex-1">
            {/* Sort and Mobile Filter Button */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white"
              >
                <i className="fas fa-filter"></i>
                <span>Фильтры</span>
              </button>
              
              <div className="relative ml-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="price_asc">Сначала дешевле</option>
                  <option value="price_desc">Сначала дороже</option>
                  <option value="year_desc">Год новое</option>
                  <option value="year_asc">Год старше</option>
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500 mb-4">Найдено {cars.length} автомобилей</p>

            {/* Car Cards Grid */}
            <div className="space-y-6">
              {cars.map((car) => (
                <Link
                  key={car.id}
                  to={`/cars/${car.id}`}
                  onClick={() => handleCarClick(car.id)}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-80 h-48 md:h-auto relative">
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                      {car.isFeatured && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          Акция!
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        {/* Left Info */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {car.brand} {car.model}, {car.year}
                          </h3>
                          
                          {/* Price */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl font-bold text-red-500">
                              {formatPrice(car.price)}
                            </span>
                            {car.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(car.originalPrice)}
                              </span>
                            )}
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              Скидка 10%
                            </span>
                          </div>

                          {/* Specs Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <i className="fas fa-tachometer-alt text-gray-400 w-4"></i>
                              <span>{car.mileage.toLocaleString()} км</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <i className="fas fa-cog text-gray-400 w-4"></i>
                              <span>{car.transmission === 'Automatic' ? 'Автомат' : 'Механика'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <i className="fas fa-car text-gray-400 w-4"></i>
                              <span>{car.bodyType}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <i className="fas fa-gas-pump text-gray-400 w-4"></i>
                              <span>{car.fuelType === 'Petrol' ? 'Бензин' : car.fuelType}</span>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{car.location}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex md:flex-col gap-2 md:min-w-[140px]">
                          <button className="flex-1 md:w-full bg-red-500 text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-red-600 transition text-sm">
                            Заказать
                          </button>
                          <button className="flex-1 md:w-full border border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl hover:bg-gray-50 transition text-sm">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="border border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-xl hover:bg-gray-50 transition">
                Загрузить еще
              </button>
            </div>
          </div>
        </div>

        {/* Credit Info Section */}
        <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <i className="fas fa-percent text-red-500 text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Мы имеем высокий процент одобрения заявок на кредит</h3>
                <p className="text-2xl font-bold text-red-500">&gt;97%</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <i className="fas fa-building text-gray-400 text-xl mb-1"></i>
                <p className="text-xs text-gray-600">20+ банков</p>
              </div>
              <div className="text-center">
                <i className="fas fa-handshake text-gray-400 text-xl mb-1"></i>
                <p className="text-xs text-gray-600">Без комиссии</p>
              </div>
              <div className="text-center">
                <i className="fas fa-file-invoice text-gray-400 text-xl mb-1"></i>
                <p className="text-xs text-gray-600">2 документа</p>
              </div>
              <div className="text-center">
                <i className="fas fa-shield-alt text-gray-400 text-xl mb-1"></i>
                <p className="text-xs text-gray-600">Без КАСКО</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: 'fa-handshake', title: 'Честность и прозрачность', color: 'red' },
            { icon: 'fa-headset', title: 'Поддержка при оформлении', color: 'blue' },
            { icon: 'fa-shield-alt', title: 'Гарантия и сервис', color: 'green' },
            { icon: 'fa-tag', title: 'Конкурентные цены', color: 'purple' },
            { icon: 'fa-star', title: 'Репутация и опыт', color: 'yellow' },
            { icon: 'fa-comment', title: 'Отзывы покупателей', color: 'orange' },
          ].map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className={`w-12 h-12 mx-auto rounded-full bg-${benefit.color}-100 flex items-center justify-center mb-3`}>
                <i className={`fas ${benefit.icon} text-${benefit.color}-500`}></i>
              </div>
              <p className="text-sm font-medium text-gray-700">{benefit.title}</p>
            </div>
          ))}
        </div>

        {/* Locations Section */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Где стоит автомобиль?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Тухачевского 108а', 'Камчатского 108а', 'Элитарного 108а'].map((location, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-red-500 transition cursor-pointer">
                <i className="fas fa-map-marker-alt text-red-500"></i>
                <span className="text-gray-700">{location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}