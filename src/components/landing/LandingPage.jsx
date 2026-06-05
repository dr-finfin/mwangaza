import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, CHARACTERS } from '../../context/AppContext'
import { getSubjectsForGrade } from '../../data/curriculum'

const LandingPage = () => {
  const navigate = useNavigate()
  const { language } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [activeChar, setActiveChar] = useState('lion')

  // Rotate character every 2.5 seconds for a subtle live feel
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

  // Sample subjects across grades (for the strip)
  const sampleSubjects = [
    ...getSubjectsForGrade(1),
    ...getSubjectsForGrade(4),
    ...getSubjectsForGrade(7),
  ].slice(0, 12)

  const ch = CHARACTERS[activeChar]

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden">

      {/* Navbar — transparent → solid on scroll */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800'
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

          <div className="flex items-center gap-2.5">
            <img src="/mwangaza_icon.png" alt="Mwangaza" className="w-9 h-9 rounded-lg" />
            <div className="font-black text-base sm:text-lg tracking-tight">
              MWANGAZA
            </div>
          </div>

          <button
            onClick={() => navigate('/onboarding')}
            className="px-5 py-2 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {language === 'en' ? 'Get Started' : 'Anza'}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <main className="flex-1 relative overflow-hidden pt-16">

        {/* Faded sun logo backdrop */}
        <div
          className="absolute -right-32 -top-20 w-[600px] h-[600px] opacity-[0.06] dark:opacity-[0.08] pointer-events-none select-none"
          style={{
            backgroundImage: 'url(/mwangaza_icon.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Accent glow */}
        <div
          className="absolute -left-40 top-40 w-[500px] h-[500px] rounded-full opacity-[0.15] blur-3xl pointer-events-none"
          style={{ backgroundColor: 'var(--accent)' }}
        />

        <div className="relative max-w-6xl mx-auto w-full px-5 sm:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
                style={{
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {language === 'en' ? 'Now live · Grade 1–9' : 'Sasa hai · Darasa 1–9'}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter mb-6">
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

              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mb-8">
                {language === 'en'
                  ? 'KICD-aligned lessons and quizzes. Grade 1 to 9. No account. No payment. Just learning.'
                  : 'Masomo na maswali ya KICD. Darasa la 1 hadi 9. Hakuna akaunti. Hakuna malipo.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/onboarding')}
                  className="px-7 py-4 text-white font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-lg"
                  style={{ backgroundColor: 'var(--accent)', boxShadow: '0 10px 30px -10px var(--accent)' }}
                >
                  {language === 'en' ? 'Start Learning →' : 'Anza Kujifunza →'}
                </button>

                <button
                  onClick={() => navigate('/onboarding')}
                  className="px-7 py-4 font-bold rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                >
                  {language === 'en' ? 'Set up profile' : 'Sanidi wasifu'}
                </button>
              </div>

              <p className="mt-6 text-xs text-gray-400 dark:text-gray-600">
                {language === 'en'
                  ? 'Takes 30 seconds. No email needed.'
                  : 'Inachukua sekunde 30. Hakuna barua pepe inayohitajika.'}
              </p>
            </div>

            {/* Right — character showcase */}
            <div className="relative">
              <div
                className="relative rounded-[2.5rem] p-8 sm:p-12 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, var(--accent), var(--accent-hover))`,
                }}
              >
                {/* Dotted pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative text-center text-white">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-6">
                    {language === 'en' ? 'Pick your character' : 'Chagua mhusika'}
                  </p>

                  <div className="text-[10rem] sm:text-[12rem] leading-none mb-4 transition-all duration-500">
                    {ch.emoji}
                  </div>

                  <p className="text-2xl sm:text-3xl font-black mb-1">
                    {language === 'en' ? ch.name : ch.nameSw}
                  </p>

                  <p className="text-sm opacity-80 mb-8">
                    {language === 'en' ? 'One of the Big 5' : 'Mmoja wa Watano Wakuu'}
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
        </div>

        {/* SUBJECTS STRIP */}
        <div className="relative border-t border-gray-100 dark:border-gray-900 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                  {language === 'en' ? 'What you can learn' : 'Unachoweza kujifunza'}
                </p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {language === 'en' ? 'Every KICD subject.' : 'Kila somo la KICD.'}
                </h2>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8 scrollbar-hide">
              {sampleSubjects.map((subject, i) => (
                <button
                  key={`${subject.id}-${i}`}
                  onClick={() => navigate('/onboarding')}
                  className="flex-shrink-0 w-44 text-left p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  <div className={`w-11 h-11 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center text-2xl shadow-sm mb-3`}>
                    {subject.emoji}
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    {language === 'en' ? subject.name : subject.kiswahili}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {subject.strands} {language === 'en' ? 'strands' : 'nyuzi'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/mwangaza_icon.png" alt="Mwangaza" className="w-5 h-5 rounded" />
            <span className="font-black text-xs tracking-tight">MWANGAZA</span>
          </div>
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