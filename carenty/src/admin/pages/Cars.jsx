import { useState } from 'react'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Button from '../components/Button'
import Input from '../components/Input'
import StatusBadge from '../components/StatusBadge'

export default function AdminCars() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCar, setEditingCar] = useState(null)

  const cars = [
    { id: 1, image: 'https://via.placeholder.com/80x60', name: 'BMW M5', price: 85000, status: 'active', year: 2024, mileage: 0 },
    { id: 2, image: 'https://via.placeholder.com/80x60', name: 'Mercedes G-Class', price: 142000, status: 'active', year: 2023, mileage: 5000 },
    { id: 3, image: 'https://via.placeholder.com/80x60', name: 'Porsche Cayenne', price: 112000, status: 'sold', year: 2024, mileage: 0 },
  ]

  const columns = [
    { key: 'image', label: 'Image', render: (val) => <img src={val} alt="" className="w-16 h-12 object-cover rounded" /> },
    { key: 'name', label: 'Car Name' },
    { key: 'price', label: 'Price', render: (val) => `$${val.toLocaleString()}` },
    { key: 'year', label: 'Year' },
    { key: 'mileage', label: 'Mileage', render: (val) => `${val.toLocaleString()} km` },
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
    setIsModalOpen(true)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this car?')) {
      // Handle delete
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
          setEditingCar(null)
        }}
        title={editingCar ? 'Edit Car' : 'Add New Car'}
      >
        <form className="space-y-4">
          <Input label="Car Name" placeholder="e.g., BMW M5" defaultValue={editingCar?.name} />
          <Input label="Price" type="number" placeholder="Enter price" defaultValue={editingCar?.price} />
          <Input label="Year" type="number" placeholder="2024" defaultValue={editingCar?.year} />
          <Input label="Mileage" type="number" placeholder="Enter mileage" defaultValue={editingCar?.mileage} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Car Images</label>
            <input type="file" multiple accept="image/*" className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specifications</label>
            <textarea rows={3} className="w-full border rounded-lg p-3" placeholder="Enter car specifications..." />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" fullWidth>
              {editingCar ? 'Update Car' : 'Add Car'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} fullWidth>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}