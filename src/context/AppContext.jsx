import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UI_STRINGS } from '../data/curriculum'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const navigate = useNavigate()

  const [language,      setLanguage]      = useState('en')
  const [darkMode,      setDarkMode]      = useState(false)
  const [progress,      setProgress]      = useState({})
  const [notification,  setNotification]  = useState(null)
  const [selectedGrade, setSelectedGrade] = useState(4)

  const t = (key) => UI_STRINGS[language]?.[key] || UI_STRINGS.en[key] || key

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // ── Progress is stored in localStorage (no user, no Supabase) ──
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mwangaza_progress')
      if (stored) setProgress(JSON.parse(stored))
    } catch {
      setProgress({})
    }
  }, [])

  const saveLessonProgress = useCallback((lessonId, score, passed) => {
    const existing   = progress[lessonId]
    const attempts   = (existing?.attempts || 0) + 1
    const status     = passed ? 'completed' : 'attempted'
    const best_score = Math.max(score, existing?.best_score || 0)

    const progressData = {
      lesson_id:  lessonId,
      status,
      score,
      best_score,
      attempts,
      updated_at: new Date().toISOString(),
    }

    const updated = { ...progress, [lessonId]: progressData }
    setProgress(updated)

    try {
      localStorage.setItem('mwangaza_progress', JSON.stringify(updated))
    } catch {
      console.warn('Could not save progress to localStorage')
    }

    if (passed) {
      showNotification('Lesson complete! Great work. 🎉', 'success')
    }
  }, [progress])

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => setNotification(null), 3500)
  }

  return (
    <AppContext.Provider value={{
      language,      setLanguage,
      darkMode,      setDarkMode,
      progress,
      selectedGrade, setSelectedGrade,
      saveLessonProgress,
      showNotification,
      notification,
      navigate,
      t,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}