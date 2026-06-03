import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import LandingPage from './components/landing/LandingPage'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import CurriculumNavigator from './components/curriculum/CurriculumNavigator'
import ProfileView from './components/dashboard/ProfileView'
import SettingsView from './components/dashboard/SettingsView'
import Notification from './components/ui/Notification'

const AppLayout = ({ children }) => {
  const { notification, sidebarCollapsed } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <Navbar onMenuToggle={() => setMobileMenuOpen(prev => !prev)} />
      <main className={`pt-16 transition-all duration-200 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Notification notification={notification} />
    </div>
  )
}

const LandingOrRedirect = () => {
  const { name, progress } = useApp()
  const hasState = name || Object.keys(progress).length > 0
  if (hasState) return <Navigate to="/dashboard" replace />
  return <LandingPage />
}

const AppShell = () => (
  <Routes>
    <Route path="/" element={<LandingOrRedirect />} />
    <Route path="/dashboard"  element={<AppLayout><Dashboard /></AppLayout>} />
    <Route path="/curriculum" element={<AppLayout><CurriculumNavigator /></AppLayout>} />
    <Route path="/profile"    element={<AppLayout><ProfileView /></AppLayout>} />
    <Route path="/settings"   element={<AppLayout><SettingsView /></AppLayout>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

const App = () => (
  <AppProvider>
    <AppShell />
  </AppProvider>
)

export default App