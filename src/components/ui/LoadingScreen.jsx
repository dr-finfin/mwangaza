import React from 'react'

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-6">
      <span className="text-white font-black text-lg">M</span>
    </div>
    <div className="font-black text-xl text-gray-900 tracking-tight">MWANGAZA</div>
    <div className="text-xs mt-1" style={{ color: '#C9A84C' }}>Loading...</div>
  </div>
)

export default LoadingScreen