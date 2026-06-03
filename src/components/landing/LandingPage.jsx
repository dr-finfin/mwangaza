import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const LandingPage = () => {
  const { language, setLanguage } = useApp()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-black">M</span>
            </div>
            <div>
              <div className="font-black text-gray-900 text-lg tracking-tight leading-none">
                MWANGAZA
              </div>
              <div className="h-0.5 w-full mt-0.5" style={{ background: '#C9A84C' }} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
              className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 font-medium"
            >
              {language === 'en' ? 'Kiswahili' : 'English'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center pt-16">
        <div className="max-w-6xl mx-auto w-full px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8 text-gray-900">
              Education
              <br />
              <span className="text-blue-600">without</span>
              <br />
              barriers.
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-10">
              Mwangaza gives every Kenyan student free access to KICD-aligned lessons,
              quizzes and learning tools from Grade 1 to Grade 9.
            </p>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
            >
              Start Learning
            </button>

            <p className="mt-8 text-sm text-gray-400">
              No account. No sign in. Free forever.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">M</span>
            </div>
            <span className="font-black text-gray-900 text-sm tracking-tight">
              MWANGAZA
            </span>
          </div>

          <p className="text-gray-400 text-xs text-center">
            Free forever · KICD aligned
          </p>

          <span className="text-gray-400 text-xs">© 2025 Mwangaza</span>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage