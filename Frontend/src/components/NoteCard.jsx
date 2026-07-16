import { motion, useReducedMotion } from 'framer-motion'
import { SquarePen, Trash } from 'lucide-react'

function NoteCard({ id, title, content, date, onDelete, onUpdate }) {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
            className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h4>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {content}
                    </p>
                </div>
                <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{date}</span>
                    <div className="flex items-center gap-2">
                        <button
                            className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                            type="button"
                            onClick={() => onDelete(id)}
                            aria-label="Delete note"
                        >
                            <Trash size={16} />
                        </button>
                        <button
                            className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                            type="button"
                            onClick={onUpdate}
                            aria-label="Edit note"
                        >
                            <SquarePen size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}

export default NoteCard
