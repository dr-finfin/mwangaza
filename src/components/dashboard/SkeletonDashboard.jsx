import React from 'react'

const Shimmer = ({ className = '' }) => (
  <div className={`rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden relative ${className}`}>
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.5) 50%, transparent 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
    <style>{`
      @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
)

const SkeletonDashboard = () => (
  <div className="space-y-4 animate-fade-in">
    <div className="space-y-2 mb-6">
      <Shimmer className="h-3 w-28" />
      <Shimmer className="h-7 w-48" />
      <Shimmer className="h-3 w-40" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Shimmer className="h-28 rounded-2xl" />
      <Shimmer className="h-28 rounded-2xl" />
    </div>
    <Shimmer className="h-36 rounded-2xl" />
    <Shimmer className="h-24 rounded-2xl" />
    <Shimmer className="h-20 rounded-2xl" />
  </div>
)

export default SkeletonDashboard