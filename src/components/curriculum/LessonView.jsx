import React, { useState, useEffect } from 'react'
import QuizEngine from '../quiz/QuizEngine'
import { useApp } from '../../context/AppContext'

const LessonView = ({ lesson, subject, onBack, onComplete }) => {
  const { t, progress, language, toggleBookmark, isBookmarked, setLastLesson } = useApp()
  const [activeTab, setActiveTab] = useState('video')

  const lessonProgress = progress[lesson.id]
  const isCompleted    = lessonProgress?.status === 'completed'
  const hasQuiz        = lesson.quiz && lesson.quiz.length > 0
  const hasVideo       = !!lesson.videoUrl
  const bookmarked     = isBookmarked(lesson.id)

  // Track last lesson opened
  useEffect(() => {
    // Try to find subject's grade
    let grade = 4
    if (subject?.id?.endsWith('-1')) grade = 1
    else if (subject?.id?.endsWith('-4')) grade = 4
    else if (subject?.id?.endsWith('-7')) grade = 7

    setLastLesson({
      lessonId:  lesson.id,
      subjectId: subject?.id,
      strandId:  null, // optional
      grade,
    })
  }, [lesson.id])

  return (
    <div className="max-w-4xl mx-auto">

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium text-sm mb-6 transition-colors"
      >
        ← Back to {language === 'en' ? subject?.name : subject?.kiswahili}
      </button>

      {/* Lesson header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {language === 'en' ? subject?.name : subject?.kiswahili}
            </span>
            <span className="text-gray-200 dark:text-gray-700">·</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              lesson.difficulty === 'Beginner'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
            }`}>
              {lesson.difficulty}
            </span>
            <span className="text-gray-200 dark:text-gray-700">·</span>
            <span className="text-xs text-gray-400">{lesson.duration}</span>
            {isCompleted && (
              <>
                <span className="text-gray-200 dark:text-gray-700">·</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  ✓ Completed
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
            {language === 'en' ? lesson.name : lesson.kiswahili}
          </h1>
        </div>

        {/* Bookmark */}
        <button
          onClick={() => toggleBookmark(lesson.id)}
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
            bookmarked
              ? 'text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          style={bookmarked ? { backgroundColor: 'var(--accent)' } : {}}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
          title={bookmarked
            ? (language === 'en' ? 'Remove bookmark' : 'Ondoa alama')
            : (language === 'en' ? 'Bookmark' : 'Hifadhi')}
        >
          {bookmarked ? '★' : '☆'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          onClick={() => setActiveTab('video')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
            activeTab === 'video'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          style={activeTab === 'video' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
        >
          {language === 'en' ? 'Video' : 'Video'}
        </button>

        {hasQuiz && (
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
              activeTab === 'quiz' ? '' : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            style={activeTab === 'quiz' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
          >
            {language === 'en' ? 'Quiz' : 'Maswali'}
            {isCompleted && (
              <span className="ml-2 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full">
                ✓
              </span>
            )}
          </button>
        )}

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
            activeTab === 'notes' ? '' : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          style={activeTab === 'notes' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
        >
          {language === 'en' ? 'Notes' : 'Maelezo'}
        </button>
      </div>

      {/* VIDEO */}
      {activeTab === 'video' && (
        <div>
          {hasVideo ? (
            <div className="relative w-full bg-gray-900 rounded-2xl overflow-hidden mb-8" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={lesson.videoUrl}
                title={lesson.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center py-24 mb-8">
              <p className="font-bold text-gray-700 dark:text-gray-300 text-lg">
                {language === 'en' ? 'Video coming soon' : 'Video inakuja hivi karibuni'}
              </p>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              {t('whatYouWillLearn')}
            </h2>
            <ul className="space-y-3">
              {lesson.outcomes?.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 text-white"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {hasQuiz && (
            <button
              onClick={() => setActiveTab('quiz')}
              className="w-full py-4 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {isCompleted ? (language === 'en' ? 'Retake the Quiz →' : 'Rudia Maswali →') : (language === 'en' ? 'Take the Quiz →' : 'Fanya Maswali →')}
            </button>
          )}
        </div>
      )}

      {/* QUIZ */}
      {activeTab === 'quiz' && hasQuiz && (
        <div>
          <QuizEngine
            quiz={lesson.quiz}
            lessonId={lesson.id}
            onComplete={(result) => {
              onComplete?.(result)
              if (result.passed) {
                setTimeout(() => setActiveTab('video'), 2000)
              }
            }}
          />
        </div>
      )}

      {/* NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-3">
          {lesson.outcomes?.map((outcome, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-l-4"
              style={{ borderColor: 'var(--accent)' }}
            >
              <span className="text-xs font-black font-mono mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{outcome}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LessonView