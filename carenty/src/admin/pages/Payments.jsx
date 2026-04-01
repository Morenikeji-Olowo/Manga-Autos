import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'

export default function AdminPayments() {
  const payments = [
    { id: 'TXN-001', orderId: '#ORD-001', amount: 85000, method: 'Credit Card', date: '2024-01-15', status: 'successful' },
    { id: 'TXN-002', orderId: '#ORD-002', amount: 142000, method: 'Bank Transfer', date: '2024-01-14', status: 'pending' },
    { id: 'TXN-003', orderId: '#ORD-003', amount: 112000, method: 'PayPal', date: '2024-01-13', status: 'successful' },
    { id: 'TXN-004', orderId: '#ORD-004', amount: 96000, method: 'Credit Card', date: '2024-01-12', status: 'failed' },
  ]

  const columns = [
    { key: 'id', label: 'Transaction ID' },
    { key: 'orderId', label: 'Order ID' },
    { key: 'amount', label: 'Amount', render: (val) => `$${val.toLocaleString()}` },
    { key: 'method', label: 'Payment Method' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
  ]

  const totalRevenue = payments.reduce((sum, p) => sum + (p.status === 'successful' ? p.amount : 0), 0)
  const pendingAmount = payments.reduce((sum, p) => sum + (p.status === 'pending' ? p.amount : 0), 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 mt-1">Track and manage payment transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Pending Amount</p>
          <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
        </div>
      </div>

      <DataTable columns={columns} data={payments} />
    </div>
  )
}