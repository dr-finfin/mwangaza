import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp, CHARACTERS } from '../../context/AppContext'
import SearchOverlay from './SearchOverlay'
import AnimatedLogo from '../ui/AnimatedLogo'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { name, selectedGrade, language, t, character } = useApp()

  const [showDropdown, setShowDropdown] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const displayName = name || (language === 'en' ? 'Student' : 'Mwanafunzi')
  const ch = CHARACTERS[character] || CHARACTERS.lion

  const pathLabels = {
    '/dashboard':  language === 'en' ? 'Home'     : 'Nyumbani',
    '/curriculum': language === 'en' ? 'Learn'    : 'Jifunza',
    '/profile':    language === 'en' ? 'Profile'  : 'Wasifu',
    '/settings':   language === 'en' ? 'Settings' : 'Mipangilio',
  }

  return (
    <>
      <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 gap-2">

          <div className="flex items-center gap-3 min-w-0">
            <div className="lg:hidden">
              <AnimatedLogo height={72} />
            </div>

            <div className="hidden lg:flex items-center gap-2 text-sm min-w-0">
              <span className="text-gray-400 dark:text-gray-500">Mwangaza</span>
              {pathLabels[location.pathname] && (
                <>
                  <span className="text-gray-200 dark:text-gray-700">/</span>
                  <span className="text-gray-800 dark:text-gray-200 font-semibold truncate">
                    {pathLabels[location.pathname]}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">

            <button
              onClick={() => setSearchOpen(true)}
              aria-label={language === 'en' ? 'Search lessons' : 'Tafuta masomo'}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline text-xs font-semibold">
                {language === 'en' ? 'Search' : 'Tafuta'}
              </span>
              <kbd className="hidden md:inline ml-1 text-[10px] font-mono text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-1">/</kbd>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                aria-label={language === 'en' ? 'Your account' : 'Akaunti yako'}
                aria-haspopup="menu"
                aria-expanded={showDropdown}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  {ch.emoji}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[80px] truncate">
                  {displayName.split(' ')[0]}
                </span>
              </button>

              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} aria-hidden="true" />
                  <div role="menu" className="absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-xl border overflow-hidden z-50 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
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
                        role="menuitem"
                        onClick={() => { navigate('/profile'); setShowDropdown(false) }}
                        className="w-full px-4 py-2.5 text-sm text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        {t('profile')}
                      </button>
                      <button
                        role="menuitem"
                        onClick={() => { navigate('/settings'); setShowDropdown(false) }}
                        className="w-full px-4 py-2.5 text-sm text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        {language === 'en' ? 'Settings' : 'Mipangilio'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default Navbar