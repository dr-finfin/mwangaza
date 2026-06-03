import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Home', labelSw: 'Nyumbani' },
  { path: '/curriculum', label: 'Learn', labelSw: 'Jifunza' },
  { path: '/progress', label: 'Progress', labelSw: 'Maendeleo' },
  { path: '/profile', label: 'Profile', labelSw: 'Wasifu' },
]

const Sidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { language, selectedGrade, progress } = useApp()

  const completed = Object.values(progress).filter(p => p.status === 'completed').length
  const scored = Object.values(progress).filter(p => p.best_score)
  const mastery = scored.length
    ? Math.round(scored.reduce((sum, item) => sum + item.best_score, 0) / scored.length)
    : 0

  const handleNav = (path) => {
    navigate(path)
    onClose?.()
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={() => handleNav('/dashboard')}
          className="flex items-center gap-3 w-full text-left"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/20">
            <span className="text-white font-black text-lg">M</span>
          </div>
          <div className="min-w-0">
            <div className="font-black text-lg text-gray-900 dark:text-white tracking-tight leading-none">
              MWANGAZA
            </div>
            <div className="text-xs font-medium mt-0.5" style={{ color: '#C9A84C' }}>
              {language === 'en' ? 'Illuminate Learning' : 'Angaza Elimu'}
            </div>
          </div>
        </button>
      </div>

      {/* Grade summary */}
      <div className="px-4 pt-4">
        <div className="px-3 py-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50">
          <div className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
            Current grade
          </div>
          <div className="font-bold text-blue-700 dark:text-blue-300 text-sm">
            Grade {selectedGrade}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min(mastery, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {mastery}%
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <div className="text-xs font-semibold text-gray-300 dark:text-gray-600 uppercase tracking-wider px-3 mb-3">
          {language === 'en' ? 'Navigation' : 'Urambazaji'}
        </div>

        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path

          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span>{language === 'en' ? item.label : item.labelSw}</span>
              {isActive && (
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#C9A84C' }}
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom summary */}
      <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
        <div className="px-3 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
            Learning summary
          </div>
          <div className="text-sm font-semibold text-gray-800 dark:text-white">
            {completed} lessons completed
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Progress is saved on this device.
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-30 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="relative w-72 bg-white dark:bg-gray-900 h-full overflow-y-auto shadow-2xl animate-slide-up">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}

export default Sidebar