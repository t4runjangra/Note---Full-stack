import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Sparkles } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import Navbar from "../components/Navbar"
import useAuth from "../context/AuthContext"
import Profile from "./Profile"
import Settings from "./Settings"

function Layout() {
  const location = useLocation()
  const { user } = useAuth()
  const [activeView, setActiveView] = useState("Dashboard")
  const shouldReduceMotion = useReducedMotion()

  const showSidebar = Boolean(user) && location.pathname === "/home"

  const pageTransition = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.25, ease: "easeOut" },
      }

  const renderMainContent = () => {
    if (activeView === "Profile") {
      return <Profile />
    }

    if (activeView === "Settings") {
      return <Settings />
    }

    if (activeView === "Dashboard") {
      return (
        <div className="space-y-6">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 sm:p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-300">
                  <Sparkles size={15} />
                  Focused workspace
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Capture your next great idea.
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  Keep notes, priorities, and reflections in one calm place.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <div className="font-medium text-slate-900 dark:text-white">Today</div>
                <div className="mt-1">A few thoughtful updates ready to save.</div>
              </div>
            </div>
          </motion.div>

          <Outlet />
        </div>
      )
    }

    if (activeView === "Notes") {
      return (
        <div className="space-y-6">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 sm:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Notes
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  All your writing in one place
                </h2>
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Organized and easy to scan.
              </div>
            </div>
          </motion.div>

          <Outlet />
        </div>
      )
    }

    return (
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="rounded-[28px] border border-slate-200 bg-white/80 p-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/70"
      >
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Coming soon
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          This section is ready for future updates without affecting your existing workflow.
        </p>
      </motion.div>
    )
  }

  if (!showSidebar) {
    return (
      <div className="min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={location.pathname} {...pageTransition}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <Navbar activeView={activeView} onNavigate={setActiveView} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={location.pathname} {...pageTransition}>
                {renderMainContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout