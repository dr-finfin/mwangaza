import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const STORAGE_KEY = 'mwangaza_install_hint_dismissed'

const InstallPrompt = () => {
  const navigate = useNavigate()
  const { language, installAvailable, isInstalled } = useApp()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isInstalled) return

    try {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      if (dismissed) {
        const days = (Date.now() - Number(dismissed)) / (1000 * 60 * 60 * 24)
        if (days < 14) return
      }
    } catch {}

    // Small delay so it doesn't slam in on page load
    const timer = setTimeout(() => setShow(true), 6000)
    return () => clearTimeout(timer)
  }, [isInstalled])

  const handleDismiss = () => {
    setShow(false)
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {}
  }

  const handleGoToSettings = () => {
    navigate('/settings')
    setShow(false)
  }

  if (isInstalled || !show) return null

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:w-96 z-[60] animate-slide-up">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">

        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {language === 'en'
                ? 'Want to use Mwangaza offline? You can install it from '
                : 'Unataka kutumia Mwangaza bila mtandao? Unaweza kuisakinisha kutoka '}
              <button
                onClick={handleGoToSettings}
                className="font-bold hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {language === 'en' ? 'Settings' : 'Mipangilio'}
              </button>
              .
            </p>
          </div>

          <button
            onClick={handleDismiss}
            aria-label={language === 'en' ? 'Dismiss' : 'Funga'}
            className="flex-shrink-0 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt