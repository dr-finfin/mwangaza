import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { CURRICULUM } from '../../data/curriculum'

const getLessonName = (lessonId) => {
  for (const subject of Object.values(CURRICULUM)) {
    for (const strand of subject.strands) {
      for (const sub of strand.subStrands) {
        if (sub.id === lessonId) return sub.name
      }
    }
  }
  return lessonId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const BentoGrid = () => {
  const navigate = useNavigate()
  const { name, selectedGrade, setSelectedGrade, language, progress, stats, t } = useApp()

  const today = new Date().toLocaleDateString('en-KE', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  const recentLessons = Object.entries(progress)
    .sort(([, a], [, b]) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    .slice(0, 3)

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade)
    navigate('/curriculum')
  }

  return (
    <div>

      {/* Welcome */}
      <div className="mb-6 sm:mb-8">
        <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm">{today}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
          {language === 'en' ? 'Welcome' : 'Karibu'}{name ? `, ${name.split(' ')[0]}` : ''}
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div className="text-white rounded-2xl p-4 sm:p-5" style={{ backgroundColor: 'var(--accent)' }}>
          <p className="text-white/80 text-xs font-medium mb-1">{t('lessonsCompleted')}</p>
          <p className="text-3xl sm:text-4xl font-black">{stats.completed}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-5">
          <p className="text-gray-400 text-xs font-medium mb-1">{t('masteryScore')}</p>
          <p className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">{stats.mastery}%</p>
          <div className="mt-2 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${stats.mastery}%`, backgroundColor: 'var(--accent)' }} />
          </div>
        </div>
      </div>

      {/* Grade + CTA */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-5 mb-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <p className="text-gray-400 text-xs font-medium mb-0.5">{t('grade')}</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              {language === 'en' ? 'Grade' : 'Darasa'} {selectedGrade}
            </p>
          </div>
        </div>

        {/* Grade switcher — full row on mobile */}
        <div className="grid grid-cols-9 gap-1.5 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(g => (
            <button
              key={g}
              onClick={() => handleGradeClick(g)}
              className={`aspect-square rounded-lg text-xs sm:text-sm font-bold transition-all ${
                selectedGrade === g
                  ? 'text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              style={selectedGrade === g ? { backgroundColor: 'var(--accent)' } : {}}
            >
              {g}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/curriculum')}
          className="w-full py-3 text-white font-semibold rounded-xl text-sm"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          {language === 'en' ? 'Start Learning' : 'Anza Kujifunza'}
        </button>
      </div>

      {/* Recent */}
      {recentLessons.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {language === 'en' ? 'Recent Lessons' : 'Masomo ya Hivi Karibuni'}
            </p>
            <button
              onClick={() => navigate('/curriculum')}
              className="text-xs font-medium hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              {language === 'en' ? 'View all' : 'Ona yote'}
            </button>
          </div>

          <div className="space-y-2">
            {recentLessons.map(([lessonId, data]) => (
              <div key={lessonId} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  data.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {getLessonName(lessonId)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {data.bestScore || data.score || 0}% · {data.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {recentLessons.length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 text-center mb-4">
          <p className="text-gray-600 dark:text-gray-300 font-semibold text-sm mb-1">
            {language === 'en' ? 'No lessons yet' : 'Hakuna masomo bado'}
          </p>
          <p className="text-gray-400 text-xs">
            {language === 'en' ? 'Tap Start Learning to begin.' : 'Bonyeza Anza Kujifunza.'}
          </p>
        </div>
      )}

      {/* Quote */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          {language === 'en' ? 'Daily Quote' : 'Nukuu ya Leo'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
          {language === 'en'
            ? '"Education is the most powerful weapon which you can use to change the world." — Nelson Mandela'
            : '"Elimu ni silaha yenye nguvu zaidi unayoweza kutumia kubadilisha ulimwengu." — Nelson Mandela'}
        </p>
      </div>
    </div>
  )
}

export default BentoGrid