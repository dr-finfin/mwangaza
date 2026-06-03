import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { UI_STRINGS } from '../data/curriculum'

const STORAGE_KEY = 'mwangaza_state'
const STATE_VERSION = 1

export const ACCENT_COLORS = {
  blue:    { name: 'Blue',    hex: '#2563eb', hover: '#1d4ed8' },
  gold:    { name: 'Gold',    hex: '#C9A84C', hover: '#B8860B' },
  emerald: { name: 'Emerald', hex: '#059669', hover: '#047857' },
  rose:    { name: 'Rose',    hex: '#e11d48', hover: '#be123c' },
  slate:   { name: 'Slate',   hex: '#475569', hover: '#334155' },
}

const DEFAULT_STATE = {
  version: STATE_VERSION,
  profile: {
    name: '',
    selectedGrade: 4,
    language: 'en',
    darkMode: false,
    accent: 'blue',
  },
  progress: {},
}

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw)
    if (parsed.version !== STATE_VERSION) return DEFAULT_STATE
    return {
      ...DEFAULT_STATE,
      ...parsed,
      profile: { ...DEFAULT_STATE.profile, ...parsed.profile },
    }
  } catch {
    return DEFAULT_STATE
  }
}

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const navigate = useNavigate()
  const [state, setState] = useState(loadState)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      console.warn('localStorage write failed')
    }
  }, [state])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.profile.darkMode)
  }, [state.profile.darkMode])

  // Apply accent CSS var
  useEffect(() => {
    const accent = ACCENT_COLORS[state.profile.accent] || ACCENT_COLORS.blue
    document.documentElement.style.setProperty('--accent', accent.hex)
    document.documentElement.style.setProperty('--accent-hover', accent.hover)
  }, [state.profile.accent])

  const setName = useCallback((name) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, name } }))
  }, [])

  const setSelectedGrade = useCallback((grade) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, selectedGrade: grade } }))
  }, [])

  const setLanguage = useCallback((lang) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, language: lang } }))
  }, [])

  const setDarkMode = useCallback((dark) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, darkMode: dark } }))
  }, [])

  const setAccent = useCallback((accent) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, accent } }))
  }, [])

  const resetAll = useCallback(() => {
    setState(DEFAULT_STATE)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `mwangaza-backup-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }, [state])

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
        state.profile.language === 'en' ? 'Lesson complete' : 'Somo limekamilika',
        'success'
      )
    }
  }, [state.profile.language])

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

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => setNotification(null), 3500)
  }, [])

  const t = useCallback((key) => {
    return UI_STRINGS[state.profile.language]?.[key] || UI_STRINGS.en[key] || key
  }, [state.profile.language])

  return (
    <AppContext.Provider value={{
      name:          state.profile.name,
      selectedGrade: state.profile.selectedGrade,
      language:      state.profile.language,
      darkMode:      state.profile.darkMode,
      accent:        state.profile.accent,
      setName,
      setSelectedGrade,
      setLanguage,
      setDarkMode,
      setAccent,
      resetAll,
      exportData,
      progress: state.progress,
      saveLessonProgress,
      stats,
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