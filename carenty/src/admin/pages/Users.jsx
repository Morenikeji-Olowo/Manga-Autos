import { useState } from 'react'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import { Ban, Trash2 } from 'lucide-react'

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', joined: '2024-01-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', joined: '2024-01-05' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', status: 'blocked', joined: '2024-01-10' },
  ])

  const toggleBlock = (id) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    ))
  }

  const deleteUser = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (val) => (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${val === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
        {val}
      </span>
    ) },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'joined', label: 'Joined' },
    { key: 'actions', label: 'Actions', render: (_, row) => (
      <div className="flex gap-2">
        <button onClick={() => toggleBlock(row.id)} className="p-1 hover:bg-gray-100 rounded">
          <Ban size={16} className={row.status === 'active' ? 'text-orange-500' : 'text-green-500'} />
        </button>
        <button onClick={() => deleteUser(row.id)} className="p-1 hover:bg-red-50 text-red-600 rounded">
          <Trash2 size={16} />
        </button>
      </div>
    ) }
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 mt-1">Manage user accounts and permissions</p>
      </div>

      <DataTable columns={columns} data={users} />
    </div>
  )
}