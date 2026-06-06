import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import LandingPage from './components/landing/LandingPage'
import OnboardingView from './components/onboarding/OnboardingView'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import TabBar from './components/layout/TabBar'
import Dashboard from './components/dashboard/Dashboard'
import CurriculumNavigator from './components/curriculum/CurriculumNavigator'
import ProfileView from './components/dashboard/ProfileView'
import SettingsView from './components/dashboard/SettingsView'
import Notification from './components/ui/Notification'
import InstallPrompt from './components/ui/InstallPrompt'

const AppLayout = ({ children }) => {
  const { notification, sidebarCollapsed } = useApp()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar />
      <Navbar />
      <main
        key={location.pathname}
        className={`pt-16 pb-24 lg:pb-8 transition-all duration-200 animate-page-fade ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>
      <TabBar />
      <Notification notification={notification} />
      <InstallPrompt />
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
    <Route path="/onboarding" element={<OnboardingView />} />
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