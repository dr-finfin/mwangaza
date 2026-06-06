import React, { useState } from 'react'
import { useApp, ACCENT_COLORS, CHARACTERS } from '../../context/AppContext'
import { GRADES } from '../../data/curriculum'

const SettingsView = () => {
  const {
    name, setName,
    selectedGrade, setSelectedGrade,
    language, setLanguage,
    themeMode, setThemeMode,
    accent, setAccent,
    character, setCharacter,
    exportData, resetAll,
    showNotification,
    installAvailable, isInstalled, triggerInstall,
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

  const handleInstall = async () => {
    const result = await triggerInstall()
    if (!result.available) {
      showNotification(
        language === 'en'
          ? 'Install option not available in this browser'
          : 'Chaguo la kusakinisha halipatikani kwenye kivinjari hiki',
        'info'
      )
    }
  }

  const themeOptions = [
    { key: 'light', en: 'Light', sw: 'Mwanga' },
    { key: 'dark',  en: 'Dark',  sw: 'Giza' },
    { key: 'auto',  en: 'Auto',  sw: 'Otomatiki' },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-10">

      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          {language === 'en' ? 'Settings' : 'Mipangilio'}
        </h1>
      </div>

      {/* ── YOU ─────────────────────────────────────────── */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-1">
          {language === 'en' ? 'You' : 'Wewe'}
        </h2>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl divide-y divide-gray-100 dark:divide-gray-700">

          <div className="p-5">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
              {language === 'en' ? 'Name' : 'Jina'}
            </label>
            <div className="flex gap-2">
              <input
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 font-medium focus:outline-none"
                placeholder={language === 'en' ? 'Your name' : 'Jina lako'}
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
          </div>

          <div className="p-5">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              {language === 'en' ? 'Character' : 'Mhusika'}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(CHARACTERS).map(([key, ch]) => (
                <button
                  key={key}
                  onClick={() => setCharacter(key)}
                  className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 transition-all ${
                    character === key
                      ? 'text-white'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  style={character === key ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
                >
                  <span className="text-2xl">{ch.emoji}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    character === key ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {language === 'en' ? ch.name : ch.nameSw}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-5">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              {language === 'en' ? 'Grade' : 'Darasa'}
            </label>
            <div className="grid grid-cols-9 gap-1.5">
              {GRADES.map(g => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGrade(g.id)}
                  className={`aspect-square rounded-lg text-sm font-bold transition-all ${
                    selectedGrade === g.id
                      ? 'text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  style={selectedGrade === g.id ? { backgroundColor: 'var(--accent)' } : {}}
                >
                  {g.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── APPEARANCE ─────────────────────────────────── */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-1">
          {language === 'en' ? 'Appearance' : 'Mwonekano'}
        </h2>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl divide-y divide-gray-100 dark:divide-gray-700">

          <div className="p-5">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              {language === 'en' ? 'Color' : 'Rangi'}
            </label>
            <div className="grid grid-cols-5 gap-3">
              {Object.entries(ACCENT_COLORS).map(([key, color]) => (
                <button
                  key={key}
                  onClick={() => setAccent(key)}
                  className={`aspect-square rounded-2xl transition-all hover:scale-110 ${
                    accent === key ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="p-5">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              {language === 'en' ? 'Theme' : 'Mandhari'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setThemeMode(opt.key)}
                  className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    themeMode === opt.key ? 'text-white' : 'border-gray-200 dark:border-gray-700 text-gray-500'
                  }`}
                  style={themeMode === opt.key ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
                >
                  {language === 'en' ? opt.en : opt.sw}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              {language === 'en' ? 'Language' : 'Lugha'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  language === 'en' ? 'text-white' : 'border-gray-200 dark:border-gray-700 text-gray-500'
                }`}
                style={language === 'en' ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('sw')}
                className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  language === 'sw' ? 'text-white' : 'border-gray-200 dark:border-gray-700 text-gray-500'
                }`}
                style={language === 'sw' ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
              >
                Kiswahili
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── APP (install) ─────────────────────────────── */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-1">
          {language === 'en' ? 'App' : 'Programu'}
        </h2>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5">

          {isInstalled ? (
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                ✓
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {language === 'en' ? 'Mwangaza is installed' : 'Mwangaza imesakinishwa'}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {language === 'en'
                    ? 'You can use it offline from your home screen.'
                    : 'Unaweza kuitumia bila mtandao kutoka skrini ya nyumbani.'}
                </p>
              </div>
            </div>
          ) : installAvailable ? (
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {language === 'en' ? 'Install Mwangaza' : 'Sakinisha Mwangaza'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                {language === 'en'
                  ? 'Add Mwangaza to your home screen for quick access and offline study.'
                  : 'Ongeza Mwangaza kwenye skrini ya nyumbani kwa ufikiaji wa haraka na masomo nje ya mtandao.'}
              </p>
              <button
                onClick={handleInstall}
                className="w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {language === 'en' ? 'Install App' : 'Sakinisha Programu'}
              </button>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {language === 'en' ? 'Install not available' : 'Usakinishaji haupatikani'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {language === 'en'
                  ? 'Your browser does not support one-click install. Use your browser menu to "Add to Home Screen".'
                  : 'Kivinjari chako hakitumii usakinishaji wa mbofyo mmoja. Tumia menyu ya kivinjari kuongeza kwenye skrini ya nyumbani.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── DATA ─────────────────────────────────────── */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-1">
          {language === 'en' ? 'Data' : 'Data'}
        </h2>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl divide-y divide-gray-100 dark:divide-gray-700">
          <button
            onClick={exportData}
            className="w-full p-5 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            {language === 'en' ? 'Export my progress' : 'Hamisha maendeleo yangu'}
          </button>

          <button
            onClick={handleReset}
            className="w-full p-5 text-left text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            {language === 'en' ? 'Clear all data' : 'Futa data yote'}
          </button>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 px-1 leading-relaxed">
          {language === 'en'
            ? 'Your data is stored on this device only.'
            : 'Data yako imehifadhiwa kwenye kifaa hiki tu.'}
        </p>
      </div>
    </div>
  )
}

export default SettingsView