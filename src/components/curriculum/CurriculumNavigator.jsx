import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { GRADES, getSubjectsForGrade, CURRICULUM } from '../../data/curriculum'
import LessonView from './LessonView'

const Breadcrumb = ({ items }) => (
  <nav className="flex items-center gap-1.5 text-sm mb-6 flex-wrap">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="text-gray-300 dark:text-gray-600">/</span>}
        {item.onClick ? (
          <button
            onClick={item.onClick}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
          >
            {item.label}
          </button>
        ) : (
          <span className="text-gray-900 dark:text-white font-semibold">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
)

const BackArrow = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium mb-6"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    {label}
  </button>
)

const GradeSelector = ({ selectedGrade, onSelect, language, goDashboard }) => (
  <div>
    <BackArrow onClick={goDashboard} label={language === 'en' ? 'Dashboard' : 'Nyumbani'} />

    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
      {language === 'en' ? 'Choose your grade' : 'Chagua darasa lako'}
    </h1>
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
      {language === 'en' ? 'Select a grade level to view subjects' : 'Chagua darasa kuangalia masomo'}
    </p>

    <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
      {GRADES.map(grade => (
        <button
          key={grade.id}
          onClick={() => onSelect(grade.id)}
          className={`flex flex-col items-center justify-center gap-1 py-5 rounded-2xl border-2 transition-all hover:scale-105 ${
            selectedGrade === grade.id
              ? 'text-white'
              : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
          style={selectedGrade === grade.id ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
        >
          <span className={`text-3xl font-black ${
            selectedGrade === grade.id ? 'text-white' : 'text-gray-900 dark:text-white'
          }`}>
            {grade.id}
          </span>
          <span className={`text-xs font-semibold uppercase tracking-wider ${
            selectedGrade === grade.id ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'
          }`}>
            {language === 'en' ? 'Grade' : 'Darasa'}
          </span>
        </button>
      ))}
    </div>
  </div>
)

const SubjectSelector = ({ grade, onSelect, onBack, progress, language }) => {
  const subjects = getSubjectsForGrade(grade)

  return (
    <div>
      <BackArrow onClick={onBack} label={language === 'en' ? 'Grades' : 'Madarasa'} />
      <Breadcrumb items={[
        { label: language === 'en' ? 'Grades' : 'Madarasa', onClick: onBack },
        { label: `${language === 'en' ? 'Grade' : 'Darasa'} ${grade}` },
      ]} />

      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
        {language === 'en' ? 'Choose a subject' : 'Chagua somo'}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        {subjects.length} {language === 'en' ? 'subjects' : 'masomo'}
      </p>

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
              className="text-left bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <div className="text-2xl mb-3">{subject.emoji}</div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
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
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: 'var(--accent)' }} />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Flat lesson list — strand as section headers
const LessonList = ({ subject, grade, onSelectLesson, onBack, onBackGrade, progress, language }) => {
  const data = CURRICULUM[subject.id]

  if (!data) {
    return (
      <div>
        <BackArrow onClick={onBack} label={language === 'en' ? 'Subjects' : 'Masomo'} />
        <div className="text-center py-16">
          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-2">
            {language === 'en' ? 'Coming soon' : 'Inakuja hivi karibuni'}
          </h3>
        </div>
      </div>
    )
  }

  return (
    <div>
      <BackArrow onClick={onBack} label={language === 'en' ? 'Subjects' : 'Masomo'} />
      <Breadcrumb items={[
        { label: language === 'en' ? 'Grades' : 'Madarasa', onClick: onBackGrade },
        { label: `${language === 'en' ? 'Grade' : 'Darasa'} ${grade}`, onClick: onBack },
        { label: language === 'en' ? subject.name : subject.kiswahili },
      ]} />

      <div className="flex items-center gap-3 mb-8">
        <div className="text-3xl">{subject.emoji}</div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            {language === 'en' ? subject.name : subject.kiswahili}
          </h1>
          <p className="text-gray-400 text-sm">
            {data.strands.length} {language === 'en' ? 'strands' : 'nyuzi'} · KICD
          </p>
        </div>
      </div>

      {/* Flat list grouped by strand */}
      <div className="space-y-8">
        {data.strands.map((strand, si) => (
          <div key={strand.id}>
            <div className="flex items-center gap-3 mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                {si + 1}. {language === 'en' ? strand.name : strand.kiswahili}
              </span>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
              {strand.subStrands.map((sub, ssi) => {
                const sp = progress[sub.id]
                const completed = sp?.status === 'completed'
                const attempted = sp?.status === 'attempted'

                return (
                  <button
                    key={sub.id}
                    onClick={() => onSelectLesson(sub, subject)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left transition-colors"
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
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-gray-400 text-xs">{sub.difficulty}</span>
                        {sp?.bestScore != null && (
                          <>
                            <span className="text-xs text-gray-400">·</span>
                            <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                              {sp.bestScore}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CurriculumNavigator = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { progress, selectedGrade, setSelectedGrade, language } = useApp()

  const [step, setStep] = useState(selectedGrade ? 'subject' : 'grade')
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)

  useEffect(() => {
    const gradeParam   = searchParams.get('grade')
    const subjectParam = searchParams.get('subject')
    const lessonParam  = searchParams.get('lesson')

    if (gradeParam) {
      const g = Number(gradeParam)
      setSelectedGrade(g)

      if (subjectParam) {
        const subjects = getSubjectsForGrade(g)
        const subject = subjects.find(s => s.id === subjectParam)
        if (subject) {
          setSelectedSubject(subject)

          if (lessonParam) {
            const data = CURRICULUM[subjectParam]
            if (data) {
              for (const strand of data.strands) {
                const lesson = strand.subStrands.find(ss => ss.id === lessonParam)
                if (lesson) {
                  setSelectedLesson({ lesson, subject })
                  setStep('lesson')
                  return
                }
              }
            }
          }

          setStep('lessons')
          return
        }
      }

      setStep('subject')
    }
  }, [searchParams])

  useEffect(() => {
    if (selectedGrade && step === 'grade') setStep('subject')
  }, [selectedGrade])

  const goDashboard = () => navigate('/dashboard')
  const clearParams = () => setSearchParams({})

  return (
    <div>
      {step === 'grade' && (
        <GradeSelector
          selectedGrade={selectedGrade}
          onSelect={(g) => { setSelectedGrade(g); setStep('subject'); clearParams() }}
          language={language}
          goDashboard={goDashboard}
        />
      )}

      {step === 'subject' && (
        <SubjectSelector
          grade={selectedGrade}
          onSelect={(s) => { setSelectedSubject(s); setStep('lessons') }}
          onBack={() => { setStep('grade'); clearParams() }}
          progress={progress}
          language={language}
        />
      )}

      {step === 'lessons' && selectedSubject && (
        <LessonList
          subject={selectedSubject}
          grade={selectedGrade}
          onSelectLesson={(lesson, subject) => { setSelectedLesson({ lesson, subject }); setStep('lesson') }}
          onBack={() => { setStep('subject'); clearParams() }}
          onBackGrade={() => { setStep('grade'); clearParams() }}
          progress={progress}
          language={language}
        />
      )}

      {step === 'lesson' && selectedLesson && (
        <LessonView
          lesson={selectedLesson.lesson}
          subject={selectedLesson.subject}
          onBack={() => { setStep('lessons'); clearParams() }}
          onComplete={() => {}}
        />
      )}
    </div>
  )
}

export default CurriculumNavigator