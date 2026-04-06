export default function LoadingOverlay({ text= 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl px-8 py-6 flex flex-col items-center gap-3 shadow-xl">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6B4226] rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-700">{text}</p>
      </div>
    </div>
  )
}