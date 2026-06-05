import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, CHARACTERS } from '../../context/AppContext'
import { CURRICULUM } from '../../data/curriculum'

const getLessonInfo = (lessonId) => {
  for (const [subjectId, subject] of Object.entries(CURRICULUM)) {
    for (const strand of subject.strands) {
      for (const sub of strand.subStrands) {
        if (sub.id === lessonId) {
          return { name: sub.name, subjectId, strandId: strand.id }
        }
      }
    }
  }
  return { name: lessonId, subjectId: null, strandId: null }
}

const getGradeFromSubject = (subjectId) => {
  if (!subjectId) return 4
  const match = subjectId.match(/-(\d)$/)
  return match ? Number(match[1]) : 4
}

const ProfileView = () => {
  const navigate = useNavigate()
  const { name, selectedGrade, language, stats, progress, character, bookmarks } = useApp()

  const displayName = name || (language === 'en' ? 'Student' : 'Mwanafunzi')
  const ch = CHARACTERS[character] || CHARACTERS.lion

  const recentLessons = Object.entries(progress)
    .sort(([, a], [, b]) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    .slice(0, 5)

  const bookmarkedLessons = bookmarks.slice(0, 5).map(id => ({
    id,
    info: getLessonInfo(id),
  }))

  const openLesson = (id) => {
    const info = getLessonInfo(id)
    if (!info.subjectId) return
    const grade = getGradeFromSubject(info.subjectId)
    const params = new URLSearchParams({
      grade,
      subject: info.subjectId,
      strand: info.strandId,
      lesson: id,
    })
    navigate(`/curriculum?${params.toString()}`)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* Header card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl bg-gray-100 dark:bg-gray-700 flex-shrink-0">
          {ch.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white truncate">
            {displayName}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {language === 'en' ? 'Grade' : 'Darasa'} {selectedGrade} · {language === 'en' ? ch.name : ch.nameSw}
          </p>
        </div>
        <button
          onClick={() => navigate('/settings')}
          className="text-sm font-semibold hover:underline flex-shrink-0"
          style={{ color: 'var(--accent)' }}
        >
          {language === 'en' ? 'Edit' : 'Hariri'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-gray-900 dark:text-white">{stats.completed}</div>
          <div className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
            {language === 'en' ? 'Completed' : 'Imekamilika'}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-gray-900 dark:text-white">{stats.attempted}</div>
          <div className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
            {language === 'en' ? 'Attempted' : 'Majaribio'}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black" style={{ color: 'var(--accent)' }}>{stats.mastery}%</div>
          <div className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
            {language === 'en' ? 'Mastery' : 'Ujuzi'}
          </div>
        </div>
      </div>

      {/* Bookmarks */}
      {bookmarkedLessons.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 px-1">
            ★ {language === 'en' ? 'Bookmarks' : 'Vialamisho'}
          </h2>
          <div className="space-y-2">
            {bookmarkedLessons.map(({ id, info }) => (
              <button
                key={id}
                onClick={() => openLesson(id)}
                className="w-full flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 text-left transition-colors"
              >
                <span style={{ color: 'var(--accent)' }}>★</span>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate flex-1">
                  {info.name}
                </p>
                <span className="text-gray-300 dark:text-gray-600">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent activity */}
      {recentLessons.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 px-1">
            {language === 'en' ? 'Recent Activity' : 'Shughuli'}
          </h2>
          <div className="space-y-2">
            {recentLessons.map(([lessonId, data]) => {
              const info = getLessonInfo(lessonId)
              return (
                <button
                  key={lessonId}
                  onClick={() => openLesson(lessonId)}
                  className="w-full flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 text-left transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    data.status === 'completed' ? 'bg-emerald-500' : 'bg-orange-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                      {info.name}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 flex-shrink-0">
                    {data.bestScore || data.score || 0}%
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {recentLessons.length === 0 && bookmarkedLessons.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
          {language === 'en' ? 'Your activity will appear here.' : 'Shughuli yako itaonekana hapa.'}
        </div>
      )}
    </div>
  )
}

export default ProfileView