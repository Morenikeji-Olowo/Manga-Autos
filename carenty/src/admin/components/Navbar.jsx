import { useState } from 'react'
import { Search, Bell, Moon, Sun, ChevronDown } from 'lucide-react'

export default function Navbar({ darkMode, setDarkMode }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const admin = {
    name: 'John Doe',
    email: 'admin@autodeal.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=8B5E3C&color=fff'
  }

  const notifications = [
    { id: 1, title: 'New order received', time: '5 min ago', read: false },
    { id: 2, title: 'Car listing approved', time: '1 hour ago', read: false },
    { id: 3, title: 'Payment successful', time: '3 hours ago', read: true },
  ]

  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search cars, orders, users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <Bell size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-4 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-purple-50' : ''}`}>
                      <p className="text-sm font-medium">{notif.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={admin.avatar}
                alt={admin.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{admin.name}</p>
                <p className="text-xs text-gray-500">{admin.email}</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-50">
                <div className="p-3 border-b">
                  <p className="text-sm font-medium">{admin.name}</p>
                  <p className="text-xs text-gray-500">{admin.email}</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Profile Settings</button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Account Settings</button>
                  <hr className="my-1" />
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}