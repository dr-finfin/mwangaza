import React, { useState, useEffect } from 'react'
import { useApp, CHARACTERS } from '../../context/AppContext'

const STORAGE_KEY = 'mwangaza_install_dismissed'

// Detect the platform so we can show the right instructions
const detectPlatform = () => {
  const ua = navigator.userAgent || ''
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream
  const isAndroid = /android/i.test(ua)
  const isMobile = isIOS || isAndroid
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true

  return { isIOS, isAndroid, isMobile, isStandalone }
}

const InstallPrompt = () => {
  const { language, character } = useApp()
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [platform, setPlatform] = useState({
    isIOS: false,
    isAndroid: false,
    isMobile: false,
    isStandalone: false,
  })

  const ch = CHARACTERS[character] || CHARACTERS.lion

  useEffect(() => {
    const p = detectPlatform()
    setPlatform(p)

    if (p.isStandalone) return

    try {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      if (dismissed) {
        const days = (Date.now() - Number(dismissed)) / (1000 * 60 * 60 * 24)
        if (days < 7) return
      }
    } catch {}

    // Listen for native install prompt (Chrome / Edge / Android)
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Detect successful install
    const installedHandler = () => {
      setShow(false)
      setShowInstructions(false)
      setDeferredPrompt(null)
    }
    window.addEventListener('appinstalled', installedHandler)

    // Always show the prompt after 4 seconds
    const timer = setTimeout(() => setShow(true), 4000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', installedHandler)
      clearTimeout(timer)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setShow(false)
      }
      setDeferredPrompt(null)
    } else {
      setShowInstructions(true)
    }
  }

  const handleDismiss = () => {
    setShow(false)
    setShowInstructions(false)
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {}
  }

  if (platform.isStandalone || !show) return null

  // ── Manual instructions modal ─────────────────────────────
  if (showInstructions) {
    return (
      <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md overflow-hidden">

          <div className="h-1.5" style={{ backgroundColor: 'var(--accent)' }} />

          <div className="p-6">
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
              >
                {ch.emoji}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                  {language === 'en' ? 'Install Mwangaza' : 'Sakinisha Mwangaza'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'en'
                    ? 'Follow these steps on your device:'
                    : 'Fuata hatua hizi kwenye kifaa chako:'}
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl leading-none -mt-1"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {platform.isIOS ? (
              <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>1</span>
                  <span>{language === 'en' ? 'Tap the Share button at the bottom of Safari' : 'Bonyeza kitufe cha Share chini ya Safari'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>2</span>
                  <span>{language === 'en' ? 'Scroll down and tap "Add to Home Screen"' : 'Tembea chini na bonyeza "Add to Home Screen"'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>3</span>
                  <span>{language === 'en' ? 'Tap "Add" in the top-right corner' : 'Bonyeza "Add" kona ya juu kulia'}</span>
                </li>
              </ol>
            ) : platform.isAndroid ? (
              <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>1</span>
                  <span>{language === 'en' ? 'Tap the menu button (⋮) in your browser' : 'Bonyeza kitufe cha menyu (⋮) kwenye kivinjari'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>2</span>
                  <span>{language === 'en' ? 'Tap "Add to Home screen" or "Install app"' : 'Bonyeza "Add to Home screen" au "Install app"'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>3</span>
                  <span>{language === 'en' ? 'Confirm by tapping "Add" or "Install"' : 'Thibitisha kwa kubonyeza "Add" au "Install"'}</span>
                </li>
              </ol>
            ) : (
              <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>1</span>
                  <span>{language === 'en' ? 'Look for the install icon (⊕) in your address bar' : 'Tafuta ikoni ya kusakinisha (⊕) kwenye upau wa anwani'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>2</span>
                  <span>{language === 'en' ? 'Click it and select "Install"' : 'Bonyeza na chagua "Install"'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>3</span>
                  <span>{language === 'en' ? 'Or bookmark this page to access it quickly' : 'Au hifadhi ukurasa huu kufikia haraka'}</span>
                </li>
              </ol>
            )}

            <button
              onClick={handleDismiss}
              className="w-full mt-6 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {language === 'en' ? 'Got it' : 'Nimeelewa'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Main prompt card ─────────────────────────────────────
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