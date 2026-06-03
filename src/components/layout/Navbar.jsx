import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const Navbar = ({ onMenuToggle }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { name, selectedGrade, language, setLanguage, darkMode, setDarkMode, t } = useApp()

  const [showDropdown, setShowDropdown] = useState(false)

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const displayName = name || (language === 'en' ? 'Student' : 'Mwanafunzi')

  const pathLabels = {
    '/dashboard': language === 'en' ? 'Home' : 'Nyumbani',
    '/curriculum': language === 'en' ? 'Learn' : 'Jifunza',
    '/profile': language === 'en' ? 'Profile' : 'Wasifu',
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">

        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-gray-400 dark:text-gray-500">Mwangaza</span>
            {pathLabels[location.pathname] && (
              <>
                <span className="text-gray-200 dark:text-gray-700">/</span>
                <span className="text-gray-800 dark:text-gray-200 font-semibold">
                  {pathLabels[location.pathname]}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
          >
            {language === 'en' ? 'SW' : 'EN'}
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[80px] truncate">
                {displayName.split(' ')[0]}
              </span>
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-xl border overflow-hidden z-50 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div className="font-semibold text-sm truncate text-gray-800 dark:text-white">
                      {displayName}
                    </div>
                    <div className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">
                      {language === 'en' ? 'Grade' : 'Darasa'} {selectedGrade}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { navigate('/profile'); setShowDropdown(false) }}
                      className="w-full px-4 py-2.5 text-sm text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {t('profile')}
                    </button>
                    <button
                      onClick={() => { navigate('/curriculum'); setShowDropdown(false) }}
                      className="w-full px-4 py-2.5 text-sm text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {language === 'en' ? 'Learn' : 'Jifunza'}
                    </button>
                    <button
                      onClick={() => { setDarkMode(!darkMode); setShowDropdown(false) }}
                      className="w-full px-4 py-2.5 text-sm text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 sm:hidden"
                    >
                      {darkMode
                        ? (language === 'en' ? 'Light mode' : 'Mwanga')
                        : (language === 'en' ? 'Dark mode' : 'Giza')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar