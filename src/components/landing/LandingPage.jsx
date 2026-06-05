import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, CHARACTERS } from '../../context/AppContext'
import { getSubjectsForGrade } from '../../data/curriculum'

const LandingPage = () => {
  const navigate = useNavigate()
  const { language } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [activeChar, setActiveChar] = useState('lion')

  useEffect(() => {
    const keys = Object.keys(CHARACTERS)
    const i = setInterval(() => {
      setActiveChar(prev => {
        const idx = keys.indexOf(prev)
        return keys[(idx + 1) % keys.length]
      })
    }, 2500)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sampleSubjects = [
    ...getSubjectsForGrade(1),
    ...getSubjectsForGrade(4),
    ...getSubjectsForGrade(7),
  ].slice(0, 14)

  const ch = CHARACTERS[activeChar]

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} aria-label="Mwangaza">
            <img src="/mwangaza_icon.png" alt="Mwangaza" className="w-10 h-10 rounded-xl" />
          </button>

          <button
            onClick={() => navigate('/onboarding')}
            className="px-5 py-2 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {language === 'en' ? 'Start Learning' : 'Anza Kujifunza'}
          </button>
        </div>
      </nav>

      <main className="flex-1 relative">

        {/* Soft accent glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-40 w-[800px] h-[800px] rounded-full opacity-[0.12] blur-3xl pointer-events-none"
          style={{ backgroundColor: 'var(--accent)' }}
        />

        {/* HERO — massive headline */}
        <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">

            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="text-xs font-bold uppercase tracking-wider">
                {language === 'en' ? 'Now live · Grade 1 to 9' : 'Sasa hai · Darasa 1 hadi 9'}
              </span>
            </div>

            <h1 className="text-[3.5rem] sm:text-[6rem] lg:text-[8rem] font-black leading-[0.9] tracking-[-0.04em] mb-8 max-w-6xl">
              {language === 'en' ? (
                <>
                  Free education<br />
                  for every<br />
                  <span style={{ color: 'var(--accent)' }}>Kenyan student.</span>
                </>
              ) : (
                <>
                  Elimu bure<br />
                  kwa kila<br />
                  <span style={{ color: 'var(--accent)' }}>mwanafunzi.</span>
                </>
              )}
            </h1>

            <p className="text-lg sm:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              {language === 'en'
                ? 'KICD-aligned lessons and quizzes. No account. No payment. Just learning.'
                : 'Masomo na maswali ya KICD. Hakuna akaunti. Hakuna malipo.'}
            </p>
          </div>
        </section>

        {/* CHARACTER BLOCK — full width */}
        <section className="relative px-5 sm:px-8 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto">
            <div
              className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, var(--accent), var(--accent-hover))`,
              }}
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)',
                  backgroundSize: '28px 28px',
                }}
              />

              <div className="relative grid sm:grid-cols-2 gap-8 items-center px-8 sm:px-16 py-16 sm:py-24">

                {/* Left — text */}
                <div className="text-white text-center sm:text-left">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-3">
                    {language === 'en' ? 'Step 2 of onboarding' : 'Hatua 2 ya kuanza'}
                  </p>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1] mb-4">
                    {language === 'en' ? 'Pick your character.' : 'Chagua mhusika.'}
                  </h2>
                  <p className="text-lg opacity-90 max-w-md mx-auto sm:mx-0">
                    {language === 'en'
                      ? 'Choose one of the Big 5 to be your guide on every lesson.'
                      : 'Chagua mmoja wa Watano Wakuu awe mwongozo wako.'}
                  </p>
                </div>

                {/* Right — character */}
                <div className="text-center text-white">
                  <div className="text-[10rem] sm:text-[14rem] leading-none mb-4 transition-all duration-500">
                    {ch.emoji}
                  </div>
                  <p className="text-2xl sm:text-3xl font-black mb-4">
                    {language === 'en' ? ch.name : ch.nameSw}
                  </p>
                  <div className="flex justify-center gap-2">
                    {Object.keys(CHARACTERS).map(key => (
                      <button
                        key={key}
                        onClick={() => setActiveChar(key)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          activeChar === key ? 'bg-white scale-125' : 'bg-white/30'
                        }`}
                        aria-label={key}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUBJECT STRIP — Supabase style */}
        <section className="relative pb-20 sm:pb-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
              {language === 'en' ? 'What you can learn' : 'Unachoweza kujifunza'}
            </p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              {language === 'en' ? 'Every KICD subject.' : 'Kila somo la KICD.'}
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-6 px-5 sm:px-8 scrollbar-hide">
            {sampleSubjects.map((subject, i) => (
              <button
                key={`${subject.id}-${i}`}
                onClick={() => navigate('/onboarding')}
                className="flex-shrink-0 w-56 sm:w-64 text-left p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center text-2xl shadow-sm mb-4`}>
                  {subject.emoji}
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">
                  {language === 'en' ? subject.name : subject.kiswahili}
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {subject.strands} {language === 'en' ? 'strands' : 'nyuzi'}
                </p>
              </button>
            ))}

            <div className="flex-shrink-0 w-1 sm:w-4" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <img src="/mwangaza_icon.png" alt="Mwangaza" className="w-6 h-6 rounded" />
          <p className="text-xs text-gray-400 dark:text-gray-600">
            {language === 'en' ? 'Free forever · KICD aligned' : 'Bure milele · KICD'}
          </p>
          <span className="text-xs text-gray-400 dark:text-gray-600">© 2025</span>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage