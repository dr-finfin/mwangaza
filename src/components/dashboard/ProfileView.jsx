import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { GRADES } from '../../data/curriculum'

const ProfileView = () => {
  const { name, setName, selectedGrade, setSelectedGrade, language, stats, t, showNotification } = useApp()

  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState(name)
  const [draftGrade, setDraftGrade] = useState(selectedGrade)

  const handleSave = () => {
    setName(draftName)
    setSelectedGrade(draftGrade)
    setEditing(false)
    showNotification(
      language === 'en' ? 'Profile updated' : 'Wasifu umesasishwa',
      'success'
    )
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
    <div className="max-w-2xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          {t('profile')}
        </h1>
      </div>

      {/* Profile card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">

        <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-500" />

        <div className="px-6 pb-6">
          <div className="-mt-10 mb-6 flex items-end justify-between">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-black border-4 border-white dark:border-gray-800 shadow-lg">
              {initials}
            </div>

            <div className="flex gap-2">
              {editing && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {language === 'en' ? 'Cancel' : 'Ghairi'}
                </button>
              )}
              <button
                onClick={editing ? handleSave : () => setEditing(true)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                  editing
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {editing
                  ? (language === 'en' ? 'Save' : 'Hifadhi')
                  : (language === 'en' ? 'Edit' : 'Hariri')}
              </button>
            </div>
          </div>

          {editing ? (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  {language === 'en' ? 'Your Name' : 'Jina Lako'}
                </label>
                <input
                  value={draftName}
                  onChange={e => setDraftName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 font-medium focus:outline-none focus:border-blue-500"
                  placeholder={language === 'en' ? 'Your name' : 'Jina lako'}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  {language === 'en' ? 'Grade' : 'Darasa'}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {GRADES.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setDraftGrade(g.id)}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                        draftGrade === g.id
                          ? 'bg-blue-600 text-white scale-105'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-50'
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
                {name || (language === 'en' ? 'Student' : 'Mwanafunzi')}
              </h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
                  {language === 'en' ? 'Grade' : 'Darasa'} {selectedGrade}
                </span>
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full">
                  {stats.completed} {language === 'en' ? 'lessons' : 'masomo'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: language === 'en' ? 'Lessons' : 'Masomo', value: stats.completed, color: 'text-blue-600 dark:text-blue-400' },
          { label: language === 'en' ? 'Mastery' : 'Ujuzi', value: `${stats.mastery}%`, color: 'text-amber-600 dark:text-amber-400' },
          { label: language === 'en' ? 'Attempted' : 'Majaribio', value: stats.attempted, color: 'text-purple-600 dark:text-purple-400' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 text-center">
            <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {language === 'en'
            ? 'Your progress is saved on this device. Use the same browser to keep your data.'
            : 'Maendeleo yako yamehifadhiwa kwenye kifaa hiki. Tumia kivinjari kimoja kuhifadhi data yako.'}
        </p>
      </div>
    </div>
  )
}

export default ProfileView