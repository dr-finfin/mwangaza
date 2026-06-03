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
    <div className={`min-h-screen flex flex-col ${
      darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
    }`}>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b ${
        darkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-black">M</span>
            </div>
            <div>
              <div className={`font-black text-lg tracking-tight leading-none ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                MWANGAZA
              </div>
              <div className="h-0.5 w-full mt-0.5" style={{ background: '#C9A84C' }} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                darkMode
                  ? 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {language === 'en' ? 'SW' : 'EN'}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                darkMode
                  ? 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {darkMode ? 'Light' : 'Dark'}
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700"
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
            <h1 className={`text-6xl sm:text-7xl lg:text-[6rem] font-black leading-[0.9] tracking-tighter mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {language === 'en' ? (
                <>Free education<br />for every<br /><span className="text-blue-600">Kenyan student.</span></>
              ) : (
                <>Elimu bure<br />kwa kila<br /><span className="text-blue-600">mwanafunzi.</span></>
              )}
            </h1>

            <p className={`text-lg leading-relaxed max-w-lg ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {language === 'en'
                ? 'KICD-aligned lessons and quizzes. Grade 1 to 9. No account needed.'
                : 'Masomo na maswali ya KICD. Darasa la 1 hadi 9. Hakuna akaunti.'}
            </p>
          </div>

          {/* Grade selector */}
          <div>
            <h2 className={`text-sm font-bold uppercase tracking-wider mb-5 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {language === 'en' ? 'Pick your grade' : 'Chagua darasa lako'}
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
              {GRADES.map(grade => (
                <button
                  key={grade.id}
                  onClick={() => handleGradeClick(grade.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 ${
                    darkMode
                      ? 'bg-gray-900 border-gray-800 hover:border-blue-500 hover:bg-gray-800'
                      : 'bg-white border-gray-100 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${grade.color} rounded-xl flex items-center justify-center text-lg shadow-sm`}>
                    {grade.emoji}
                  </div>
                  <span className={`text-xs font-bold ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Grade {grade.id}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t py-6 ${
        darkMode ? 'border-gray-800' : 'border-gray-100'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-black">M</span>
            </div>
            <span className={`font-black text-xs tracking-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              MWANGAZA
            </span>
          </div>

          <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            {language === 'en' ? 'Free forever · KICD aligned' : 'Bure milele · KICD'}
          </p>

          <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            © 2026
          </span>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage