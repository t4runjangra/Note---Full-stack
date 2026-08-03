import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Eye,
  EyeOff,
  NotebookPen,
  Shield,
  Cloud,
  FileText,
} from "lucide-react"
import { Link } from "react-router-dom"
function AuthShell({
  title,
  subtitle,
  children,
  footer,
  accentText,
}) {
  const reduceMotion = useReducedMotion()

  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      text: "JWT authentication keeps your account protected.",
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      text: "Your notes stay available wherever you sign in.",
    },
    {
      icon: FileText,
      title: "Organized Workspace",
      text: "Capture ideas, tasks and documents effortlessly.",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-8">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

          <motion.section
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center"
          >
            <Link to="/"  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
              
              <NotebookPen size={22} />

            </Link>

            <p className="mt-8 text-xs font-semibold tracking-[0.35em] text-blue-400 uppercase">
              Scribe
            </p>

            <h1 className="mt-4 max-w-md text-5xl font-bold leading-tight">
              Capture your ideas before they're gone.
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-slate-400">
              Write, organize and access your notes from anywhere in a clean,
              distraction-free workspace.
            </p>

            <div className="mt-10 space-y-4">
              {features.map((feature) => (
                <Feature key={feature.title} {...feature} />
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="p-10">

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                  {accentText}
                </p>

                <h2 className="mt-4 text-4xl font-bold">
                  {title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {subtitle}
                </p>

                <div className="mt-8">
                  {children}
                </div>

                <div className="mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
                  {footer}
                </div>

              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  )
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900">
        <Icon size={18} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-100">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {text}
        </p>
      </div>
    </div>
  )
}

export function AuthInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  icon: Icon,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500"
      >
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
        {Icon && (
          <span className="text-slate-400">
            <Icon size={18} />
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />
      </div>
    </div>
  )
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  showPassword,
  toggleVisibility,
  autoComplete,
  icon: Icon,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500"
      >
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
        {Icon && (
          <span className="text-slate-400">
            <Icon size={18} />
          </span>
        )}

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />

        <button
          type="button"
          onClick={toggleVisibility}
          className="rounded-md p-1 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  )
}

export function SubmitButton({
  loading,
  label,
  loadingLabel,
}) {
  return (
    <motion.button
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.15,
      }}
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span>
        {loading ? loadingLabel : label}
      </span>

      {!loading && <ArrowRight size={18} />}
    </motion.button>
  )
}

export default AuthShell
