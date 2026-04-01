import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Car, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Manage Cars', href: '/admin/cars', icon: Car },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Handle logout logic
    navigate('/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} onClick={() => setCollapsed(true)} />
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-30 h-full bg-white shadow-xl transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
        lg:translate-x-0
        ${collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AutoDeal Admin
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 mb-1 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-purple-50 text-purple-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <item.icon size={20} />
              {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
            </NavLink>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 px-3 py-3 mt-6 w-full rounded-xl transition-all duration-200
              text-red-600 hover:bg-red-50
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut size={20} />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </nav>
      </aside>
    </>
  )
}