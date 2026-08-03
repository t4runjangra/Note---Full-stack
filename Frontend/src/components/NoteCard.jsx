import { motion, useReducedMotion } from 'framer-motion'
import { ArchiveRestore, Archive, Pin, PinOff, SquarePen, Trash2, RotateCcw, LoaderCircle, Trash, Check, X } from 'lucide-react'

function NoteCard({
    id,
    title,
    content,
    date,
    pinned,
    archived,
    view,
    loading,
    onTogglePin,
    onToggleArchive,
    onTrash,
    onRestore,
    onPermanentDelete,
    onUpdate,
    confirmingDelete = false,
    onConfirmPermanentDelete,
    onCancelPermanentDelete,
}) {
    const shouldReduceMotion = useReducedMotion()

    const actionButtonClass = 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'

    return (
        <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
            className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        {pinned ? (
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                                <Pin size={12} className="mr-1" /> Pinned
                            </span>
                        ) : null}
                        {archived ? (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                                <Archive size={12} className="mr-1" /> Archived
                            </span>
                        ) : null}
                    </div>
                    <h4 className="mt-3 text-base font-semibold text-slate-900 dark:text-white">{title}</h4>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {content}
                    </p>
                </div>
                <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{date}</span>
                    <div className="flex items-center gap-2">
                        {view === 'trash' ? (
                            confirmingDelete ? (
                                <>
                                    <span className="text-xs font-medium text-red-600 dark:text-red-400">Delete forever?</span>
                                    <button
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
                                        type="button"
                                        onClick={() => onConfirmPermanentDelete(id)}
                                        disabled={loading}
                                        aria-label="Confirm permanent delete"
                                    >
                                        {loading ? <LoaderCircle size={16} className="animate-spin" /> : <Check size={16} />}
                                    </button>
                                    <button
                                        className={actionButtonClass}
                                        type="button"
                                        onClick={() => onCancelPermanentDelete(id)}
                                        disabled={loading}
                                        aria-label="Cancel permanent delete"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className={actionButtonClass} type="button" onClick={() => onRestore(id)} disabled={loading} aria-label="Restore note">
                                        {loading ? <LoaderCircle size={16} className="animate-spin" /> : <RotateCcw size={16} />}
                                    </button>
                                    <button className={actionButtonClass} type="button" onClick={() => onPermanentDelete(id)} disabled={loading} aria-label="Delete note permanently">
                                        {loading ? <LoaderCircle size={16} className="animate-spin" /> : <Trash size={16} />}
                                    </button>
                                </>
                            )
                        ) : (
                            <>
                                <button className={actionButtonClass} type="button" onClick={() => onTogglePin(id)} disabled={loading} aria-label={pinned ? 'Unpin note' : 'Pin note'}>
                                    {loading ? <LoaderCircle size={16} className="animate-spin" /> : pinned ? <PinOff size={16} /> : <Pin size={16} />}
                                </button>
                                <button className={actionButtonClass} type="button" onClick={() => onToggleArchive(id)} disabled={loading} aria-label={archived ? 'Unarchive note' : 'Archive note'}>
                                    {loading ? <LoaderCircle size={16} className="animate-spin" /> : archived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
                                </button>
                                <button className={actionButtonClass} type="button" onClick={() => onTrash(id)} disabled={loading} aria-label="Move note to trash">
                                    {loading ? <LoaderCircle size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                </button>
                                <button className={actionButtonClass} type="button" onClick={onUpdate} disabled={loading} aria-label="Edit note">
                                    {loading ? <LoaderCircle size={16} className="animate-spin" /> : <SquarePen size={16} />}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    )
}

export default NoteCard