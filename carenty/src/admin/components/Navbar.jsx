import { useState } from 'react'
import { Search, Bell, Moon, Sun, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'


export default function AdminNavbar({ darkMode, setDarkMode }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { logout } = useAuthStore()
  const navigate = useNavigate();
  const admin = {
    name: 'John Doe',
    email: 'admin@autodeal.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=000000&color=fff'
  }

    const handleLogout = async () => {
    await logout()
    navigate('/')
  }
  const notifications = [
    { id: 1, title: 'New order received', time: '5 min ago', read: false },
    { id: 2, title: 'Car listing approved', time: '1 hour ago', read: false },
    { id: 3, title: 'Payment successful', time: '3 hours ago', read: true },
  ]

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Left spacer for mobile menu button */}
        <div className="w-10 lg:hidden"></div>
        
        {/* Search - Hidden on mobile, visible on tablet/desktop */}
        <div className="hidden md:block flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search cars, orders, users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* Mobile search button */}
        <div className="md:hidden flex-1">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Search size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <Bell size={18} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-40">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-4 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-gray-50' : ''}`}>
                        <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 lg:gap-3 p-1 lg:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={admin.avatar}
                alt={admin.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                <p className="text-xs text-gray-500">{admin.email}</p>
              </div>
              <ChevronDown size={14} className="hidden lg:block text-gray-400" />
            </button>

            {showProfileDropdown && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowProfileDropdown(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-40">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                    <p className="text-xs text-gray-500">{admin.email}</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">Profile Settings</button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">Account Settings</button>
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">Logout</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}