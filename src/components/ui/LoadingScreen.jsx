import React, { useEffect, useState } from 'react'

const LoadingScreen = () => {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setOpacity(1), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="fixed inset-0 bg-white flex flex-col items-center
                 justify-center z-50"
      style={{ opacity, transition: 'opacity 0.3s ease' }}
    >
      {/* Spinning logo */}
      <div className="relative flex items-center justify-center mb-8">

        {/* Gold outer ring */}
        <div
          className="absolute w-20 h-20 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: '#C9A84C',
            borderRightColor: '#C9A84C',
            animation: 'spin 1.2s linear infinite',
          }}
        />

        {/* Blue inner ring */}
        <div
          className="absolute w-14 h-14 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: '#1a56db',
            borderLeftColor: '#1a56db',
            animation: 'spin 0.8s linear infinite reverse',
          }}
        />

        {/* Center M */}
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center
                        justify-center shadow-lg">
          <span className="text-white font-black text-lg">M</span>
        </div>
      </div>

      {/* Brand */}
      <div className="text-center">
        <div className="font-black text-xl text-gray-900 tracking-tight">
          MWANGAZA
        </div>
        <div
          className="text-xs font-medium mt-1"
          style={{ color: '#C9A84C' }}
        >
          Illuminate Learning
        </div>
      </div>

      {/* Connecting message — shows after 2 seconds */}
      <SlowMessage />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// Shows a message if loading takes more than 2 seconds
const SlowMessage = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div
      className="mt-8 text-center px-8"
      style={{ animation: 'fadeIn 0.5s ease' }}
    >
      <p className="text-xs text-gray-400">
        Connecting to server...
      </p>
      <p className="text-xs text-gray-300 mt-1">
        This may take a few seconds on first load
      </p>
    </div>
  )
}

export default LoadingScreen