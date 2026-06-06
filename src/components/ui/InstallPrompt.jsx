import React, { useState, useEffect } from 'react'
import { useApp, CHARACTERS } from '../../context/AppContext'

const STORAGE_KEY = 'mwangaza_install_dismissed'

const InstallPrompt = () => {
  const { language, character } = useApp()
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow] = useState(false)

  const ch = CHARACTERS[character] || CHARACTERS.lion

  useEffect(() => {
    // Hide if already installed
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    if (isStandalone) return

    // Hide if recently dismissed
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      if (dismissed) {
        const days = (Date.now() - Number(dismissed)) / (1000 * 60 * 60 * 24)
        if (days < 7) return
      }
    } catch {}

    // Capture the install event — only fires on Chrome/Edge/Android/Brave etc.
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Hide on successful install
    const installedHandler = () => {
      setShow(false)
      setDeferredPrompt(null)
    }
    window.addEventListener('appinstalled', installedHandler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShow(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShow(false)
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {}
  }

  // Only render if the browser actually supports programmatic install
  if (!show || !deferredPrompt) return null

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:w-96 z-[60] animate-slide-up">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

        <div className="h-1.5" style={{ backgroundColor: 'var(--accent)' }} />

        <div className="p-5">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
            >
              {ch.emoji}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                {language === 'en' ? 'Install Mwangaza' : 'Sakinisha Mwangaza'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {language === 'en'
                  ? 'Add Mwangaza to your home screen for quick access — and study even when you\'re offline.'
                  : 'Ongeza Mwangaza kwenye skrini ya nyumbani — soma hata ukiwa nje ya mtandao.'}
              </p>
            </div>

            <button
              onClick={handleDismiss}
              aria-label={language === 'en' ? 'Dismiss' : 'Funga'}
              className="flex-shrink-0 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl leading-none -mt-1"
            >
              ×
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleDismiss}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {language === 'en' ? 'Maybe later' : 'Baadaye'}
            </button>
            <button
              onClick={handleInstall}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {language === 'en' ? 'Install' : 'Sakinisha'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt