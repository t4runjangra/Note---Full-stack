import useAuth from "../context/AuthContext"

function Profile() {
  const { user } = useAuth()

  const initial = (user?.username || user?.email || "U").charAt(0).toUpperCase()
  const avatar = user?.avatar || null
  const cover = user?.coverImage || null

  return (
    <div className="rounded-4xl border border-slate-200 bg-white/80 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 sm:p-6 lg:p-8">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 dark:border-slate-700">
        <div className="h-40 bg-linear-to-r from-blue-500 via-violet-500 to-cyan-400 sm:h-52" />

        <div className="bg-white px-5 pb-6 pt-0 dark:bg-slate-900 sm:px-8">
          <div className="-mt-10 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-slate-100 text-3xl font-semibold text-slate-700 shadow-lg dark:border-slate-900 dark:bg-slate-800 dark:text-slate-100 sm:h-28 sm:w-28">
                {avatar ? (
                  <img src={avatar} alt="User avatar" className="h-full w-full rounded-[20px] object-cover" />
                ) : (
                  initial
                )}
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {user?.username || "Your name"}
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {user?.email || "your@email.com"}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Edit Profile
            </button>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                Bio
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                A thoughtful collector of ideas, plans, and daily reflections.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                Quick details
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 dark:bg-slate-900">
                  <span>Username</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {user?.username || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 dark:bg-slate-900">
                  <span>Email</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {user?.email || "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
