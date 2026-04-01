export default function StatusBadge({ status }) {
  const statusConfig = {
    active: { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
    sold: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Sold' },
    delivered: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Delivered' },
    paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'Paid' },
    failed: { bg: 'bg-red-100', text: 'text-red-700', label: 'Failed' },
    successful: { bg: 'bg-green-100', text: 'text-green-700', label: 'Successful' },
    blocked: { bg: 'bg-red-100', text: 'text-red-700', label: 'Blocked' },
    inactive: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Inactive' },
  }

  const config = statusConfig[status] || statusConfig.inactive

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}