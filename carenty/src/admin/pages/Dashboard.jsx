import { useState, useEffect } from 'react'
import { 
  Car, 
  DollarSign, 
  Users, 
  ShoppingBag,
  TrendingUp
} from 'lucide-react'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCars: 156,
    totalSales: 2345678,
    totalUsers: 3421,
    revenue: 1892345
  })

  const salesData = [
    { month: 'Jan', sales: 120000 },
    { month: 'Feb', sales: 150000 },
    { month: 'Mar', sales: 180000 },
    { month: 'Apr', sales: 220000 },
    { month: 'May', sales: 280000 },
    { month: 'Jun', sales: 320000 },
  ]

  const ordersData = [
    { name: 'Pending', value: 45, color: '#F59E0B' },
    { name: 'Paid', value: 78, color: '#10B981' },
    { name: 'Delivered', value: 156, color: '#3B82F6' },
  ]

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', car: 'BMW M5', amount: 85000, status: 'Paid' },
    { id: '#ORD-002', customer: 'Jane Smith', car: 'Mercedes G-Class', amount: 142000, status: 'Pending' },
    { id: '#ORD-003', customer: 'Mike Johnson', car: 'Porsche Cayenne', amount: 112000, status: 'Delivered' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, John! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Cars" value={stats.totalCars} icon={Car} trend={12} color="purple" />
        <StatCard title="Total Sales" value={`$${(stats.totalSales / 1000000).toFixed(1)}M`} icon={DollarSign} trend={8} color="green" />
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} trend={-2} color="blue" />
        <StatCard title="Revenue" value={`$${(stats.revenue / 1000000).toFixed(1)}M`} icon={TrendingUp} trend={15} color="orange" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Sales Overview">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8B5E3C" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Order Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ordersData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {ordersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {ordersData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.car}</td>
                  <td className="px-6 py-4 text-sm font-medium">${order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`
                      px-2 py-1 text-xs font-semibold rounded-full
                      ${order.status === 'Paid' ? 'bg-green-100 text-green-700' : ''}
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                      ${order.status === 'Delivered' ? 'bg-blue-100 text-blue-700' : ''}
                    `}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}