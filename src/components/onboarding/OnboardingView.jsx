import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useApp, ACCENT_COLORS } from '../../context/AppContext'

const OnboardingView = () => {
  const navigate = useNavigate()
  const { name, setName, selectedGrade, accent, setAccent, language, setLanguage, darkMode } = useApp()

  // If already onboarded, skip
  if (name) return <Navigate to="/dashboard" replace />

  const [step, setStep] = useState(1)
  const [draftName, setDraftName] = useState('')

  const handleContinue = () => {
    if (step === 1) {
      if (!draftName.trim()) return
      setStep(2)
    } else {
      setName(draftName.trim())
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Top bar */}
      <header className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/mwangaza_icon.png" alt="Mwangaza" className="w-8 h-8 rounded-lg" />
            <span className="font-black text-base sm:text-lg tracking-tight">MWANGAZA</span>
          </div>

          <button
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
          >
            {language === 'en' ? 'SW' : 'EN'}
          </button>
        </div>
      </header>

      {/* Progress dots */}
      <div className="max-w-2xl w-full mx-auto px-5 sm:px-6 pt-6">
        <div className="flex items-center gap-2">
          {[1, 2].map(s => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? '' : 'bg-gray-200 dark:bg-gray-800'
              }`}
              style={s <= step ? { backgroundColor: 'var(--accent)' } : {}}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          {language === 'en' ? `Step ${step} of 2` : `Hatua ${step} ya 2`}
        </p>
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col">
        <div className="max-w-2xl w-full mx-auto px-5 sm:px-6 py-8 sm:py-12">

          {step === 1 && (
            <div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-3">
                {language === 'en' ? "What's your name?" : 'Jina lako ni nani?'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
                {language === 'en'
                  ? `Grade ${selectedGrade} · We'll use this to personalize your experience.`
                  : `Darasa la ${selectedGrade} · Tutatumia hii kubinafsisha matumizi yako.`}
              </p>

              <input
                autoFocus
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleContinue()}
                placeholder={language === 'en' ? 'Enter your name' : 'Andika jina lako'}
                className="w-full px-5 py-4 text-lg bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white font-medium focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
                maxLength={30}
              />

              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                {language === 'en' ? 'You can change this anytime in Settings.' : 'Unaweza kubadilisha hii wakati wowote kwenye Mipangilio.'}
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-3">
                {language === 'en' ? 'Pick your color' : 'Chagua rangi yako'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
                {language === 'en'
                  ? 'This will be your accent color across the app.'
                  : 'Hii itakuwa rangi yako kwenye programu nzima.'}
              </p>

              <div className="grid grid-cols-5 gap-3 sm:gap-4 mb-2">
                {Object.entries(ACCENT_COLORS).map(([key, color]) => (
                  <button
                    key={key}
                    onClick={() => setAccent(key)}
                    className={`aspect-square rounded-2xl transition-all hover:scale-105 active:scale-95 ${
                      accent === key ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-950' : ''
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      '--tw-ring-color': color.hex,
                    }}
                    aria-label={color.name}
                  />
                ))}
              </div>

              <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 px-1">
                {Object.values(ACCENT_COLORS).map(color => (
                  <span key={color.name} className="flex-1 text-center">
                    {color.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom button */}
        <div className="mt-auto border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-2xl mx-auto px-5 sm:px-6 py-5 flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3.5 rounded-2xl text-sm font-semibold border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
              >
                {language === 'en' ? 'Back' : 'Rudi'}
              </button>
            )}

            <button
              onClick={handleContinue}
              disabled={step === 1 && !draftName.trim()}
              className="flex-1 py-3.5 text-white font-bold text-base rounded-2xl disabled:opacity-40 transition-all active:scale-[0.98]"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {step === 2
                ? (language === 'en' ? 'Get Started' : 'Anza')
                : (language === 'en' ? 'Continue' : 'Endelea')}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default OnboardingView