import React, { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import LandingPage from './components/landing/LandingPage'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import CurriculumNavigator from './components/curriculum/CurriculumNavigator'
import ProfileView from './components/dashboard/ProfileView'
import Notification from './components/ui/Notification'

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

const AppShell = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />

    <Route path="/dashboard" element={
      <AppLayout><Dashboard /></AppLayout>
    } />

    <Route path="/curriculum" element={
      <AppLayout><CurriculumNavigator /></AppLayout>
    } />

    <Route path="/profile" element={
      <AppLayout><ProfileView /></AppLayout>
    } />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

const App = () => (
  <AppProvider>
    <AppShell />
  </AppProvider>
)

export default App