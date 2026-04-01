import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'AutoDeal',
    adminEmail: 'admin@autodeal.com',
    currency: 'USD',
    taxRate: '10',
    enableNotifications: true,
    maintenanceMode: false,
  })

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save settings
    alert('Settings saved successfully!')
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Configure your store settings and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          <div className="space-y-4">
            <Input
              label="Site Name"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
            />
            <Input
              label="Admin Email"
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleChange('adminEmail', e.target.value)}
            />
            <Input
              label="Currency"
              value={settings.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
            />
            <Input
              label="Tax Rate (%)"
              type="number"
              value={settings.taxRate}
              onChange={(e) => handleChange('taxRate', e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">System Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => handleChange('enableNotifications', e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="text-sm text-gray-700">Enable Email Notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="text-sm text-gray-700">Maintenance Mode</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="primary">Save Changes</Button>
          <Button type="button" variant="secondary">Cancel</Button>
        </div>
      </form>
    </div>
  )
}