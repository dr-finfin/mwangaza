import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, CHARACTERS, ACCENT_COLORS } from '../../context/AppContext'
import { getSubjectsForGrade } from '../../data/curriculum'
import AnimatedLogo from '../ui/AnimatedLogo'
import { BookOpen, Trophy, Zap, Globe, ArrowRight, CheckCircle } from 'lucide-react'

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
    }, 3000)
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
  ].slice(0, 12)

  const ch = CHARACTERS[activeChar]
  const charColorKey = CHAR_TO_COLOR[activeChar] || 'blue'
  const charColor = ACCENT_COLORS[charColorKey]

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      titleEn: 'KICD Aligned',
      titleSw: 'Imezingatia KICD',
      descEn: 'Curriculum matches Kenya\'s Competency-Based Education exactly',
      descSw: 'Mtaala unalingana kabisa na Elimu ya Kijeshi ya Kenya'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      titleEn: 'Track Progress',
      titleSw: 'Fuatilia Maendeleo',
      descEn: 'Earn achievements and see your learning journey grow',
      descSw: 'Pata mafanikio na uone safari yako ya kujifunza ikikua'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      titleEn: 'Bilingual Learning',
      titleSw: 'Kujifunza kwa Lugha Mbili',
      descEn: 'Switch between English and Kiswahili anytime',
      descSw: 'Badilisha kati ya Kiingereza na Kiswahili wakati wowote'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      titleEn: 'Learn Offline',
      titleSw: 'Jifunza Nje ya Mtandao',
      descEn: 'Works without internet after first load as a PWA',
      descSw: 'Inafanya kazi bila mtandao baada ya kupakia mara ya kwanza'
    }
  ]

  const stats = [
    { number: '9', labelEn: 'Grades', labelSw: 'Madarasa' },
    { number: '7+', labelEn: 'Subjects', labelSw: 'Masomo' },
    { number: '100+', labelEn: 'Lessons', labelSw: 'Masomo' },
    { number: 'Free', labelEn: 'Forever', labelSw: 'Milele' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <AnimatedLogo size="xl" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/onboarding')}
              className="hidden sm:flex px-5 py-2.5 text-gray-700 dark:text-gray-300 text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {language === 'en' ? 'Get Started' : 'Anza'}
            </button>
            <button
              onClick={() => navigate('/onboarding')}
              className="px-6 py-2.5 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: 'var(--accent)', boxShadow: `0 10px 40px -10px var(--accent)` }}
            >
              {language === 'en' ? 'Start Learning Free' : 'Anza Kujifunza Bure'}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 relative">
        <div
          className="absolute -right-40 sm:-right-20 top-20 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] opacity-[0.04] pointer-events-none select-none"
          style={{
            backgroundImage: 'url(/mwangaza_icon.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />

        <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-8 animate-fade-in">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {language === 'en' ? 'KICD Aligned • Competency-Based Education' : 'KICD • Elimu ya Kijeshi'}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-[-0.04em] mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {language === 'en' ? (
                  <>
                    Quality education<br />
                    <span style={{ color: 'var(--accent)' }}>for every</span><br />
                    Kenyan child
                  </>
                ) : (
                  <>
                    Elimu bora<br />
                    <span style={{ color: 'var(--accent)' }}>kwa kila</span><br />
                    mtoto wa Kenya
                  </>
                )}
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {language === 'en'
                  ? 'Interactive lessons, quizzes, and progress tracking. Completely free, no signup required.'
                  : 'Masomo shirikishi, maswali, na ufuatiliaji wa maendeleo. Bure kabisa, hakuna usajili.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <button
                  onClick={() => navigate('/onboarding')}
                  className="group px-8 py-4 text-white font-bold text-base rounded-xl hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
                  style={{ backgroundColor: 'var(--accent)', boxShadow: `0 20px 60px -15px var(--accent)` }}
                >
                  {language === 'en' ? 'Start Learning Now' : 'Anza Kujifunza Sasa'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold text-base rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {language === 'en' ? 'Learn More' : 'Jifunze Zaidi'}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {stats.map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <div className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--accent)' }}>{stat.number}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'en' ? stat.labelEn : stat.labelSw}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                {language === 'en' ? 'Everything you need to excel' : 'Kila kitu unachohitaji kufaulu'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {language === 'en'
                  ? 'Built specifically for Kenyan students following the Competency-Based Curriculum'
                  : 'Imejengwa mahsusi kwa wanafunzi wa Kenya wanafuata Mtaala wa Kijeshi'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white" style={{ backgroundColor: 'var(--accent)' }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {language === 'en' ? feature.titleEn : feature.titleSw}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {language === 'en' ? feature.descEn : feature.descSw}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div
              className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden transition-colors duration-700"
              style={{ backgroundColor: charColor.hex }}
            >
              <div
                className="absolute -left-32 -bottom-32 w-[500px] h-[500px] opacity-[0.1] pointer-events-none select-none"
                style={{
                  backgroundImage: 'url(/mwangaza_icon.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(0) invert(1)',
                }}
              />

              <div className="relative grid lg:grid-cols-2 gap-12 items-center px-8 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20">
                <div className="text-white">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                    {language === 'en' ? (
                      <>Make it yours.<br />Learn your way.</>
                    ) : (
                      <>Fanya iwe lako.<br />Jifunza kwa njia yako.</>
                    )}
                  </h2>
                  <p className="text-lg sm:text-xl opacity-95 mb-8 max-w-md">
                    {language === 'en'
                      ? 'Choose your character, pick your colors, and personalize your learning experience.'
                      : 'Chagua mhusika wako, chagua rangi zako, na ubadilishe uzoefu wako wa kujifunza.'}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {(language === 'en' 
                      ? ['5 unique characters to choose from', '10 beautiful color themes', 'English & Kiswahili support']
                      : ['Wahusika 5 tofauti kuchagua', 'Mandhari 10 mazuri ya rangi', 'Kusaidia Kiingereza na Kiswahili']
                    ).map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/onboarding')}
                    className="px-8 py-4 bg-white text-gray-900 font-bold text-base rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                  >
                    {language === 'en' ? 'Personalize Now' : 'Binafsisha Sasa'}
                  </button>
                </div>

                <div className="text-center text-white relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                  </div>
                  <div className="relative text-[12rem] sm:text-[16rem] lg:text-[18rem] leading-none mb-6 transition-all duration-700 hover:scale-110">
                    {ch.emoji}
                  </div>
                  <p className="relative text-3xl sm:text-4xl font-black mb-6">
                    {language === 'en' ? ch.name : ch.nameSw}
                  </p>
                  <div className="relative flex justify-center gap-3">
                    {Object.keys(CHARACTERS).map(key => (
                      <button
                        key={key}
                        onClick={() => setActiveChar(key)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          activeChar === key ? 'bg-white scale-150' : 'bg-white/40 hover:bg-white/70'
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

        <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                {language === 'en' ? 'Start learning today' : 'Anza kujifunza leo'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {language === 'en'
                  ? 'Choose your grade and dive into KICD-aligned content'
                  : 'Chagua darasa lako na uanze masomo yanayolingana na KICD'}
              </p>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
              {sampleSubjects.map((subject, i) => (
                <button
                  key={`${subject.id}-${i}`}
                  onClick={() => navigate('/onboarding')}
                  className="flex-shrink-0 w-64 text-left p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gray-50 dark:bg-gray-700">
                      {subject.emoji}
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                    {language === 'en' ? subject.name : subject.kiswahili}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {subject.strands} {language === 'en' ? 'strands' : 'nyuzi'}
                  </p>
                </button>
              ))}
              <button
                onClick={() => navigate('/onboarding')}
                className="flex-shrink-0 w-64 flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-3 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  {language === 'en' ? 'View All Subjects' : 'Tazama Masomo Yote'}
                </p>
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              {language === 'en' ? (
                <>Ready to start your<br />learning journey?</>
              ) : (
                <>Uko tayari kuanza<br />safari yako ya kujifunza?</>
              )}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
              {language === 'en'
                ? 'Join thousands of Kenyan students learning for free'
                : 'Jiunge na maelfu ya wanafunzi wa Kenya wanaojifunza bure'}
            </p>
            <button
              onClick={() => navigate('/onboarding')}
              className="group px-10 py-5 text-white font-bold text-lg rounded-xl hover:opacity-90 transition-all hover:scale-105 inline-flex items-center gap-3 shadow-2xl"
              style={{ backgroundColor: 'var(--accent)', boxShadow: `0 30px 80px -20px var(--accent)` }}
            >
              {language === 'en' ? 'Get Started for Free' : 'Anza Bure Sasa'}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/mwangaza_icon.png" alt="Mwangaza" className="w-10 h-10" />
              <span className="font-bold text-lg">MwangazaEdu</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {language === 'en' ? 'Free forever • KICD Aligned • Competency-Based Education' : 'Bure milele • Imezingatia KICD • Elimu ya Kijeshi'}
            </p>
            <span className="text-sm text-gray-400 dark:text-gray-500">© Finley Orenge & Brian Chacha 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
