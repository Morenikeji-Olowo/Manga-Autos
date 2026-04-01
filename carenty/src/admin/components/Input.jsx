export default function Input({ label, type = 'text', placeholder, value, onChange, required, error }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          ${error ? 'border-red-500' : 'border-gray-200'}
        `}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}