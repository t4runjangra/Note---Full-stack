import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import Navbar from "../components/Navbar"
import useAuth from "../context/AuthContext"

function Layout() {
  const location = useLocation()
  const { user } = useAuth()
  const shouldReduceMotion = useReducedMotion()

  // 1. Sidebar rules: Show the sidebar only if a user is authenticated
  const showSidebar = Boolean(user)

  const pageTransition = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.25, ease: "easeOut" },
      }

  // PUBLIC LAYOUT: Rendered if no user session exists (Sign In / Sign Up pages)
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

  // PROTECTED WORKSPACE LAYOUT: Sidebar + Content pane side-by-side
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        
        {/* 2. Passed path context cleanly into your Navbar instead of local state variables */}
        <Navbar currentPath={location.pathname} />

        {/* 3. Re-introduced structural boundaries so items won't break layout lines */}
        <main className="flex-1 overflow-y-auto custom-scrollbar h-full">
          <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={location.pathname} {...pageTransition}>
                
                {/* 4. Let React Router control which component belongs here via URLs */}
                <Outlet />

              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout