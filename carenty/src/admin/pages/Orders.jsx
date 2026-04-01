import { useState } from 'react'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import Button from '../components/Button'

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    { id: '#ORD-001', customer: 'John Doe', car: 'BMW M5', amount: 85000, status: 'paid', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Jane Smith', car: 'Mercedes G-Class', amount: 142000, status: 'pending', date: '2024-01-14' },
    { id: '#ORD-003', customer: 'Mike Johnson', car: 'Porsche Cayenne', amount: 112000, status: 'delivered', date: '2024-01-13' },
    { id: '#ORD-004', customer: 'Sarah Williams', car: 'Audi RS7', amount: 96000, status: 'pending', date: '2024-01-12' },
  ])

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ))
  }

  const columns = [
    { key: 'id', label: 'Order ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'car', label: 'Car' },
    { key: 'amount', label: 'Amount', render: (val) => `$${val.toLocaleString()}` },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'actions', label: 'Actions', render: (_, row) => (
      <select
        value={row.status}
        onChange={(e) => updateStatus(row.id, e.target.value)}
        className="px-2 py-1 border rounded-lg text-sm"
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="delivered">Delivered</option>
      </select>
    ) }
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">Manage and track customer orders</p>
      </div>

      <DataTable columns={columns} data={orders} />
    </div>
  )
}