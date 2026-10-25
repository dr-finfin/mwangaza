import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, CHARACTERS, ACCENT_COLORS } from '../../context/AppContext'
import { getSubjectsForGrade } from '../../data/curriculum'
import AnimatedLogo from '../ui/AnimatedLogo'

const CHAR_TO_COLOR = {
  lion:     'gold',
  elephant: 'violet',
  rhino:    'cyan',
  leopard:  'orange',
  buffalo:  'emerald',
}

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
  const charColorKey = CHAR_TO_COLOR[activeChar] || 'blue'
  const charColor = ACCENT_COLORS[charColorKey]

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden">

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <AnimatedLogo size="xl" />
          <button
            onClick={() => navigate('/onboarding')}
            className="px-5 py-2.5 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {language === 'en' ? 'Start Learning' : 'Anza Kujifunza'}
          </button>
        </div>
      </nav>

      <main className="flex-1 relative">

        <div
          className="absolute -right-32 sm:-right-20 top-10 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] opacity-[0.06] pointer-events-none select-none"
          style={{
            backgroundImage: 'url(/mwangaza_icon.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />

        <section className="relative pt-40 sm:pt-48 pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">

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

            <p className="text-lg sm:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mb-10">
              {language === 'en'
                ? 'KICD-aligned lessons and quizzes. No account. No payment. Just learning.'
                : 'Masomo na maswali ya KICD. Hakuna akaunti. Hakuna malipo.'}
            </p>

            <button
              onClick={() => navigate('/onboarding')}
              className="px-8 py-4 text-white font-bold text-base rounded-xl hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {language === 'en' ? 'Get Started →' : 'Anza →'}
            </button>
          </div>
        </section>

        <section className="relative px-5 sm:px-8 pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto">
            <div
              className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden transition-colors duration-700"
              style={{ backgroundColor: charColor.hex }}
            >
              <div
                className="absolute -left-20 -bottom-20 w-[400px] h-[400px] opacity-[0.12] pointer-events-none select-none"
                style={{
                  backgroundImage: 'url(/mwangaza_icon.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(0) invert(1)',
                }}
              />

              <div className="relative grid sm:grid-cols-2 gap-8 items-center px-8 sm:px-16 py-16 sm:py-24">

                <div className="text-white text-center sm:text-left">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1] mb-4">
                    {language === 'en' ? 'Pick your character.' : 'Chagua mhusika.'}
                  </h2>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1] mb-6 opacity-70">
                    {language === 'en' ? 'Pick your color.' : 'Chagua rangi.'}
                  </h2>
                  <p className="text-lg opacity-90 max-w-md mx-auto sm:mx-0">
                    {language === 'en'
                      ? 'Make Mwangaza yours.'
                      : 'Fanya Mwangaza wako.'}
                  </p>
                </div>

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

        <section className="pb-24 sm:pb-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              {language === 'en' ? 'Every KICD subject.' : 'Kila somo la KICD.'}
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-6 px-5 sm:px-8 scrollbar-hide">
            {sampleSubjects.map((subject, i) => (
              <button
                key={`${subject.id}-${i}`}
                onClick={() => navigate('/onboarding')}
                className="flex-shrink-0 w-56 sm:w-64 text-left p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-gray-50 dark:bg-gray-800">
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

      <footer className="border-t border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <img src="/mwangaza_icon.png" alt="Mwangaza" className="w-8 h-8" />
          <p className="text-xs text-gray-400 dark:text-gray-600">
            {language === 'en' ? 'Free forever · KICD aligned' : 'Bure milele · KICD'}
          </p>
          <span className="text-xs text-gray-400 dark:text-gray-600">© Finley Orenge  Brian Chacha  2026</span>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage