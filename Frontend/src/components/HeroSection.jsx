import { useState } from 'react'
import Note from './Note'


function HeroSection() {
  const [showForm, setShowForm] = useState(false)

  function handleToggleForm() {
    setShowForm((prev) => !prev)
  }

  function handleCloseForm() {
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 transition-colors duration-300 dark:bg-slate-950 sm:p-6">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40 sm:p-6 lg:p-8">

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="py-4">
            <h1 className="mb-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Write clearly. Keep your ideas close.
            </h1>
            <p className="mb-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              A simple space to capture your thoughts, plans, and reminders in a calm,
              clean layout.
            </p>
            <button
              className="rounded-full bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              type="button"
              onClick={handleToggleForm}
            >
              Create a note
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
              Quick preview
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Stay organized with light, easy-to-scan notes.
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-xl border border-blue-100 bg-white px-4 py-3 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                Daily plan
              </div>
              <div className="rounded-xl border border-blue-100 bg-white px-4 py-3 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                Shopping list
              </div>
              <div className="rounded-xl border border-blue-100 bg-white px-4 py-3 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                Project ideas
              </div>
            </div>
          </div>
        </div>

        <Note
          showForm={showForm}
          onToggleForm={handleToggleForm}
          onCloseForm={handleCloseForm}
          setShowForm={setShowForm}
        />
      </section>
    </div>
  )
}

export default HeroSection
