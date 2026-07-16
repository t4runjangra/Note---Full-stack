import { motion, useReducedMotion } from 'framer-motion'

export default function Loading() {
    const shouldReduceMotion = useReducedMotion()

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-slate-900">
            <motion.section
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full max-w-4xl rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-800/70"
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <div className="h-6 w-32 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <div className="h-4 w-56 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                    </div>
                    <div className="h-10 w-28 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                </div>

                <div className="mt-6 grid gap-3">
                    <div className="h-12 w-full rounded-2xl bg-slate-100 dark:bg-slate-700/50"></div>
                    <div className="h-24 w-full rounded-2xl bg-slate-100 dark:bg-slate-700/50"></div>
                    <div className="h-11 w-full rounded-full bg-slate-200 dark:bg-slate-700 sm:w-28"></div>
                </div>

                <div className="mt-6 grid gap-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center"
                        >
                            <div className="w-full space-y-2.5">
                                <div className="h-5 w-1/3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                <div className="h-4 w-3/4 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                                <div className="h-4 w-1/2 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                                <div className="h-3 w-24 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                            </div>

                            <div className="flex gap-2 self-end sm:self-center">
                                <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-slate-700"></div>
                                <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-slate-700"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    )
}