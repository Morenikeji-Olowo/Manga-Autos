import { useState, useRef } from 'react'
import { 
  Plus, Edit, Trash2, Eye, X, Upload, 
  ChevronDown, ChevronUp, Image as ImageIcon,
  Car, Settings, Camera, Shield, Heart, Award,
  Fuel, Gauge, Cog, Calendar, MapPin, DollarSign,
  Check, AlertCircle
} from 'lucide-react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Button from '../components/Button'
import Input from '../components/Input'
import StatusBadge from '../components/StatusBadge'

export default function AdminCars() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [activeSection, setActiveSection] = useState('basics')
  const [formData, setFormData] = useState({
    // Section 1 - Listing Basics
    name: '',
    make: '',
    model: '',
    price: '',
    negotiable: false,
    status: 'active',
    used: true,
    currentLocation: '',
    description: '',
    
    // Section 2 - Basic Details
    year: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    engineSize: '',
    drivetrain: '',
    condition: '',
    exteriorColor: '',
    interiorColor: '',
    grade: '',
    speed: '',
    vin: '',
    plateNumber: '',
    
    // Section 3 - Images
    images: [],
    
    // Section 4 - Features
    comfort: [],
    multimedia: [],
    safety: [],
    security: [],
    
    // Section 5 - Vehicle History
    accidentsOrDamages: false,
    oneOwnerVehicle: false,
    personalUseOnly: true,
    serviceHistoryAvailable: false,
    importedVehicle: false,
    
    // Section 6 - Benefits
    benefits: [],
  })
  
  const [imagePreviewUrls, setImagePreviewUrls] = useState([])
  const fileInputRef = useRef(null)
  
  const [cars, setCars] = useState([]) // Remove dummy data
  const [tagInputs, setTagInputs] = useState({
    comfort: '',
    multimedia: '',
    safety: '',
    security: '',
    benefits: ''
  })

  const sections = [
    { id: 'basics', label: 'Listing Basics', icon: Car },
    { id: 'details', label: 'Basic Details', icon: Settings },
    { id: 'images', label: 'Images', icon: Camera },
    { id: 'features', label: 'Features', icon: Cog },
    { id: 'history', label: 'Vehicle History', icon: Shield },
    { id: 'benefits', label: 'Benefits', icon: Heart },
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTagAdd = (section, value) => {
    if (value && value.trim()) {
      setFormData(prev => ({
        ...prev,
        [section]: [...prev[section], value.trim()]
      }))
      setTagInputs(prev => ({ ...prev, [section]: '' }))
    }
  }

  const handleTagRemove = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = [...formData.images, ...files]
    setFormData(prev => ({ ...prev, images: newImages }))
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setImagePreviewUrls(prev => [...prev, ...newPreviewUrls])
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    // Here you would make API call to save the car
    alert(editingCar ? 'Car updated successfully!' : 'Car added successfully!')
    setIsModalOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '', make: '', model: '', price: '', negotiable: false,
      status: 'active', used: true, currentLocation: '', description: '',
      year: '', mileage: '', fuelType: '', transmission: '', engineSize: '',
      drivetrain: '', condition: '', exteriorColor: '', interiorColor: '',
      grade: '', speed: '', vin: '', plateNumber: '', images: [],
      comfort: [], multimedia: [], safety: [], security: [],
      accidentsOrDamages: false, oneOwnerVehicle: false, personalUseOnly: true,
      serviceHistoryAvailable: false, importedVehicle: false, benefits: []
    })
    setImagePreviewUrls([])
    setEditingCar(null)
    setActiveSection('basics')
  }

  const columns = [
    { key: 'image', label: 'Image', render: (val) => (
      <img src={val || 'https://via.placeholder.com/80x60'} alt="" className="w-16 h-12 object-cover rounded" />
    ) },
    { key: 'name', label: 'Car Name', render: (val, row) => `${row.make} ${row.model}` },
    { key: 'price', label: 'Price', render: (val) => `$${val?.toLocaleString()}` },
    { key: 'year', label: 'Year' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'actions', label: 'Actions', render: (_, row) => (
      <div className="flex gap-2">
        <button onClick={() => handleEdit(row)} className="p-1 hover:bg-gray-100 rounded"><Edit size={16} /></button>
        <button onClick={() => handleDelete(row.id)} className="p-1 hover:bg-red-50 text-red-600 rounded"><Trash2 size={16} /></button>
      </div>
    ) }
  ]

  const handleEdit = (car) => {
    setEditingCar(car)
    setFormData(car)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter(car => car.id !== id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Cars</h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove car listings</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={<Plus size={18} />}>
          Add New Car
        </Button>
      </div>

      <DataTable columns={columns} data={cars} />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          resetForm()
        }}
        title={editingCar ? 'Edit Car' : 'Add New Car'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
          {/* Section Navigation */}
          <div className="sticky top-0 bg-white z-10 border-b mb-6">
            <div className="flex gap-1 overflow-x-auto pb-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                    ${activeSection === section.id 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <section.icon size={16} />
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Section 1: Listing Basics */}
            {activeSection === 'basics' && (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-900">Listing Basics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Car Name *"
                    placeholder="e.g., BMW M5 Competition"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  <Input
                    label="Make *"
                    placeholder="e.g., BMW"
                    value={formData.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                    required
                  />
                  <Input
                    label="Model *"
                    placeholder="e.g., M5"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    required
                  />
                  <Input
                    label="Price *"
                    type="number"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                  <Input
                    label="Current Location *"
                    placeholder="e.g., Lagos, Nigeria"
                    value={formData.currentLocation}
                    onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                    required
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Condition</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="new"
                          checked={!formData.used}
                          onChange={() => handleInputChange('used', false)}
                          className="text-purple-600"
                        />
                        <span className="text-sm">New</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="used"
                          checked={formData.used}
                          onChange={() => handleInputChange('used', true)}
                          className="text-purple-600"
                        />
                        <span className="text-sm">Used</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.negotiable}
                      onChange={(e) => handleInputChange('negotiable', e.target.checked)}
                      className="text-purple-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Price is negotiable</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe the car's condition, features, and any special notes..."
                  />
                </div>
              </div>
            )}

            {/* Section 2: Basic Details */}
            {activeSection === 'details' && (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-900">Basic Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Input
                    label="Year"
                    type="number"
                    placeholder="2024"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                  />
                  <Input
                    label="Mileage (km)"
                    type="number"
                    placeholder="Enter mileage"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange('mileage', e.target.value)}
                  />
                  <Input
                    label="Fuel Type"
                    placeholder="Petrol / Diesel / Electric / Hybrid"
                    value={formData.fuelType}
                    onChange={(e) => handleInputChange('fuelType', e.target.value)}
                  />
                  <Input
                    label="Transmission"
                    placeholder="Automatic / Manual / CVT"
                    value={formData.transmission}
                    onChange={(e) => handleInputChange('transmission', e.target.value)}
                  />
                  <Input
                    label="Engine Size"
                    placeholder="e.g., 2.0L, 3.5L V6"
                    value={formData.engineSize}
                    onChange={(e) => handleInputChange('engineSize', e.target.value)}
                  />
                  <Input
                    label="Drivetrain"
                    placeholder="FWD / RWD / AWD / 4WD"
                    value={formData.drivetrain}
                    onChange={(e) => handleInputChange('drivetrain', e.target.value)}
                  />
                  <Input
                    label="Condition"
                    placeholder="Excellent / Good / Fair"
                    value={formData.condition}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                  />
                  <Input
                    label="Exterior Color"
                    placeholder="e.g., Black, White, Silver"
                    value={formData.exteriorColor}
                    onChange={(e) => handleInputChange('exteriorColor', e.target.value)}
                  />
                  <Input
                    label="Interior Color"
                    placeholder="e.g., Black Leather, Beige"
                    value={formData.interiorColor}
                    onChange={(e) => handleInputChange('interiorColor', e.target.value)}
                  />
                  <Input
                    label="Grade"
                    placeholder="e.g., Premium, Base, Sport"
                    value={formData.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                  />
                  <Input
                    label="Top Speed (km/h)"
                    type="number"
                    placeholder="Enter top speed"
                    value={formData.speed}
                    onChange={(e) => handleInputChange('speed', e.target.value)}
                  />
                  <Input
                    label="VIN"
                    placeholder="Vehicle Identification Number"
                    value={formData.vin}
                    onChange={(e) => handleInputChange('vin', e.target.value)}
                  />
                  <Input
                    label="Plate Number"
                    placeholder="License plate number"
                    value={formData.plateNumber}
                    onChange={(e) => handleInputChange('plateNumber', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Section 3: Images */}
            {activeSection === 'images' && (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-900">Car Images</h3>
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 10MB each</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {imagePreviewUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Section 4: Features */}
            {activeSection === 'features' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                
                {['comfort', 'multimedia', 'safety', 'security'].map(category => (
                  <div key={category} className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {category}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInputs[category]}
                        onChange={(e) => setTagInputs(prev => ({ ...prev, [category]: e.target.value }))}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleTagAdd(category, tagInputs[category])
                          }
                        }}
                        placeholder={`Add ${category} feature...`}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleTagAdd(category, tagInputs[category])}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData[category].map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagRemove(category, idx)}
                            className="hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Section 5: Vehicle History */}
            {activeSection === 'history' && (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-900">Vehicle History</h3>
                
                <div className="space-y-3">
                  {[
                    { key: 'accidentsOrDamages', label: 'Has accidents or damages' },
                    { key: 'oneOwnerVehicle', label: 'One owner vehicle' },
                    { key: 'personalUseOnly', label: 'Personal use only' },
                    { key: 'serviceHistoryAvailable', label: 'Service history available' },
                    { key: 'importedVehicle', label: 'Imported vehicle' },
                  ].map(item => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        checked={formData[item.key]}
                        onChange={(e) => handleInputChange(item.key, e.target.checked)}
                        className="text-purple-600 rounded"
                      />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Section 6: Benefits */}
            {activeSection === 'benefits' && (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-900">Benefits</h3>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInputs.benefits}
                    onChange={(e) => setTagInputs(prev => ({ ...prev, benefits: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleTagAdd('benefits', tagInputs.benefits)
                      }
                    }}
                    placeholder="Add benefit (e.g., Free maintenance, Warranty included)"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Button
                    type="button"
                    onClick={() => handleTagAdd('benefits', tagInputs.benefits)}
                  >
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      <Award size={14} />
                      {benefit}
                      <button
                        type="button"
                        onClick={() => handleTagRemove('benefits', idx)}
                        className="hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="sticky bottom-0 bg-white border-t mt-8 pt-4 flex gap-3">
            <Button type="submit" variant="primary" fullWidth>
              {editingCar ? 'Update Car' : 'Add Car'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => {
              setIsModalOpen(false)
              resetForm()
            }} fullWidth>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}