import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { searchLessons } from '../../data/curriculum'

const SearchOverlay = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { language, setSelectedGrade } = useApp()

  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [open])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  const results = searchLessons(query)

  const handleSelect = (result) => {
    setSelectedGrade(result.grade)
    navigate(`/curriculum?grade=${result.grade}&subject=${result.subjectId}&strand=${result.strandId}&lesson=${result.lessonId}`)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-gray-950">

      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={language === 'en' ? 'Search lessons across all grades…' : 'Tafuta masomo…'}
            className="flex-1 bg-transparent text-base sm:text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />

          <button
            onClick={onClose}
            className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-2"
          >
            {language === 'en' ? 'Cancel' : 'Ghairi'}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-3xl mx-auto px-4 py-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>

        {query.length < 2 && (
          <div className="text-center py-16">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              {language === 'en'
                ? 'Start typing to search lessons.'
                : 'Anza kuandika kutafuta masomo.'}
            </p>
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-700 dark:text-gray-300 font-semibold text-base mb-1">
              {language === 'en' ? 'No lessons found' : 'Hakuna masomo yaliyopatikana'}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              {language === 'en' ? 'Try a different keyword' : 'Jaribu neno tofauti'}
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-1">
              {results.length} {language === 'en' ? 'results' : 'matokeo'}
            </p>

            {results.map((r, i) => (
              <button
                key={`${r.lessonId}-${i}`}
                onClick={() => handleSelect(r)}
                className="w-full flex items-center gap-3 p-3 sm:p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-left"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${r.subjectColor} rounded-lg flex items-center justify-center text-lg flex-shrink-0`}>
                  {r.subjectEmoji}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                    {language === 'en' ? r.lessonName : (r.lessonNameSw || r.lessonName)}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
                    {language === 'en' ? 'Grade' : 'Darasa'} {r.grade} · {language === 'en' ? r.subjectName : r.subjectNameSw} · {r.strandName}
                  </p>
                </div>

                <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchOverlay