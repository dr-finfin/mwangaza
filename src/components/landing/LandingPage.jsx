import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const STATS = [
  { number: '9',    label: 'Grade Levels',   desc: 'Grade 1 through 9' },
  { number: '100%', label: 'KICD Aligned',   desc: 'Official curriculum' },
  { number: '0 KSh', label: 'Cost Forever',  desc: 'Free for every student' },
  { number: '80%',  label: 'Pass Threshold', desc: 'Mastery-based learning' },
]

const FEATURES = [
  { number: '01', title: 'Curriculum Synchronized', body: 'Every lesson maps directly to a KICD strand and sub-strand. Nothing is added, nothing is missing.' },
  { number: '02', title: 'Mastery Before Progress',  body: 'Students must score 80% on a quiz before a lesson is marked complete. Genuine understanding, not passive watching.' },
  { number: '03', title: 'Zero Friction Access',     body: 'No advertisements. No subscription tiers. No paywalls. A student in Turkana and a student in Karen get identical quality.' },
  { number: '04', title: 'Bilingual by Design',      body: 'The entire platform switches between English and Kiswahili instantly. Language is never a barrier to learning.' },
  { number: '05', title: 'Local Progress Saving',    body: 'Progress is saved to your device instantly. Pick up exactly where you left off, every time.' },
  { number: '06', title: 'Built for Low Bandwidth',  body: 'Engineered for entry-level Android devices on 2G connections. Quality education does not require a fast connection.' },
]

const CURRICULUM_PREVIEW = [
  { grade: 7, subject: 'Integrated Science', strand: 'Laboratory Safety', sub: 'Lab Safety Rules',            difficulty: 'Beginner',     duration: 'Watch' },
  { grade: 7, subject: 'Integrated Science', strand: 'Mixtures',          sub: 'Separating Mixtures',         difficulty: 'Intermediate', duration: 'Watch' },
  { grade: 7, subject: 'Integrated Science', strand: 'Acids & Bases',     sub: 'Acids, Bases and Indicators', difficulty: 'Intermediate', duration: 'Watch' },
  { grade: 4, subject: 'Mathematics',        strand: 'Numbers',            sub: 'Whole Numbers up to 999,999', difficulty: 'Beginner',     duration: '12 min' },
  { grade: 7, subject: 'Integrated Science', strand: 'Human Body',        sub: 'Human Reproductive System',   difficulty: 'Intermediate', duration: 'Watch' },
  { grade: 4, subject: 'Mathematics',        strand: 'Measurement',       sub: 'Length',                      difficulty: 'Beginner',     duration: '10 min' },
]

const REGIONS = [
  { city: 'Karen, Nairobi', access: 95 },
  { city: 'Kisumu CBD',     access: 71 },
  { city: 'Eldoret Town',   access: 58 },
  { city: 'Garissa',        access: 34 },
  { city: 'Turkana County', access: 18 },
]

const TECH = [
  { name: 'React 18',     role: 'UI Framework', detail: 'Concurrent rendering' },
  { name: 'Vite',         role: 'Build Tool',   detail: 'Sub-second HMR' },
  { name: 'Supabase',     role: 'Database',     detail: 'PostgreSQL + RLS' },
  { name: 'Tailwind CSS', role: 'Styling',      detail: 'Utility-first CSS' },
  { name: 'React Router', role: 'Navigation',   detail: 'Client-side routing' },
  { name: 'localStorage', role: 'Progress',     detail: 'Instant, offline-ready' },
]

const LandingPage = () => {
  const { language, setLanguage } = useApp()
  const navigate = useNavigate()

  return (
    <div className="bg-white text-gray-900">

      {/* ── Navbar ────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-black">M</span>
            </div>
            <div>
              <div className="font-black text-gray-900 text-lg tracking-tight leading-none">MWANGAZA</div>
              <div className="h-0.5 w-full mt-0.5" style={{ background: '#C9A84C' }} />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Features', 'Curriculum'].map(label => (
              <a key={label} href={`#${label.toLowerCase()}`} className="text-sm text-gray-500 hover:text-gray-900 font-medium">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')} className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 font-medium">
              {language === 'en' ? 'Kiswahili' : 'English'}
            </button>
            <button onClick={() => navigate('/explore')} className="hidden sm:block text-sm text-gray-600 font-semibold hover:text-blue-600 px-3 py-2">
              Explore
            </button>
            <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: 'rgba(201,168,76,0.4)', backgroundColor: 'rgba(201,168,76,0.06)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C9A84C' }} />
                <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#B8860B' }}>
                  Kenya · CBE Aligned · Grade 1–9
                </span>
              </div>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8 text-gray-900">
              Education<br />
              <span className="text-blue-600">without</span><br />
              barriers.
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-10">
              Mwangaza delivers KICD-aligned lessons and assessments to every Kenyan student — from Grade 1 to Grade 9 — at zero cost, forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                Start Learning →
              </button>
              <button onClick={() => navigate('/explore')} className="flex items-center gap-2 px-6 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50">
                Explore the curriculum <span className="text-gray-400">→</span>
              </button>
            </div>

            <p className="mt-8 text-sm text-gray-400">
              No account. No sign in. No credit card. Free for every Kenyan student.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-gray-200">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center lg:px-8">
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm font-semibold text-gray-700 mb-0.5">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <section id="about" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-px" style={{ backgroundColor: '#C9A84C' }} />
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#B8860B' }}>The Problem</p>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6 text-gray-900">
                Quality education should not depend on your postcode.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-5">
                In Kenya, the quality of education a child receives is directly tied to where they live and what their parents earn. A student in Nairobi gets tutors, printed worksheets, and revision classes. A student in Turkana gets none of that.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Mwangaza exists to close that gap. Every lesson. Every quiz. Every grade. Available to every Kenyan child with a phone — free, forever.
              </p>
            </div>

            <div className="space-y-5">
              {REGIONS.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{item.city}</span>
                    <span className="text-gray-400 text-xs">{item.access}% digital access</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.access}%`,
                        background: item.access > 70 ? '#1a56db' : item.access > 40 ? '#C9A84C' : '#ef4444',
                      }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-300 pt-2">Estimated digital education access by region · 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section id="features" className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-px" style={{ backgroundColor: '#C9A84C' }} />
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#B8860B' }}>How It Works</p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-gray-900">
              Built on four non-negotiable principles.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {FEATURES.map((feature, i) => (
              <div key={i} className="bg-white p-8 hover:bg-blue-50 transition-colors duration-300 group">
                <div className="text-xs font-bold text-gray-200 mb-6 font-mono tracking-wider">{feature.number}</div>
                <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum Preview ─────────────────────────────────── */}
      <section id="curriculum" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-px" style={{ backgroundColor: '#C9A84C' }} />
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#B8860B' }}>The Curriculum</p>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight text-gray-900">
                Every KICD lesson. Every grade. All in one place.
              </h2>
            </div>
            <button onClick={() => navigate('/explore')} className="flex-shrink-0 flex items-center gap-2 px-5 py-3 border border-gray-200 text-gray-700 font-semibold text-sm rounded-xl hover:border-blue-300 hover:text-blue-600">
              Browse all lessons →
            </button>
          </div>

          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <div className="col-span-1">Grade</div>
              <div className="col-span-3">Subject</div>
              <div className="col-span-3">Strand</div>
              <div className="col-span-3">Lesson</div>
              <div className="col-span-1">Time</div>
              <div className="col-span-1">Level</div>
            </div>
            {CURRICULUM_PREVIEW.map((item, i) => (
              <div key={i} className="grid grid-cols-12 px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-blue-50 transition-colors items-center">
                <div className="col-span-1">
                  <span className="text-xs font-bold px-2 py-1 rounded-md" style={{ color: '#1a56db', backgroundColor: 'rgba(26,86,219,0.07)' }}>G{item.grade}</span>
                </div>
                <div className="col-span-3 text-sm font-medium text-gray-800">{item.subject}</div>
                <div className="col-span-3 text-sm text-gray-400">{item.strand}</div>
                <div className="col-span-3 text-sm text-gray-700 font-medium">{item.sub}</div>
                <div className="col-span-1 text-xs text-gray-400">{item.duration}</div>
                <div className="col-span-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-700'}`}>
                    {item.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-300 mt-6">Showing 6 of many lessons · All content is KICD verified</p>
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────────────────────── */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-px" style={{ backgroundColor: '#C9A84C' }} />
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#C9A84C' }}>Engineering</p>
              </div>
              <h2 className="text-4xl font-black leading-tight mb-6 text-white">Production-grade infrastructure.</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Built on a lean, battle-tested stack optimised for speed, reliability, and scale.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {TECH.map((tech, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500/40 transition-colors">
                  <div className="font-bold text-white text-sm mb-0.5">{tech.name}</div>
                  <div className="text-gray-400 text-xs mb-1">{tech.role}</div>
                  <div className="text-xs" style={{ color: '#C9A84C' }}>{tech.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-12 h-0.5 mx-auto mb-10 rounded-full" style={{ backgroundColor: '#C9A84C' }} />
            <h2 className="text-5xl lg:text-7xl font-black leading-tight mb-6 text-gray-900">
              Start learning<br /><span className="text-blue-600">today.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Access every KICD lesson, quiz and progress tracker — no account, no sign in, free forever.
            </p>
            <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold text-base rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-600/20">
              Start Learning Now →
            </button>
            <p className="mt-5 text-sm text-gray-400">No account. No setup. Open and go.</p>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">M</span>
            </div>
            <span className="font-black text-gray-900 text-sm tracking-tight">MWANGAZA</span>
            <div className="w-px h-3 bg-gray-200 mx-1" />
            <span className="text-xs text-gray-400">by GlideTech</span>
          </div>
          <p className="text-gray-400 text-xs text-center">Built for every Kenyan student · Free forever · KICD Aligned</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C9A84C' }} />
            <span className="text-gray-400 text-xs">© 2025 GlideTech</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage