import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { GRADES } from '../../data/curriculum'

const ProfileView = () => {
  const { t, language, progress, selectedGrade, setSelectedGrade, showNotification } = useApp()

  const completed = Object.values(progress).filter(p => p.status === 'completed').length
  const attempted = Object.values(progress).length
  const scores    = Object.values(progress).filter(p => p.best_score)
  const mastery   = scores.length
    ? Math.round(scores.reduce((a, b) => a + b.best_score, 0) / scores.length)
    : 0

  const [editing,   setEditing]   = useState(false)
  const [name,      setName]      = useState(() => localStorage.getItem('mwangaza_name') || '')
  const [draftName, setDraftName] = useState(name)
  const [draftGrade, setDraftGrade] = useState(selectedGrade)

  const handleSave = () => {
    setName(draftName)
    setSelectedGrade(draftGrade)
    localStorage.setItem('mwangaza_name', draftName)
    setEditing(false)
    showNotification('✅ Profile updated!', 'success')
  }

  const handleCancel = () => {
    setDraftName(name)
    setDraftGrade(selectedGrade)
    setEditing(false)
  }

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          {t('profile')} 👤
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          {language === 'en'
            ? 'Manage your name and learning preferences'
            : 'Simamia jina lako na mapendeleo ya kujifunza'}
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100
                      dark:border-gray-700 shadow-sm overflow-hidden mb-6">

        {/* Cover banner */}
        <div className="h-28 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar row */}
          <div className="-mt-12 mb-6 flex items-end justify-between">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700
                            rounded-2xl flex items-center justify-center text-white
                            text-2xl font-black border-4 border-white
                            dark:border-gray-800 shadow-xl">
              {initials}
            </div>

            <div className="flex gap-2">
              {editing && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border
                             border-gray-200 dark:border-gray-600 text-gray-600
                             dark:text-gray-400 hover:bg-gray-50
                             dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={editing ? handleSave : () => setEditing(true)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  editing
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                    : 'border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {editing ? '✓ Save Changes' : '✏️ Edit Profile'}
              </button>
            </div>
          </div>

          {/* Form or Display */}
          {editing ? (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500
                                  dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  value={draftName}
                  onChange={e => setDraftName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border
                             border-gray-200 dark:border-gray-600 rounded-xl
                             text-gray-800 dark:text-gray-200 font-medium
                             focus:outline-none focus:border-blue-500
                             focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500
                                  dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Current Grade
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {GRADES.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setDraftGrade(g.id)}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        draftGrade === g.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600'
                      }`}
                    >
                      {g.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">
                {name || 'Student'}
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">
                No account required
              </p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30
                                 text-blue-600 dark:text-blue-400 text-xs
                                 font-semibold rounded-full">
                  🎓 Grade {selectedGrade}
                </span>
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30
                                 text-emerald-600 dark:text-emerald-400 text-xs
                                 font-semibold rounded-full">
                  ✓ {completed} lessons done
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Lessons Done', value: completed,    icon: '📚', color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Mastery',      value: `${mastery}%`, icon: '🎯', color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Attempted',    value: attempted,    icon: '⚡', color: 'text-purple-500' },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100
                       dark:border-gray-700 p-4 text-center shadow-sm"
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100
                      dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white">About Your Progress</h3>
        </div>
        <div className="px-6 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Your progress is saved locally on this device. No account or sign-in
            is needed. To keep your progress, use the same browser and device.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileView