import React, { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { GRADES, getSubjectsForGrade, CURRICULUM } from '../../data/curriculum'
import LessonView from './LessonView'

const GradeSelector = ({ selectedGrade, onSelect, t, language }) => (
  <div>
    <div className="mb-8">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white">{t('chooseGrade')}</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
        {language === 'en' ? 'Select your grade level to begin' : 'Chagua darasa lako kuanza'}
      </p>
    </div>

    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {GRADES.map(grade => (
        <button
          key={grade.id}
          onClick={() => onSelect(grade.id)}
          className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 ${
            selectedGrade === grade.id
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg shadow-blue-500/20'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
          }`}
        >
          <div className={`w-12 h-12 bg-gradient-to-br ${grade.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <span className="text-2xl">{grade.emoji}</span>
          </div>
          <span className={`font-bold text-sm ${
            selectedGrade === grade.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
          }`}>
            {grade.label}
          </span>
          {selectedGrade === grade.id && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">✓</div>
          )}
        </button>
      ))}
    </div>
  </div>
)

const SubjectSelector = ({ grade, onSelect, onBack, progress, t, language }) => {
  const subjects = getSubjectsForGrade(grade)

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 font-medium text-sm mb-6">
        ← {language === 'en' ? `Grade ${grade}` : `Darasa ${grade}`}
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t('chooseSubject')}</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          {language === 'en' ? `Grade ${grade}` : `Darasa ${grade}`} · {subjects.length} {language === 'en' ? 'subjects' : 'masomo'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(subject => {
          const data = CURRICULUM[subject.id]
          const allSubs = data?.strands?.flatMap(s => s.subStrands) || []
          const completed = allSubs.filter(ss => progress[ss.id]?.status === 'completed').length
          const total = allSubs.length
          const pct = total ? Math.round((completed / total) * 100) : 0

          return (
            <button
              key={subject.id}
              onClick={() => onSelect(subject)}
              className="relative text-left bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${subject.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-4`}>
                {subject.emoji}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-0.5">
                {language === 'en' ? subject.name : subject.kiswahili}
              </h3>
              <p className="text-gray-400 dark:text-gray-500 text-xs mb-4">
                {subject.strands} {language === 'en' ? 'strands' : 'nyuzi'}
              </p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">{pct}%</span>
                  <span className="text-gray-400">{completed}/{total}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${subject.color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const StrandList = ({ subject, onSelectLesson, onBack, progress, t, language }) => {
  const data = CURRICULUM[subject.id]
  const [expanded, setExpanded] = useState(null)

  if (!data) {
    return (
      <div className="text-center py-16">
        <p className="text-3xl mb-4">🚧</p>
        <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-2">
          {language === 'en' ? 'Coming Soon' : 'Inakuja Hivi Karibuni'}
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          {language === 'en' ? 'This subject is being prepared.' : 'Somo hili linaandaliwa.'}
        </p>
        <button onClick={onBack} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
          ← {language === 'en' ? 'Go Back' : 'Rudi'}
        </button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 font-medium text-sm mb-6">
        ← {language === 'en' ? subject.name : subject.kiswahili}
      </button>

      <div className={`bg-gradient-to-br ${subject.color} rounded-2xl p-6 text-white mb-8`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
            {subject.emoji}
          </div>
          <div>
            <h2 className="text-2xl font-black">{language === 'en' ? subject.name : subject.kiswahili}</h2>
            <p className="text-white/70 text-sm">{data.strands.length} strands · KICD</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.strands.map((strand, si) => {
          const isOpen = expanded === strand.id
          const done = strand.subStrands.filter(ss => progress[ss.id]?.status === 'completed').length

          return (
            <div key={strand.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : strand.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-750 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm font-bold">
                    {si + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                      {language === 'en' ? strand.name : strand.kiswahili}
                    </h3>
                    <p className="text-gray-400 text-xs">{done}/{strand.subStrands.length}</p>
                  </div>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-50 dark:divide-gray-750">
                  {strand.subStrands.map((sub, ssi) => {
                    const sp = progress[sub.id]
                    const completed = sp?.status === 'completed'
                    const attempted = sp?.status === 'attempted'

                    return (
                      <button
                        key={sub.id}
                        onClick={() => onSelectLesson(sub, subject)}
                        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-left group"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                          completed
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                            : attempted
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-500'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                        }`}>
                          {completed ? '✓' : attempted ? '▷' : ssi + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">
                            {language === 'en' ? sub.name : sub.kiswahili}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-gray-400 text-xs">{sub.duration}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              sub.difficulty === 'Beginner'
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
                            }`}>
                              {sub.difficulty}
                            </span>
                            {sp?.bestScore != null && (
                              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                Best: {sp.bestScore}%
                              </span>
                            )}
                          </div>
                        </div>

                        {completed && (
                          <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                            Done
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const CurriculumNavigator = () => {
  const { t, progress, selectedGrade, setSelectedGrade, language } = useApp()

  // If grade is already selected, skip to subjects
  const [step, setStep] = useState(selectedGrade ? 'subject' : 'grade')
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)

  // If grade changes externally (from dashboard/landing), reset to subject step
  useEffect(() => {
    if (selectedGrade && step === 'grade') {
      setStep('subject')
    }
  }, [selectedGrade])

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade)
    setStep('subject')
  }

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject)
    setStep('strands')
  }

  const handleLessonSelect = (lesson, subject) => {
    setSelectedLesson({ lesson, subject })
    setStep('lesson')
  }

  return (
    <div>
      {step === 'grade' && (
        <GradeSelector
          selectedGrade={selectedGrade || 4}
          onSelect={handleGradeSelect}
          t={t}
          language={language}
        />
      )}

      {step === 'subject' && (
        <SubjectSelector
          grade={selectedGrade}
          onSelect={handleSubjectSelect}
          onBack={() => setStep('grade')}
          progress={progress}
          t={t}
          language={language}
        />
      )}

      {step === 'strands' && selectedSubject && (
        <StrandList
          subject={selectedSubject}
          onSelectLesson={handleLessonSelect}
          onBack={() => setStep('subject')}
          progress={progress}
          t={t}
          language={language}
        />
      )}

      {step === 'lesson' && selectedLesson && (
        <LessonView
          lesson={selectedLesson.lesson}
          subject={selectedLesson.subject}
          onBack={() => setStep('strands')}
          onComplete={() => {}}
        />
      )}
    </div>
  )
}

export default CurriculumNavigator