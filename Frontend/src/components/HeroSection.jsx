import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Note from './Note'

function HeroSection() {
  const [showForm, setShowForm] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  function handleToggleForm() {
    setShowForm((prev) => !prev)
  }

  function handleCloseForm() {
    setShowForm(false)
  }

  return (
    <section className="space-y-6">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 sm:p-6 lg:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-300">
              Workspace overview
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Write clearly. Keep your ideas close.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              A calm place to capture notes, plans, and reminders without losing focus.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                className="rounded-full bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                type="button"
                onClick={handleToggleForm}
              >
                {showForm ? 'Close composer' : 'Create a note'}
              </motion.button>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                All changes stay in your existing workspace.
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Quick preview
              </h2>
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400">
                Ready
              </span>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                Daily plan
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                Shopping list
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                Project ideas
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Note
        showForm={showForm}
        onToggleForm={handleToggleForm}
        onCloseForm={handleCloseForm}
        setShowForm={setShowForm}
      />
    </section>
  )
}

export default HeroSection
