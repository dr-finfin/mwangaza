import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'mwangaza_progress'

export const useProgress = () => {
  const [progress, setProgress] = useState({})
  const [loading,  setLoading]  = useState(true)

  // ── Load from localStorage on mount ──────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setProgress(JSON.parse(stored))
    } catch {
      setProgress({})
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Save a lesson result ──────────────────────────────────
  const saveProgress = useCallback(({ lessonId, score, passed }) => {
    const existing   = progress[lessonId]
    const attempts   = (existing?.attempts || 0) + 1
    const best_score = Math.max(score, existing?.best_score || 0)
    const status     = passed ? 'completed' : 'attempted'

    const payload = {
      lesson_id:  lessonId,
      status,
      score,
      best_score,
      attempts,
      updated_at: new Date().toISOString(),
    }

    const updated = { ...progress, [lessonId]: payload }
    setProgress(updated)

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      console.warn('localStorage write failed')
    }

    return { error: null }
  }, [progress])

  // ── Computed stats ────────────────────────────────────────
  const stats = {
    total:     Object.keys(progress).length,
    completed: Object.values(progress).filter(p => p.status === 'completed').length,
    attempted: Object.values(progress).filter(p => p.status === 'attempted').length,
    avgScore:  (() => {
      const scored = Object.values(progress).filter(p => p.best_score)
      return scored.length
        ? Math.round(scored.reduce((sum, p) => sum + p.best_score, 0) / scored.length)
        : 0
    })(),
  }

  return { progress, loading, stats, saveProgress }
}