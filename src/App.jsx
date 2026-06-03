import React, { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import LandingPage from './components/landing/LandingPage'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import CurriculumNavigator from './components/curriculum/CurriculumNavigator'
import ProfileView from './components/dashboard/ProfileView'
import ExploreView from './components/explore/ExploreView'
import Notification from './components/ui/Notification'

// ── Public Navbar (used on /explore) ─────────────────────────
const PublicNav = () => {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-black">M</span>
          </div>
          <div>
            <span className="font-black text-gray-900 text-lg tracking-tight">
              MWANGAZA
            </span>
            <div className="h-0.5 w-full" style={{ background: '#C9A84C' }} />
          </div>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="hidden sm:block text-sm text-gray-500 hover:text-gray-900
                       font-medium transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold
                       rounded-lg hover:bg-blue-700 transition-colors"
          >
            Dashboard →
          </button>
        </div>
      </div>
    </nav>
  )
}

// ── App Layout ────────────────────────────────────────────────
const AppLayout = ({ children }) => {
  const { notification, darkMode } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className={`min-h-screen bg-gray-50 ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <Navbar onMenuToggle={() => setMobileMenuOpen(prev => !prev)} />
      <main className="lg:ml-64 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Notification notification={notification} />
    </div>
  )
}

// ── App Shell ─────────────────────────────────────────────────
const AppShell = () => {
  const { notification, darkMode } = useApp()

  return (
    <Routes>

      {/* ── Public ───────────────────────────────────────────── */}
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/explore"
        element={
          <div className={`min-h-screen bg-white ${darkMode ? 'dark' : ''}`}>
            <PublicNav />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
              <ExploreView />
            </div>
            <Notification notification={notification} />
          </div>
        }
      />

      {/* ── App Pages ────────────────────────────────────────── */}
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        }
      />

      <Route
        path="/curriculum"
        element={
          <AppLayout>
            <CurriculumNavigator />
          </AppLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <AppLayout>
            <ProfileView />
          </AppLayout>
        }
      />

      {/* ── Catch all ────────────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}

// ── Root ──────────────────────────────────────────────────────
const App = () => (
  <AppProvider>
    <AppShell />
  </AppProvider>
)

export default App