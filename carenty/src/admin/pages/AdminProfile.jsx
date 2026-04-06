import { useState, useRef } from 'react'
import { 
  User, Mail, Phone, MapPin, Calendar, Clock, 
  Shield, Lock, Key, Smartphone, Laptop, 
  Bell, Moon, Sun, AlertTriangle, Save, 
  Camera, Edit2, Check, X, Plus, Trash2,
  Activity, Car, ShoppingBag, Users, 
  ChevronRight, Eye, EyeOff, LogOut
} from 'lucide-react'

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [show2FAModal, setShow2FAModal] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const fileInputRef = useRef(null)

  // Admin Data
  const [admin, setAdmin] = useState({
    // Personal Info
    name: 'John Doe',
    email: 'john.doe@autodeal.com',
    phone: '+234 801 234 5678',
    profilePicture: 'https://ui-avatars.com/api/?name=John+Doe&background=1a1a1a&color=fff&size=128',
    location: 'Lagos, Nigeria',
    role: 'Super Admin',
    
    // Account Stats
    totalCarsListed: 156,
    totalOrdersManaged: 234,
    totalUsersManaged: 3421,
    totalRevenueManaged: 2345678,
    
    // Activity
    lastLogin: '2024-01-15 14:30:00',
    accountCreated: '2023-06-01',
    
    // Security
    isMfaActive: false,
    trustedDevices: [
      { id: 1, device: 'Chrome on Windows', location: 'Lagos, Nigeria', lastUsed: '2024-01-15', isCurrent: true },
      { id: 2, device: 'Safari on iPhone', location: 'Lagos, Nigeria', lastUsed: '2024-01-14', isCurrent: false },
    ],
    
    // Preferences
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      orderUpdates: true,
      marketingEmails: false,
    },
    theme: 'light', // light, dark, system
  })

  const [formData, setFormData] = useState({
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    location: admin.location,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleProfileUpdate = () => {
    setAdmin({ ...admin, ...formData })
    setIsEditing(false)
    // Show success toast
    alert('Profile updated successfully!')
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters!')
      return
    }
    // Handle password change API call
    alert('Password changed successfully!')
    setShowPasswordModal(false)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handle2FAToggle = () => {
    setAdmin({ ...admin, isMfaActive: !admin.isMfaActive })
    setShow2FAModal(false)
    alert(admin.isMfaActive ? '2FA disabled' : '2FA enabled successfully!')
  }

  const handleRemoveDevice = (deviceId) => {
    setAdmin({
      ...admin,
      trustedDevices: admin.trustedDevices.filter(d => d.id !== deviceId)
    })
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAdmin({ ...admin, profilePicture: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Account Security', icon: Shield },
    { id: 'activity', label: 'Activity Overview', icon: Activity },
    { id: 'preferences', label: 'Preferences', icon: Bell },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 sticky top-24">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={admin.profilePicture}
                    alt={admin.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-1.5 bg-gray-900 rounded-full text-white hover:bg-gray-800 transition-colors"
                  >
                    <Camera size={14} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">{admin.name}</h2>
                <p className="text-sm text-gray-500">{admin.role}</p>
                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Mail size={14} />
                  <span>{admin.email}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="space-y-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                        ${activeTab === tab.id 
                          ? 'bg-gray-100 text-gray-900' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <tab.icon size={18} />
                      <span className="text-sm font-medium">{tab.label}</span>
                      {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <p className="text-sm text-gray-500">Update your personal details</p>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                      >
                        <X size={18} />
                      </button>
                      <button
                        onClick={handleProfileUpdate}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <Save size={16} />
                        Save
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <User size={16} className="text-gray-400" />
                          <span className="text-gray-900">{admin.name}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-gray-900">{admin.email}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-gray-900">{admin.phone}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="text-gray-900">{admin.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Lock size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                        <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Key size={20} className="text-gray-700" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${admin.isMfaActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {admin.isMfaActive ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <button
                      onClick={() => setShow2FAModal(true)}
                      className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {admin.isMfaActive ? 'Manage 2FA' : 'Enable 2FA'}
                    </button>
                  </div>
                </div>

                {/* Trusted Devices */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Smartphone size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Trusted Devices</h3>
                        <p className="text-sm text-gray-500">Devices that have access to your account</p>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {admin.trustedDevices.map(device => (
                      <div key={device.id} className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Laptop size={18} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{device.device}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-500">{device.location}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">Last used: {device.lastUsed}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {device.isCurrent && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Current</span>
                          )}
                          <button
                            onClick={() => handleRemoveDevice(device.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Car size={20} className="text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{admin.totalCarsListed}</p>
                    <p className="text-sm text-gray-500 mt-1">Cars Listed</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <ShoppingBag size={20} className="text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{admin.totalOrdersManaged}</p>
                    <p className="text-sm text-gray-500 mt-1">Orders Managed</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Users size={20} className="text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{admin.totalUsersManaged}</p>
                    <p className="text-sm text-gray-500 mt-1">Users Managed</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Activity size={20} className="text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">${(admin.totalRevenueManaged / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-gray-500 mt-1">Revenue Managed</p>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Last Login</p>
                        <p className="text-sm text-gray-500">{admin.lastLogin}</p>
                      </div>
                      <div className="text-xs text-gray-400">Today</div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Account Created</p>
                        <p className="text-sm text-gray-500">{admin.accountCreated}</p>
                      </div>
                      <div className="text-xs text-gray-400">Joined</div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Total Sessions</p>
                        <p className="text-sm text-gray-500">{admin.trustedDevices.length} active devices</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                {/* Notification Settings */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Bell size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                        <p className="text-sm text-gray-500">Choose what notifications you want to receive</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                      { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
                      { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about new orders and status changes' },
                      { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional emails and updates' },
                    ].map(item => (
                      <label key={item.key} className="flex items-center justify-between cursor-pointer py-2">
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={admin.notifications[item.key]}
                            onChange={(e) => setAdmin({
                              ...admin,
                              notifications: { ...admin.notifications, [item.key]: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-gray-900 transition-colors"></div>
                          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Theme Preference */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Sun size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Theme Preference</h3>
                        <p className="text-sm text-gray-500">Choose your preferred theme</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'light', label: 'Light', icon: Sun },
                        { value: 'dark', label: 'Dark', icon: Moon },
                        { value: 'system', label: 'System', icon: Monitor },
                      ].map(theme => (
                        <button
                          key={theme.value}
                          onClick={() => setAdmin({ ...admin, theme: theme.value })}
                          className={`
                            p-4 rounded-xl border-2 transition-all
                            ${admin.theme === theme.value 
                              ? 'border-gray-900 bg-gray-50' 
                              : 'border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <theme.icon size={24} className={`mx-auto mb-2 ${admin.theme === theme.value ? 'text-gray-900' : 'text-gray-500'}`} />
                          <p className={`text-sm font-medium ${admin.theme === theme.value ? 'text-gray-900' : 'text-gray-600'}`}>
                            {theme.label}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === 'danger' && (
              <div className="bg-white rounded-2xl border-2 border-red-200 overflow-hidden">
                <div className="p-6 border-b border-red-100 bg-red-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle size={20} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-900">Danger Zone</h3>
                      <p className="text-sm text-red-700">Irreversible actions that affect your account</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">Deactivate Account</p>
                      <p className="text-sm text-gray-500">Temporarily deactivate your admin account</p>
                    </div>
                    <button
                      onClick={() => setShowDeactivateModal(true)}
                      className="px-5 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Deactivate
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Delete Account</p>
                      <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                    </div>
                    <button
                      onClick={() => alert('This would delete your account')}
                      className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowPasswordModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>
                <button onClick={() => setShowPasswordModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  Update Password
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShow2FAModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  {admin.isMfaActive ? 'Disable 2FA' : 'Enable Two-Factor Authentication'}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  {admin.isMfaActive 
                    ? 'Are you sure you want to disable two-factor authentication? This will make your account less secure.'
                    : 'Two-factor authentication adds an extra layer of security to your account. You will be required to enter a verification code from your authenticator app when logging in.'}
                </p>
                {!admin.isMfaActive && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-mono text-center">QR Code would appear here</p>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={handle2FAToggle}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  {admin.isMfaActive ? 'Disable 2FA' : 'Enable 2FA'}
                </button>
                <button
                  onClick={() => setShow2FAModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Deactivate Account Modal */}
      {showDeactivateModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowDeactivateModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-red-600">Deactivate Account</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Are you sure you want to deactivate your account? You can reactivate it later by contacting support.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> While deactivated, you won't be able to access the admin dashboard or manage listings.
                  </p>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => alert('Account deactivated')}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => setShowDeactivateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Missing Monitor icon component
function Monitor(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  )
}