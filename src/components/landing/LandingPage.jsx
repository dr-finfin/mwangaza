import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { GRADES } from '../../data/curriculum'

const LandingPage = () => {
  const { language, setLanguage, darkMode, setDarkMode, setSelectedGrade } = useApp()
  const navigate = useNavigate()

  const handleGradeClick = (gradeId) => {
    setSelectedGrade(gradeId)
    navigate('/curriculum')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/mwangaza_icon.png" alt="Mwangaza" className="w-8 h-8 rounded-lg" />
            <div className="font-black text-lg tracking-tight text-gray-900 dark:text-white">
              MWANGAZA
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {language === 'en' ? 'SW' : 'EN'}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {darkMode ? 'Light' : 'Dark'}
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-1.5 text-white text-xs font-semibold rounded-lg"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col justify-center pt-16">
        <div className="max-w-6xl mx-auto w-full px-6 py-16 sm:py-24">

          <div className="max-w-3xl mb-20">
            <h1 className="text-6xl sm:text-7xl lg:text-[6rem] font-black leading-[0.9] tracking-tighter mb-6 text-gray-900 dark:text-white">
              {language === 'en' ? (
                <>Free education<br />for every<br /><span style={{ color: 'var(--accent)' }}>Kenyan student.</span></>
              ) : (
                <>Elimu bure<br />kwa kila<br /><span style={{ color: 'var(--accent)' }}>mwanafunzi.</span></>
              )}
            </h1>

            <p className="text-lg leading-relaxed max-w-lg mb-6 text-gray-500 dark:text-gray-400">
              {language === 'en'
                ? 'KICD-aligned lessons and quizzes. Grade 1 to 9. No account needed.'
                : 'Masomo na maswali ya KICD. Darasa la 1 hadi 9. Hakuna akaunti.'}
            </p>

            <p className="text-xs text-gray-400 dark:text-gray-600">
              {language === 'en' ? 'No account. No sign in. Free forever.' : 'Hakuna akaunti. Bure milele.'}
            </p>
          </div>

          {/* Grade selector — no emojis */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-5 text-gray-400 dark:text-gray-500">
              {language === 'en' ? 'Pick your grade' : 'Chagua darasa lako'}
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
              {GRADES.map(grade => (
                <button
                  key={grade.id}
                  onClick={() => handleGradeClick(grade.id)}
                  className="flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600"
                >
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    {grade.id}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Grade' : 'Darasa'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/mwangaza_icon.png" alt="Mwangaza" className="w-5 h-5 rounded" />
            <span className="font-black text-xs tracking-tight text-gray-900 dark:text-white">
              MWANGAZA
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            {language === 'en' ? 'Free forever · KICD aligned' : 'Bure milele · KICD'}
          </p>
          <span className="text-xs text-gray-400 dark:text-gray-600">© 2025</span>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage