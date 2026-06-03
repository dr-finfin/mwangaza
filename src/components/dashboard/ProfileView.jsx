import React, { useState } from 'react'
import { useApp, ACCENT_COLORS } from '../../context/AppContext'
import { GRADES } from '../../data/curriculum'

const ProfileView = () => {
  const {
    name, setName,
    selectedGrade, setSelectedGrade,
    language, setLanguage,
    darkMode, setDarkMode,
    accent, setAccent,
    exportData, resetAll,
    showNotification,
  } = useApp()

  const [draftName, setDraftName] = useState(name)

  const saveName = () => {
    setName(draftName)
    showNotification(language === 'en' ? 'Saved' : 'Imehifadhiwa', 'success')
  }

  const handleReset = () => {
    if (window.confirm(language === 'en'
      ? 'This will delete your name, grade, settings and all lesson progress. Continue?'
      : 'Hii itafuta jina, darasa, mipangilio na maendeleo yote. Endelea?'
    )) {
      resetAll()
      showNotification(language === 'en' ? 'All data cleared' : 'Data yote imefutwa', 'success')
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          {language === 'en' ? 'Settings' : 'Mipangilio'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {language === 'en' ? 'Customize your experience' : 'Badilisha matumizi yako'}
        </p>
      </div>

      {/* Identity */}
      <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
          {language === 'en' ? 'Identity' : 'Utambulisho'}
        </h2>

        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
          {language === 'en' ? 'Your name' : 'Jina lako'}
        </label>
        <div className="flex gap-2">
          <input
            value={draftName}
            onChange={e => setDraftName(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder={language === 'en' ? 'Enter your name' : 'Andika jina lako'}
          />
          <button
            onClick={saveName}
            disabled={draftName === name}
            className="px-5 py-2.5 text-white text-sm font-semibold rounded-xl disabled:opacity-40"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {language === 'en' ? 'Save' : 'Hifadhi'}
          </button>
        </div>
      </section>

      {/* Grade */}
      <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
          {language === 'en' ? 'Grade' : 'Darasa'}
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {GRADES.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGrade(g.id)}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${
                selectedGrade === g.id
                  ? 'text-white scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              style={selectedGrade === g.id ? { backgroundColor: 'var(--accent)' } : {}}
            >
              {g.id}
            </button>
          ))}
        </div>
      </section>

      {/* Appearance */}
      <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
          {language === 'en' ? 'Appearance' : 'Mwonekano'}
        </h2>

        {/* Accent color */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
            {language === 'en' ? 'Accent color' : 'Rangi'}
          </label>
          <div className="flex gap-3">
            {Object.entries(ACCENT_COLORS).map(([key, color]) => (
              <button
                key={key}
                onClick={() => setAccent(key)}
                className={`w-10 h-10 rounded-full transition-all hover:scale-110 ${
                  accent === key ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800' : ''
                }`}
                style={{
                  backgroundColor: color.hex,
                  ringColor: color.hex,
                }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
            {language === 'en' ? 'Theme' : 'Mandhari'}
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(false)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                !darkMode
                  ? 'text-white'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500'
              }`}
              style={!darkMode ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
            >
              {language === 'en' ? 'Light' : 'Mwanga'}
            </button>
            <button
              onClick={() => setDarkMode(true)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                darkMode
                  ? 'text-white'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500'
              }`}
              style={darkMode ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
            >
              {language === 'en' ? 'Dark' : 'Giza'}
            </button>
          </div>
        </div>
      </section>

      {/* Language */}
      <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
          {language === 'en' ? 'Language' : 'Lugha'}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
              language === 'en' ? 'text-white' : 'border-gray-200 dark:border-gray-700 text-gray-500'
            }`}
            style={language === 'en' ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('sw')}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
              language === 'sw' ? 'text-white' : 'border-gray-200 dark:border-gray-700 text-gray-500'
            }`}
            style={language === 'sw' ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
          >
            Kiswahili
          </button>
        </div>
      </section>

      {/* Data */}
      <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
          {language === 'en' ? 'Data' : 'Data'}
        </h2>

        <button
          onClick={exportData}
          className="w-full py-3 mb-3 rounded-xl text-sm font-semibold border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {language === 'en' ? 'Export my progress' : 'Hamisha maendeleo yangu'}
        </button>

        <button
          onClick={handleReset}
          className="w-full py-3 rounded-xl text-sm font-semibold border-2 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          {language === 'en' ? 'Clear all data' : 'Futa data yote'}
        </button>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 leading-relaxed">
          {language === 'en'
            ? 'Your data is stored on this device only. Export to back it up.'
            : 'Data yako imehifadhiwa kwenye kifaa hiki tu. Hamisha ili kuihifadhi.'}
        </p>
      </section>
    </div>
  )
}

export default ProfileView