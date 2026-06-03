import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { UI_STRINGS } from '../data/curriculum'

const STORAGE_KEY = 'mwangaza_state'
const STATE_VERSION = 1

const DEFAULT_STATE = {
  version: STATE_VERSION,
  profile: {
    name: '',
    selectedGrade: 4,
    language: 'en',
    darkMode: false,
  },
  progress: {},
}

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw)
    if (parsed.version !== STATE_VERSION) return DEFAULT_STATE
    return parsed
  } catch {
    return DEFAULT_STATE
  }
}

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const navigate = useNavigate()
  const [state, setState] = useState(loadState)
  const [notification, setNotification] = useState(null)

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      console.warn('localStorage write failed')
    }
  }, [state])

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.profile.darkMode)
  }, [state.profile.darkMode])

  // ── Profile setters ────────────────────────────────────────
  const setName = useCallback((name) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, name },
    }))
  }, [])

  const setSelectedGrade = useCallback((grade) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, selectedGrade: grade },
    }))
  }, [])

  const setLanguage = useCallback((lang) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, language: lang },
    }))
  }, [])

  const setDarkMode = useCallback((dark) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, darkMode: dark },
    }))
  }, [])

  // ── Progress ───────────────────────────────────────────────
  const saveLessonProgress = useCallback((lessonId, score, passed) => {
    setState(prev => {
      const existing = prev.progress[lessonId]
      const attempts = (existing?.attempts || 0) + 1
      const bestScore = Math.max(score, existing?.bestScore || 0)
      const status = passed ? 'completed' : 'attempted'

      return {
        ...prev,
        progress: {
          ...prev.progress,
          [lessonId]: {
            status,
            score,
            bestScore,
            best_score: bestScore,
            attempts,
            updatedAt: new Date().toISOString(),
          },
        },
      }
    })

    if (passed) {
      showNotification(
        state.profile.language === 'en' ? 'Lesson complete!' : 'Somo limekamilika!',
        'success'
      )
    }
  }, [state.profile.language])

  // ── Derived stats ──────────────────────────────────────────
  const stats = useMemo(() => {
    const entries = Object.values(state.progress)
    const completed = entries.filter(p => p.status === 'completed').length
    const attempted = entries.length
    const scored = entries.filter(p => p.bestScore)
    const mastery = scored.length
      ? Math.round(scored.reduce((sum, p) => sum + p.bestScore, 0) / scored.length)
      : 0

    return { completed, attempted, mastery }
  }, [state.progress])

  // ── Notification ───────────────────────────────────────────
  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => setNotification(null), 3500)
  }, [])

  // ── Translation ────────────────────────────────────────────
  const t = useCallback((key) => {
    return UI_STRINGS[state.profile.language]?.[key] || UI_STRINGS.en[key] || key
  }, [state.profile.language])

  return (
    <AppContext.Provider value={{
      // Profile
      name:          state.profile.name,
      selectedGrade: state.profile.selectedGrade,
      language:      state.profile.language,
      darkMode:      state.profile.darkMode,
      setName,
      setSelectedGrade,
      setLanguage,
      setDarkMode,

      // Progress
      progress: state.progress,
      saveLessonProgress,

      // Derived
      stats,

      // Utils
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