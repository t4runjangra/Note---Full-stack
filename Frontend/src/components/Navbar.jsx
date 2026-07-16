import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Archive, FileText, LayoutGrid, LogOut, MoonStar, Settings, SunMedium, Trash2, UserRound, Users, X, Menu } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import useAuth from "../context/AuthContext"
import useTheme from "../context/Theme"

const navigationItems = [
  { key: "Dashboard", label: "Dashboard", icon: LayoutGrid, comingSoon: false },
  { key: "Notes", label: "Notes", icon: FileText, comingSoon: false },
  { key: "Profile", label: "Profile", icon: UserRound, comingSoon: false },
  { key: "Shared Notes", label: "Shared Notes", icon: Users, comingSoon: true },
  { key: "Archive", label: "Archive", icon: Archive, comingSoon: true },
  { key: "Trash", label: "Trash", icon: Trash2, comingSoon: true },
  { key: "Settings", label: "Settings", icon: Settings, comingSoon: false }
]

function Navbar({ activeView = "Dashboard", onNavigate = () => {} }) {
  const { themeMode, lightTheme, darkTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  function handleChange(e) {
    if (e.currentTarget.checked) {
      darkTheme()
    } else {
      lightTheme()
    }
  }

  async function handleLogout() {
    await logout()
    navigate("/")
  }

  const renderNavItems = () => (
    <div className="space-y-1.5">
      {navigationItems.map((item) => {
        const Icon = item.icon
        const isActive = activeView === item.key
        const isDisabled = item.comingSoon

        return (
          <motion.button
            key={item.key}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -1 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            type="button"
            onClick={() => {
              if (!isDisabled) {
                onNavigate(item.key)
                setMenuOpen(false)
              }
            }}
            className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : isDisabled
                  ? "cursor-not-allowed text-slate-400 dark:text-slate-500"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <span className="flex items-center gap-3">
              <Icon size={18} />
              {item.label}
            </span>
            {item.comingSoon ? (
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                Soon
              </span>
            ) : null}
          </motion.button>
        )
      })}
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/50 transition ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"} lg:hidden`}
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white/95 px-4 py-5 shadow-[12px_0_30px_rgba(15,23,42,0.06)] backdrop-blur transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900/95 lg:sticky lg:translate-x-0 lg:top-0 lg:h-screen ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-violet-500 text-lg font-semibold text-white shadow-lg">
              M
            </div>
            <div>
              <div className="text-base font-semibold text-slate-900 dark:text-white">My Notes</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Workspace</div>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-800/70">
          <label className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Theme</span>
            <div className="flex items-center gap-3">
              <SunMedium size={16} className="text-slate-400" />
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  onChange={handleChange}
                  checked={themeMode === "dark"}
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-slate-700 dark:after:border-slate-600" />
              </label>
              <MoonStar size={16} className="text-slate-400" />
            </div>
          </label>
        </div>

        <div className="mt-6">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
            Navigation
          </p>
          {renderNavItems()}
        </div>

        <div className="mt-auto space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-slate-700 to-slate-500 font-semibold text-white dark:from-blue-500 dark:to-violet-500">
              {user?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {user?.username || user?.email || "Guest"}
              </div>
              <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                {user?.email || "Sign in to continue"}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export default Navbar