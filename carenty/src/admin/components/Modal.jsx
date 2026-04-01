export default function Button({ children, onClick, type = 'button', variant = 'primary', icon, disabled, fullWidth, size = 'md' }) {
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {icon}
      {children}
    </button>
  )
}