import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Save, ArrowRight } from 'lucide-react'
import AddCar from './AddCar' // Reuse the same step components

export default function EditCar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [carData, setCarData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch car data by ID
    const fetchCar = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        // In real app, fetch from API
        setCarData({
          id: id,
          name: 'BMW M5 Competition',
          make: 'BMW',
          model: 'M5',
          price: 85000,
          // ... other fields
        })
      } catch (error) {
        console.error('Error fetching car:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCar()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading car details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/cars" className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Edit Car</h1>
              <p className="text-sm text-gray-500">Update vehicle information</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reuse AddCar component with initial data */}
      <AddCar initialData={carData} isEditing={true} />
    </div>
  )
}