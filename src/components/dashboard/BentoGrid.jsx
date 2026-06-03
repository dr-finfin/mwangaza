import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const QuoteCard = ({ language }) => {
  const quotes = {
    en: [
      '"Education is the most powerful weapon which you can use to change the world." — Nelson Mandela',
      '"The roots of education are bitter, but the fruit is sweet." — Aristotle',
      '"Live as if you were to die tomorrow. Learn as if you were to live forever." — Gandhi',
    ],
    sw: [
      '"Elimu ni silaha yenye nguvu zaidi unayoweza kutumia kubadilisha ulimwengu." — Nelson Mandela',
      '"Mizizi ya elimu ni chungu, lakini matunda yake ni tamu." — Aristotle',
      '"Ishi kana kwamba utakufa kesho. Jifunze kana kwamba utaishi milele." — Gandhi',
    ],
  }
  const list = quotes[language] || quotes.en
  const quote = list[Math.floor(Date.now() / 86400000) % list.length]

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Daily Quote
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
        {quote}
      </p>
    </div>
  )
}

const BentoGrid = () => {
  const navigate  = useNavigate()
  const { t, progress, selectedGrade, setSelectedGrade, language } = useApp()

  const studentName = localStorage.getItem('mwangaza_name') || 'Scholar'

  const completed = Object.values(progress).filter(p => p.status === 'completed').length
  const scored    = Object.values(progress).filter(p => p.best_score)
  const mastery   = scored.length
    ? Math.round(scored.reduce((sum, p) => sum + p.best_score, 0) / scored.length)
    : 0

  const today = new Date().toLocaleDateString('en-KE', {
    weekday: 'long',
    month:   'long',
    day:     'numeric',
  })

  return (
    <div className="animate-fade-in">

      {/* Welcome */}
      <div className="mb-8">
        <p className="text-gray-400 dark:text-gray-500 text-sm">{today}</p>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
          {language === 'en' ? 'Welcome back' : 'Karibu tena'},{' '}
          <span className="text-blue-600">
            {studentName.split(' ')[0]}
          </span>
        </h1>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
          {language === 'en'
            ? 'Pick up where you left off.'
            : 'Endelea ulipoacha.'}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-4">

        {/* Lessons completed */}
        <div className="bg-blue-600 text-white rounded-2xl p-5">
          <p className="text-blue-200 text-xs font-medium mb-1">
            {t('lessonsCompleted')}
          </p>
          <p className="text-4xl font-black">{completed}</p>
          <p className="text-blue-200 text-xs mt-2">
            {completed === 0
              ? language === 'en' ? 'Start your first lesson' : 'Anza somo lako la kwanza'
              : language === 'en' ? 'lessons done' : 'masomo yaliyokamilika'}
          </p>
        </div>

        {/* Mastery */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5">
          <p className="text-gray-400 text-xs font-medium mb-1">
            {t('masteryScore')}
          </p>
          <p className="text-4xl font-black text-gray-900 dark:text-white">
            {mastery}%
          </p>
          <div className="mt-2 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-700"
              style={{ width: `${mastery}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grade + CTA */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 text-xs font-medium mb-0.5">
              {t('grade')}
            </p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">
              Grade {selectedGrade}
            </p>
          </div>

          {/* Grade switcher */}
          <div className="flex gap-1.5 flex-wrap justify-end max-w-[200px]">
            {[1,2,3,4,5,6,7,8,9].map(g => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  selectedGrade === g
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-600'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/curriculum')}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          {language === 'en' ? 'Start Learning →' : 'Anza Kujifunza →'}
        </button>
      </div>

      {/* Recent lessons */}
      {Object.keys(progress).length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {language === 'en' ? 'Recent Lessons' : 'Masomo ya Hivi Karibuni'}
            </p>
            <button
              onClick={() => navigate('/curriculum')}
              className="text-xs text-blue-600 font-medium hover:underline"
            >
              {language === 'en' ? 'View all →' : 'Ona yote →'}
            </button>
          </div>

          <div className="space-y-2">
            {Object.entries(progress).slice(0, 3).map(([lessonId, data]) => (
              <div
                key={lessonId}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  data.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {lessonId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {data.best_score || data.score || 0}% · {data.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {Object.keys(progress).length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center mb-4">
          <p className="text-2xl mb-2">📚</p>
          <p className="text-gray-600 dark:text-gray-300 font-semibold text-sm mb-1">
            {language === 'en' ? 'No lessons yet' : 'Hakuna masomo bado'}
          </p>
          <p className="text-gray-400 text-xs mb-4">
            {language === 'en'
              ? 'Start your first lesson to see your progress here.'
              : 'Anza somo lako la kwanza kuona maendeleo yako hapa.'}
          </p>
          <button
            onClick={() => navigate('/curriculum')}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            {language === 'en' ? 'Browse Lessons' : 'Angalia Masomo'}
          </button>
        </div>
      )}

      {/* Daily quote */}
      <QuoteCard language={language} />
    </div>
  )
}

export default BentoGrid