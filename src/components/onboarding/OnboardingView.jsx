import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useApp, ACCENT_COLORS, CHARACTERS } from '../../context/AppContext'
import { GRADES } from '../../data/curriculum'

const OnboardingView = () => {
  const navigate = useNavigate()
  const {
    name, setName,
    selectedGrade, setSelectedGrade,
    accent, setAccent,
    character, setCharacter,
    language, setLanguage,
  } = useApp()

  if (name) return <Navigate to="/dashboard" replace />

  const [step, setStep] = useState(1)
  const [draftGrade, setDraftGrade] = useState(selectedGrade || 4)
  const [draftCharacter, setDraftCharacter] = useState(character || 'lion')
  const [draftAccent, setDraftAccent] = useState(accent || 'blue')
  const [draftName, setDraftName] = useState('')

  const totalSteps = 4

  const canContinue =
    (step === 1 && !!draftGrade) ||
    (step === 2 && !!draftCharacter) ||
    (step === 3 && !!draftAccent) ||
    (step === 4 && draftName.trim().length > 0)

  const handleContinue = () => {
    if (step === 1) {
      setSelectedGrade(draftGrade)
      setStep(2)
    } else if (step === 2) {
      setCharacter(draftCharacter)
      setStep(3)
    } else if (step === 3) {
      setAccent(draftAccent)
      setStep(4)
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

      {/* Progress */}
      <div className="max-w-2xl w-full mx-auto px-5 sm:px-6 pt-6">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i + 1 <= step ? '' : 'bg-gray-200 dark:bg-gray-800'
              }`}
              style={i + 1 <= step ? { backgroundColor: 'var(--accent)' } : {}}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          {language === 'en' ? `Step ${step} of ${totalSteps}` : `Hatua ${step} ya ${totalSteps}`}
        </p>
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col">
        <div className="max-w-2xl w-full mx-auto px-5 sm:px-6 py-8 sm:py-12">

          {/* STEP 1: Grade */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-3">
                {language === 'en' ? 'What grade are you in?' : 'Uko darasa gani?'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
                {language === 'en'
                  ? 'Pick your current grade level.'
                  : 'Chagua darasa lako la sasa.'}
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {GRADES.map(grade => (
                  <button
                    key={grade.id}
                    onClick={() => setDraftGrade(grade.id)}
                    className={`flex flex-col items-center justify-center gap-1 py-5 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 ${
                      draftGrade === grade.id
                        ? 'text-white'
                        : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    style={draftGrade === grade.id ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
                  >
                    <span className={`text-3xl font-black ${
                      draftGrade === grade.id ? 'text-white' : 'text-gray-900 dark:text-white'
                    }`}>
                      {grade.id}
                    </span>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      draftGrade === grade.id ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {language === 'en' ? 'Grade' : 'Darasa'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Character */}
          {step === 2 && (
            <div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-3">
                {language === 'en' ? 'Pick your character' : 'Chagua mhusika wako'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
                {language === 'en'
                  ? 'Choose one of the Big 5.'
                  : 'Chagua mmoja wa Watano Wakuu.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {Object.entries(CHARACTERS).map(([key, ch]) => (
                  <button
                    key={key}
                    onClick={() => setDraftCharacter(key)}
                    className={`flex flex-col items-center justify-center gap-2 py-6 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 ${
                      draftCharacter === key
                        ? 'text-white'
                        : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    style={draftCharacter === key ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
                  >
                    <span className="text-5xl">{ch.emoji}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      draftCharacter === key ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {language === 'en' ? ch.name : ch.nameSw}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Color */}
          {step === 3 && (
            <div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-3">
                {language === 'en' ? 'Pick your color' : 'Chagua rangi yako'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
                {language === 'en'
                  ? 'This will be your accent color across the app.'
                  : 'Hii itakuwa rangi yako kwenye programu nzima.'}
              </p>

              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                {Object.entries(ACCENT_COLORS).map(([key, color]) => (
                  <button
                    key={key}
                    onClick={() => { setDraftAccent(key); setAccent(key) }}
                    className={`aspect-square rounded-2xl transition-all hover:scale-105 active:scale-95 ${
                      draftAccent === key ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-950' : ''
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      '--tw-ring-color': color.hex,
                    }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Name */}
          {step === 4 && (
            <div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-3">
                {language === 'en' ? "What's your name?" : 'Jina lako ni nani?'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
                {language === 'en'
                  ? "We'll use this to personalize your experience."
                  : 'Tutatumia hii kubinafsisha matumizi yako.'}
              </p>

              <input
                autoFocus
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && canContinue && handleContinue()}
                placeholder={language === 'en' ? 'Enter your name' : 'Andika jina lako'}
                className="w-full px-5 py-4 text-lg bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white font-medium focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
                maxLength={30}
              />

              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                {language === 'en'
                  ? 'You can change everything later in Settings.'
                  : 'Unaweza kubadilisha kila kitu baadaye kwenye Mipangilio.'}
              </p>
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
              disabled={!canContinue}
              className="flex-1 py-3.5 text-white font-bold text-base rounded-2xl disabled:opacity-40 transition-all active:scale-[0.98]"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {step === totalSteps
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