import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const HomeIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" />
  </svg>
)
const LearnIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)
const ProfileIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)
const SettingsIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)
const ChevronLeftIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)
const ChevronRightIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)

const NAV_ITEMS = [
  { path: '/dashboard',  label: 'Home',     labelSw: 'Nyumbani',   Icon: HomeIcon },
  { path: '/curriculum', label: 'Learn',    labelSw: 'Jifunza',    Icon: LearnIcon },
  { path: '/profile',    label: 'Profile',  labelSw: 'Wasifu',     Icon: ProfileIcon },
  { path: '/settings',   label: 'Settings', labelSw: 'Mipangilio', Icon: SettingsIcon },
]

const Sidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { language, sidebarCollapsed, setSidebarCollapsed } = useApp()

  const handleNav = (path) => {
    navigate(path)
    onClose?.()
  }

  const renderContent = (collapsed) => (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className={`pt-6 pb-4 flex ${collapsed ? 'justify-center px-2' : 'justify-center px-5'}`}>
        <button onClick={() => handleNav('/dashboard')} aria-label="Mwangaza">
          <img src="/mwangaza_icon.png" alt="Mwangaza" className="w-12 h-12" />
        </button>
      </div>

      {/* Nav */}
      <nav className={`flex-1 py-2 space-y-1 ${collapsed ? 'px-2' : 'px-3'}`}>
        {NAV_ITEMS.map(({ path, label, labelSw, Icon }) => {
          const isActive = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => handleNav(path)}
              title={collapsed ? (language === 'en' ? label : labelSw) : undefined}
              className={`w-full flex items-center gap-3 ${collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'} rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
              style={isActive ? { backgroundColor: 'var(--accent)' } : {}}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{language === 'en' ? label : labelSw}</span>}
            </button>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="hidden lg:flex w-full items-center justify-center py-3 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />}
      </button>
    </div>
  )

  return (
    <>
      <aside className={`hidden lg:block fixed left-0 top-0 bottom-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-30 overflow-y-auto transition-all duration-200 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        {renderContent(sidebarCollapsed)}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={onClose} />
          <aside className="relative w-72 bg-white dark:bg-gray-900 h-full overflow-y-auto shadow-2xl">
            {renderContent(false)}
          </aside>
        </div>
      )}
    </>
  )
}

export default Sidebar