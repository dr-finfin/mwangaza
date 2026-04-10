import React from 'react'

// Single shimmer block
const Shimmer = ({ className = '' }) => (
  <div
    className={`rounded-xl bg-gray-100 overflow-hidden relative ${className}`}
  >
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.6) 50%, transparent 75%)',
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

    {/* Welcome text */}
    <div className="mb-6 space-y-2">
      <Shimmer className="h-3 w-32" />
      <Shimmer className="h-7 w-56" />
      <Shimmer className="h-3 w-48" />
    </div>

    {/* Grade card */}
    <Shimmer className="h-36 w-full rounded-2xl" />

    {/* Mastery + Streak */}
    <div className="grid grid-cols-2 gap-4">
      <Shimmer className="h-28 rounded-2xl" />
      <Shimmer className="h-28 rounded-2xl" />
    </div>

    {/* Lessons completed */}
    <Shimmer className="h-24 w-full rounded-2xl" />

    {/* Recent activity */}
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex justify-between">
        <Shimmer className="h-4 w-32" />
        <Shimmer className="h-4 w-16" />
      </div>
      <div className="divide-y divide-gray-50">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-3 px-5 py-3">
            <Shimmer className="w-2 h-2 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Shimmer className="h-3.5 w-3/4" />
              <Shimmer className="h-2.5 w-1/2" />
            </div>
            <Shimmer className="h-5 w-10 rounded-full" />
          </div>
        ))}
      </div>
    </div>

    {/* Quote */}
    <div
      className="bg-white rounded-2xl p-5 border border-gray-100
                 border-l-4 space-y-2"
      style={{ borderLeftColor: '#C9A84C' }}
    >
      <Shimmer className="h-3 w-24" />
      <Shimmer className="h-3 w-full" />
      <Shimmer className="h-3 w-5/6" />
      <Shimmer className="h-3 w-2/3" />
      <Shimmer className="h-3 w-20 mt-2" />
    </div>

    {/* Quick actions */}
    <div className="grid grid-cols-3 gap-3">
      {[1, 2, 3].map(i => (
        <Shimmer key={i} className="h-20 rounded-2xl" />
      ))}
    </div>
  </div>
)

export default SkeletonDashboard