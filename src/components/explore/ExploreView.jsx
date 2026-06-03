import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { GRADES, getSubjectsForGrade, CURRICULUM } from '../../data/curriculum'
import { motion } from 'framer-motion'
import QuizEngine from '../quiz/QuizEngine'

const ExploreView = () => {
  const { t, language, saveLessonProgress } = useApp()

  const [selectedGrade,   setSelectedGrade]   = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedLesson,  setSelectedLesson]  = useState(null)
  const [activeTab,       setActiveTab]       = useState('video')

  // ── Lesson View ───────────────────────────────────────────────
  if (selectedLesson) {
    const { lesson, subject } = selectedLesson

    return (
      <div className="animate-fade-in max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={() => { setSelectedLesson(null); setActiveTab('video') }}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium mb-6 transition-colors"
        >
          ← Back to {subject?.name}
        </button>

        {/* Lesson header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {subject?.name}
            </span>
            <span className="text-gray-200 dark:text-gray-700">·</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              lesson.difficulty === 'Beginner'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-amber-50 text-amber-600'
            }`}>
              {lesson.difficulty}
            </span>
            <span className="text-gray-200 dark:text-gray-700">·</span>
            <span className="text-xs text-gray-400">{lesson.duration}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            {lesson.name}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-8">
          {[
            { id: 'video', label: language === 'en' ? 'Video' : 'Video' },
            { id: 'quiz',  label: language === 'en' ? 'Quiz'  : 'Maswali' },
            { id: 'notes', label: language === 'en' ? 'Notes' : 'Maelezo' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Video */}
        {activeTab === 'video' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {lesson.videoUrl ? (
              <div
                className="relative w-full bg-gray-900 rounded-2xl overflow-hidden mb-8"
                style={{ paddingBottom: '56.25%' }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={lesson.videoUrl}
                  title={lesson.name}
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-8" style={{ height: '280px' }}>
                <div className="text-center">
                  <p className="text-2xl mb-2">🚧</p>
                  <p className="text-gray-500 text-sm font-medium">Video coming soon</p>
                </div>
              </div>
            )}

            {lesson.outcomes?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  {t('whatYouWillLearn')}
                </h2>
                <ul className="space-y-2">
                  {lesson.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {lesson.quiz?.length > 0 && (
              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
              >
                {language === 'en' ? 'Take the Quiz →' : 'Fanya Maswali →'}
              </button>
            )}
          </motion.div>
        )}

        {/* Quiz */}
        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {lesson.quiz?.length > 0 ? (
              <QuizEngine
                quiz={lesson.quiz}
                lessonId={lesson.id}
                onComplete={({ score, passed }) => {
                  saveLessonProgress(lesson.id, score, passed)
                }}
              />
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl mb-2">🚧</p>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {language === 'en' ? 'Quiz coming soon' : 'Maswali yanakuja hivi karibuni'}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Notes */}
        {activeTab === 'notes' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {lesson.outcomes?.length > 0 ? (
              lesson.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-l-4 border-blue-500"
                >
                  <span className="text-xs font-black text-blue-500 font-mono mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {outcome}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-sm">
                  {language === 'en' ? 'No notes available yet' : 'Hakuna maelezo bado'}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    )
  }

  // ── Subject lesson list ───────────────────────────────────────
  if (selectedSubject) {
    const curriculumData = CURRICULUM[selectedSubject.id]

    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setSelectedSubject(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium mb-6 transition-colors"
        >
          ← {language === 'en' ? `Grade ${selectedGrade} Subjects` : `Masomo ya Darasa ${selectedGrade}`}
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 bg-gradient-to-br ${selectedSubject.color} rounded-xl flex items-center justify-center text-2xl`}>
            {selectedSubject.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              {selectedSubject.name}
            </h1>
            <p className="text-gray-400 text-sm">
              Grade {selectedGrade} · KICD Aligned
            </p>
          </div>
        </div>

        {!curriculumData ? (
          <div className="text-center py-20">
            <p className="text-3xl mb-4">🚧</p>
            <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-2">
              {language === 'en' ? 'Content Coming Soon' : 'Maudhui Yanakuja Hivi Karibuni'}
            </h3>
            <p className="text-gray-400 text-sm">
              {language === 'en'
                ? 'Our team is preparing this subject.'
                : 'Timu yetu inaandaa somo hili.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {curriculumData.strands.map((strand, si) => (
              <div key={strand.id}>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Strand {si + 1} · {strand.name}
                </h2>
                <div className="space-y-2">
                  {strand.subStrands.map((sub, ssi) => (
                    <motion.button
                      key={sub.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: ssi * 0.04 }}
                      onClick={() => setSelectedLesson({ lesson: sub, subject: selectedSubject })}
                      className="w-full flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-blue-200 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all text-left"
                    >
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {ssi + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                          {sub.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <span className="text-xs text-gray-400">{sub.duration}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            sub.difficulty === 'Beginner'
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}>
                            {sub.difficulty}
                          </span>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Subject grid ─────────────────────────────────────────────
  if (selectedGrade) {
    const subjects = getSubjectsForGrade(selectedGrade)

    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setSelectedGrade(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium mb-6 transition-colors"
        >
          ← {language === 'en' ? 'All Grades' : 'Madarasa Yote'}
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Grade {selectedGrade}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {subjects.length} {language === 'en' ? 'subjects' : 'masomo'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject, i) => (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedSubject(subject)}
              className="text-left p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {subject.emoji}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                {subject.name}
              </h3>
              <p className="text-gray-400 text-xs">
                {subject.strands} {language === 'en' ? 'strands' : 'nyuzi'}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    )
  }

  // ── Grade selection ──────────────────────────────────────────
  return (
    <div className="animate-fade-in">

      <div className="mb-10">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">
          {language === 'en' ? 'Explore the Curriculum' : 'Chunguza Mtaala'}
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          {language === 'en'
            ? 'Browse all KICD-aligned lessons. No account needed.'
            : 'Angalia masomo yote ya KICD. Hakuna akaunti inayohitajika.'}
        </p>
      </div>

      {/* Grade grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 mb-14">
        {GRADES.map((grade, i) => (
          <motion.button
            key={grade.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelectedGrade(grade.id)}
            className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all"
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${grade.color} rounded-xl flex items-center justify-center text-lg shadow-sm`}>
              {grade.emoji}
            </div>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
              G{grade.id}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Featured lessons */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          {language === 'en' ? 'Featured Lessons' : 'Masomo Maalum'}
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { grade: 4, subject: 'Mathematics',        lesson: 'Whole Numbers up to 999,999', duration: '12 min', emoji: '🔢' },
            { grade: 4, subject: 'Integrated Science', lesson: 'Parts of a Plant',            duration: '14 min', emoji: '🔬' },
            { grade: 7, subject: 'Mathematics',        lesson: 'Linear Equations',            duration: '18 min', emoji: '🔢' },
            { grade: 4, subject: 'Mathematics',        lesson: 'Length',                      duration: '10 min', emoji: '📏' },
          ].map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelectedGrade(item.grade)}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-blue-200 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all text-left"
            >
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                  {item.lesson}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                  Grade {item.grade} · {item.subject} · {item.duration}
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg flex-shrink-0">
                G{item.grade}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExploreView