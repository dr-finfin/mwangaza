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

const BentoGrid = () => {
  const navigate = useNavigate()
  const {
    name, selectedGrade, language, progress, stats,
    bookmarks, lastLesson, character,
  } = useApp()

  const ch = CHARACTERS[character] || CHARACTERS.lion

  const today = new Date().toLocaleDateString('en-KE', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  // This week's lessons
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const thisWeekCount = Object.values(progress).filter(
    p => p.status === 'completed' && new Date(p.updatedAt).getTime() > oneWeekAgo
  ).length

  const recentLessons = Object.entries(progress)
    .sort(([, a], [, b]) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    .slice(0, 3)

  const bookmarkedLessons = bookmarks.slice(0, 3).map(id => ({
    id,
    info: getLessonInfo(id),
  }))

  const openLastLesson = () => {
    if (!lastLesson) return
    const params = new URLSearchParams({
      grade: lastLesson.grade,
      subject: lastLesson.subjectId,
      strand: lastLesson.strandId || '',
      lesson: lastLesson.lessonId,
    })
    navigate(`/curriculum?${params.toString()}`)
  }

  const openBookmark = (id) => {
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

  const hasAnything = lastLesson || recentLessons.length > 0 || bookmarks.length > 0

  return (
    <div className="space-y-6">

      {/* Welcome */}
      <div>
        <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm">{today}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
          {language === 'en' ? 'Welcome' : 'Karibu'}{name ? `, ${name.split(' ')[0]}` : ''}
        </h1>
      </div>

      {/* HERO: Continue where you left off */}
      {lastLesson && (
        <button
          onClick={openLastLesson}
          className="w-full p-6 sm:p-8 rounded-3xl text-left text-white hover:opacity-95 transition-opacity"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                {language === 'en' ? 'Continue where you left off' : 'Endelea ulipoacha'}
              </p>
              <p className="text-2xl sm:text-4xl font-black leading-tight mb-2">
                {getLessonInfo(lastLesson.lessonId).name}
              </p>
              <p className="text-sm sm:text-base text-white/80">
                {language === 'en' ? 'Grade' : 'Darasa'} {lastLesson.grade}
              </p>
            </div>
            <div className="text-5xl sm:text-7xl flex-shrink-0">{ch.emoji}</div>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold">
            {language === 'en' ? 'Continue →' : 'Endelea →'}
          </div>
        </button>
      )}

      {/* If no last lesson, show CTA hero */}
      {!lastLesson && (
        <button
          onClick={() => navigate('/curriculum')}
          className="w-full p-6 sm:p-8 rounded-3xl text-left text-white hover:opacity-95 transition-opacity"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                {language === 'en' ? 'Ready to learn?' : 'Uko tayari?'}
              </p>
              <p className="text-2xl sm:text-4xl font-black leading-tight mb-2">
                {language === 'en' ? 'Start your first lesson.' : 'Anza somo lako la kwanza.'}
              </p>
              <p className="text-sm text-white/80">
                {language === 'en' ? `Grade ${selectedGrade} curriculum` : `Mtaala wa Darasa ${selectedGrade}`}
              </p>
            </div>
            <div className="text-5xl sm:text-7xl flex-shrink-0">{ch.emoji}</div>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold">
            {language === 'en' ? 'Start →' : 'Anza →'}
          </div>
        </button>
      )}

      {/* Stats — compact strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4">
          <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{stats.completed}</p>
          <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
            {language === 'en' ? 'Lessons' : 'Masomo'}
          </p>
          {thisWeekCount > 0 && (
            <p className="text-[11px] mt-1 font-semibold" style={{ color: 'var(--accent)' }}>
              +{thisWeekCount} {language === 'en' ? 'this week' : 'wiki hii'}
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4">
          <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{stats.mastery}%</p>
          <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
            {language === 'en' ? 'Mastery' : 'Ujuzi'}
          </p>
          <div className="mt-2 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${stats.mastery}%`, backgroundColor: 'var(--accent)' }} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4">
          <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{bookmarks.length}</p>
          <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
            {language === 'en' ? 'Saved' : 'Vialamisho'}
          </p>
        </div>
      </div>

      {/* Bookmarks — compact */}
      {bookmarkedLessons.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 px-1">
            ★ {language === 'en' ? 'Bookmarks' : 'Vialamisho'}
          </p>
          <div className="space-y-2">
            {bookmarkedLessons.map(({ id, info }) => (
              <button
                key={id}
                onClick={() => openBookmark(id)}
                className="w-full flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 text-left transition-colors"
              >
                <span style={{ color: 'var(--accent)' }} className="text-base">★</span>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate flex-1">
                  {info.name}
                </p>
                <span className="text-gray-300 dark:text-gray-600">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent — compact */}
      {recentLessons.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 px-1">
            {language === 'en' ? 'Recent' : 'Hivi Karibuni'}
          </p>
          <div className="space-y-2">
            {recentLessons.map(([lessonId, data]) => {
              const info = getLessonInfo(lessonId)
              return (
                <div key={lessonId} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
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
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasAnything && (
        <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
          {language === 'en'
            ? 'Your activity will appear here.'
            : 'Shughuli yako itaonekana hapa.'}
        </div>
      )}
    </div>
  )
}

export default BentoGrid