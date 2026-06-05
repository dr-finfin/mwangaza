import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, CHARACTERS } from '../../context/AppContext'
import { CURRICULUM } from '../../data/curriculum'

const getLessonName = (lessonId) => {
  for (const subject of Object.values(CURRICULUM)) {
    for (const strand of subject.strands) {
      for (const sub of strand.subStrands) {
        if (sub.id === lessonId) return sub.name
      }
    }
  }
  return lessonId
}

const ProfileView = () => {
  const navigate = useNavigate()
  const { name, selectedGrade, language, stats, progress, character } = useApp()

  const displayName = name || (language === 'en' ? 'Student' : 'Mwanafunzi')
  const ch = CHARACTERS[character] || CHARACTERS.lion

  const recentLessons = Object.entries(progress)
    .sort(([, a], [, b]) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    .slice(0, 5)

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          {language === 'en' ? 'Profile' : 'Wasifu'}
        </h1>
        <button
          onClick={() => navigate('/settings')}
          className="text-sm font-semibold hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          {language === 'en' ? 'Edit in Settings' : 'Hariri Mipangilio'}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden">
        <div className="h-24" style={{ backgroundColor: 'var(--accent)' }} />
        <div className="px-6 pb-6">
          <div
            className="-mt-10 mb-4 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border-4 border-white dark:border-gray-800 shadow-lg"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {ch.emoji}
          </div>

          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {displayName}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {language === 'en' ? 'Grade' : 'Darasa'} {selectedGrade} · {language === 'en' ? ch.name : ch.nameSw}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 text-center">
          <div className="text-3xl font-black text-gray-900 dark:text-white">{stats.completed}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">
            {language === 'en' ? 'Completed' : 'Imekamilika'}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 text-center">
          <div className="text-3xl font-black text-gray-900 dark:text-white">{stats.attempted}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">
            {language === 'en' ? 'Attempted' : 'Majaribio'}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 text-center">
          <div className="text-3xl font-black" style={{ color: 'var(--accent)' }}>{stats.mastery}%</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">
            {language === 'en' ? 'Mastery' : 'Ujuzi'}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
          {language === 'en' ? 'Recent Activity' : 'Shughuli za Hivi Karibuni'}
        </h2>

        {recentLessons.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-6">
            {language === 'en' ? 'No lessons yet' : 'Hakuna masomo bado'}
          </p>
        ) : (
          <div className="space-y-2">
            {recentLessons.map(([lessonId, data]) => (
              <div key={lessonId} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  data.status === 'completed' ? 'bg-emerald-500' : 'bg-orange-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {getLessonName(lessonId)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {data.bestScore || data.score || 0}% · {data.attempts} {language === 'en' ? 'attempts' : 'majaribio'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileView