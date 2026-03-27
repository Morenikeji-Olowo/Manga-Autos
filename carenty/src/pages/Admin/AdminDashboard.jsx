import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

// ─── Mock Data ───────────────────────────────────────────
const mockCars = [
  { _id: '1', brand: 'BMW', model: 'M5', year: 2023, price: 85000, mileage: 12000, transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'Sedan', status: 'available', isFeatured: true, location: 'Тухачевского 108а', images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'] },
  { _id: '2', brand: 'Mercedes', model: 'G-Class', year: 2022, price: 120000, mileage: 8000, transmission: 'Automatic', fuelType: 'Diesel', bodyType: 'SUV', status: 'available', isFeatured: false, location: 'Камчатского 108а', images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'] },
  { _id: '3', brand: 'Porsche', model: 'Cayenne', year: 2021, price: 95000, mileage: 25000, transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'SUV', status: 'sold', isFeatured: false, location: 'Элитарного 108а', images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop'] },
]

const mockUsers = [
  { _id: 'u1', username: 'Morenikeji Olowo', email: 'morenikejiolowo101@gmail.com', isAdmin: false, isBanned: false, createdAt: '2024-01-15', lastActive: '2026-03-27' },
  { _id: 'u2', username: 'Ivan Petrov', email: 'ivan@example.com', isAdmin: false, isBanned: false, createdAt: '2024-02-20', lastActive: '2026-03-25' },
  { _id: 'u3', username: 'Anna Sidorova', email: 'anna@example.com', isAdmin: false, isBanned: true, createdAt: '2024-03-10', lastActive: '2026-03-10' },
]

const emptyCarForm = {
  brand: '', model: '', year: '', price: '', originalPrice: '',
  mileage: '', transmission: 'Automatic', fuelType: 'Petrol',
  bodyType: 'Sedan', status: 'available', isFeatured: false,
  location: '', description: '', images: []
}

const brands = ['BMW', 'Mercedes', 'Audi', 'Porsche', 'Toyota', 'Ford', 'Honda', 'Lexus', 'Volkswagen', 'Hyundai']
const transmissions = ['Automatic', 'Manual']
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid']
const bodyTypes = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Wagon', 'Convertible', 'Pickup']
const statuses = ['available', 'sold', 'reserved']

// ─── Helpers ─────────────────────────────────────────────
const formatPrice = (p) => `$${Number(p).toLocaleString()}`

// ─── Car Form Modal ───────────────────────────────────────
function CarFormModal({ car, onClose, onSave }) {
  const [form, setForm] = useState(car || emptyCarForm)
  const [imageUrl, setImageUrl] = useState('')
  const isEdit = !!car

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const addImage = () => {
    if (!imageUrl.trim()) return
    setForm(prev => ({ ...prev, images: [...prev.images, imageUrl.trim()] }))
    setImageUrl('')
  }

  const removeImage = (idx) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))
  }

  const handleSave = () => {
    if (!form.brand || !form.model || !form.price) {
      toast.error('Please fill in brand, model and price')
      return
    }
    onSave({ ...form, _id: car?._id || Date.now().toString() })
    toast.success(isEdit ? 'Car updated!' : 'Car added!')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{isEdit ? 'Edit Car' : 'Add New Car'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Brand & Model */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
              <select name="brand" value={form.brand} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50">
                <option value="">Select brand</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
              <input type="text" name="model" value={form.model} onChange={handleChange}
                placeholder="e.g. M5 Competition"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          {/* Year & Mileage */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input type="number" name="year" value={form.year} onChange={handleChange}
                placeholder="2024"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mileage (km)</label>
              <input type="number" name="mileage" value={form.mileage} onChange={handleChange}
                placeholder="15000"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange}
                placeholder="85000"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
              <input type="number" name="originalPrice" value={form.originalPrice} onChange={handleChange}
                placeholder="95000 (optional)"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          {/* Transmission, Fuel, Body */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
              <select name="transmission" value={form.transmission} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50">
                {transmissions.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
              <select name="fuelType" value={form.fuelType} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50">
                {fuelTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body Type</label>
              <select name="bodyType" value={form.bodyType} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50">
                {bodyTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Status & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50">
                {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" name="location" value={form.location} onChange={handleChange}
                placeholder="e.g. Тухачевского 108а"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              rows={3} placeholder="Car description..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
          </div>

          {/* Featured */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange}
              className="w-4 h-4 text-red-500 rounded" />
            <span className="text-sm font-medium text-gray-700">Mark as Featured (shows "Акция!" badge)</span>
          </label>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            <div className="flex gap-2 mb-3">
              <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                placeholder="Paste image URL..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                onKeyDown={e => e.key === 'Enter' && addImage()} />
              <button onClick={addImage}
                className="px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-medium">
                Add
              </button>
            </div>
            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {form.images.map((img, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden h-24">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(idx)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <i className="fas fa-trash text-white"></i>
                    </button>
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">Main</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={handleSave}
            className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition">
            {isEdit ? 'Save Changes' : 'Add Car'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Delete Confirm Modal ─────────────────────────────────
function DeleteModal({ car, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-trash text-red-500 text-xl"></i>
        </div>
        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Car</h3>
        <p className="text-gray-500 text-center text-sm mb-6">
          Are you sure you want to delete <strong>{car.brand} {car.model}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Status Badge ─────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    available: 'bg-green-100 text-green-700',
    sold: 'bg-gray-100 text-gray-600',
    reserved: 'bg-yellow-100 text-yellow-700',
  }
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || styles.available}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// ─── Main Admin Dashboard ─────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('cars')
  const [cars, setCars] = useState(mockCars)
  const [users, setUsers] = useState(mockUsers)
  const [showCarModal, setShowCarModal] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [deletingCar, setDeletingCar] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredCars = cars.filter(c => {
    const matchSearch = `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !statusFilter || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const saveCar = (car) => {
    if (editingCar) {
      setCars(prev => prev.map(c => c._id === car._id ? car : c))
    } else {
      setCars(prev => [...prev, car])
    }
    setEditingCar(null)
  }

  const deleteCar = () => {
    setCars(prev => prev.filter(c => c._id !== deletingCar._id))
    toast.success('Car deleted')
    setDeletingCar(null)
  }

  const toggleBan = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u._id !== userId) return u
      const banned = !u.isBanned
      toast.success(banned ? 'User banned' : 'User unbanned')
      return { ...u, isBanned: banned }
    }))
  }

  // Stats
  const totalCars = cars.length
  const availableCars = cars.filter(c => c.status === 'available').length
  const soldCars = cars.filter(c => c.status === 'sold').length
  const totalUsers = users.length
  const bannedUsers = users.filter(u => u.isBanned).length

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your car listings and users</p>
          </div>
          {activeTab === 'cars' && (
            <button
              onClick={() => { setEditingCar(null); setShowCarModal(true) }}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-3 rounded-xl transition"
            >
              <i className="fas fa-plus"></i>
              Add New Car
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Cars', value: totalCars, icon: 'fa-car', color: 'red' },
            { label: 'Available', value: availableCars, icon: 'fa-check-circle', color: 'green' },
            { label: 'Sold', value: soldCars, icon: 'fa-handshake', color: 'blue' },
            { label: 'Total Users', value: totalUsers, icon: 'fa-users', color: 'purple' },
            { label: 'Banned', value: bannedUsers, icon: 'fa-ban', color: 'orange' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-${stat.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <i className={`fas ${stat.icon} text-${stat.color}-500`}></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {[
            { key: 'cars', label: 'Cars', icon: 'fa-car' },
            { key: 'users', label: 'Users', icon: 'fa-users' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSearch('') }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition ${
                activeTab === tab.key
                  ? 'bg-white text-red-500 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className={`fas ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={activeTab === 'cars' ? 'Search cars...' : 'Search users...'}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            />
          </div>
          {activeTab === 'cars' && (
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-sm"
            >
              <option value="">All Statuses</option>
              {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          )}
        </div>

        {/* ── Cars Tab ── */}
        {activeTab === 'cars' && (
          <div className="space-y-4">
            {filteredCars.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <i className="fas fa-car text-5xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">No cars found</p>
              </div>
            )}
            {filteredCars.map(car => (
              <div key={car._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-52 h-40 sm:h-auto relative flex-shrink-0">
                    {car.images?.[0] ? (
                      <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <i className="fas fa-car text-4xl text-gray-300"></i>
                      </div>
                    )}
                    {car.isFeatured && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        Акция!
                      </span>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                      {car.images?.length || 0} photos
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{car.brand} {car.model}, {car.year}</h3>
                          <StatusBadge status={car.status} />
                        </div>
                        <p className="text-2xl font-bold text-red-500 mb-3">{formatPrice(car.price)}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <i className="fas fa-tachometer-alt text-gray-400 w-4"></i>
                            {car.mileage?.toLocaleString()} km
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <i className="fas fa-cog text-gray-400 w-4"></i>
                            {car.transmission}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <i className="fas fa-gas-pump text-gray-400 w-4"></i>
                            {car.fuelType}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <i className="fas fa-map-marker-alt text-gray-400 w-4"></i>
                            {car.location || '—'}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2 sm:min-w-[120px]">
                        <button
                          onClick={() => { setEditingCar(car); setShowCarModal(true) }}
                          className="flex-1 sm:w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-medium py-2 px-3 rounded-xl hover:bg-gray-50 transition text-sm"
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button
                          onClick={() => setDeletingCar(car)}
                          className="flex-1 sm:w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 font-medium py-2 px-3 rounded-xl hover:bg-red-50 transition text-sm"
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Users Tab ── */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">User</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Email</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Joined</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Last Active</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Status</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredUsers.map(user => (
                    <tr key={user._id} className={`hover:bg-gray-50 transition ${user.isBanned ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-red-500 font-bold text-sm">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{user.username}</p>
                            {user.isAdmin && (
                              <span className="text-xs text-red-500 font-medium">Admin</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.createdAt}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          user.isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                        }`}>
                          {user.isBanned ? 'Banned' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!user.isAdmin && (
                          <button
                            onClick={() => toggleBan(user._id)}
                            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${
                              user.isBanned
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-red-500 hover:bg-red-50'
                            }`}
                          >
                            <i className={`fas ${user.isBanned ? 'fa-unlock' : 'fa-ban'} mr-1`}></i>
                            {user.isBanned ? 'Unban' : 'Ban'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <i className="fas fa-users text-5xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">No users found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCarModal && (
        <CarFormModal
          car={editingCar}
          onClose={() => { setShowCarModal(false); setEditingCar(null) }}
          onSave={saveCar}
        />
      )}
      {deletingCar && (
        <DeleteModal
          car={deletingCar}
          onClose={() => setDeletingCar(null)}
          onConfirm={deleteCar}
        />
      )}
    </div>
  )
}
