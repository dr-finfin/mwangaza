import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const NAV_ITEMS = [
  { path: '/dashboard',  label: 'Home',    labelSw: 'Nyumbani' },
  { path: '/curriculum', label: 'Learn',   labelSw: 'Jifunza' },
  { path: '/profile',    label: 'Profile', labelSw: 'Wasifu' },
]

const Sidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { language, selectedGrade, stats } = useApp()

  const handleNav = (path) => {
    navigate(path)
    onClose?.()
  }

  const content = (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => handleNav('/')} className="flex items-center gap-3 w-full text-left">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-lg">M</span>
          </div>
          <div>
            <div className="font-black text-lg text-gray-900 dark:text-white tracking-tight leading-none">MWANGAZA</div>
            <div className="text-xs mt-0.5" style={{ color: '#C9A84C' }}>
              {language === 'en' ? 'Illuminate Learning' : 'Angaza Elimu'}
            </div>
          </div>
        </button>
      </div>

      {/* Grade */}
      <div className="px-4 pt-4">
        <div className="px-3 py-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50">
          <div className="text-xs text-gray-400 mb-0.5">
            {language === 'en' ? 'Grade' : 'Darasa'}
          </div>
          <div className="font-bold text-blue-700 dark:text-blue-300 text-sm">
            {language === 'en' ? 'Grade' : 'Darasa'} {selectedGrade}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(stats.mastery, 100)}%` }} />
            </div>
            <span className="text-xs text-gray-400">{stats.mastery}%</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {language === 'en' ? item.label : item.labelSw}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {stats.completed} {language === 'en' ? 'lessons done' : 'masomo'}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-30 overflow-y-auto">
        {content}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={onClose} />
          <aside className="relative w-72 bg-white dark:bg-gray-900 h-full overflow-y-auto shadow-2xl">
            {content}
          </aside>
        </div>
      )}
    </>
  )
}

export default Sidebar