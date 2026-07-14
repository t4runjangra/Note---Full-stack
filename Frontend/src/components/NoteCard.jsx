import { Trash, SquarePen } from 'lucide-react'

function NoteCard({ id, title, content, date, onDelete, onUpdate }) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h4 className="flex-1 min-w-0 text-base font-semibold text-slate-900 dark:text-white">{title}</h4>
                <span className="shrink-0 text-sm text-slate-500 dark:text-slate-400">{date}</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <p className="flex-1 min-w-0 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {content}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        className="text-rose-500 transition hover:text-rose-600"
                        type="button"
                        onClick={() => onDelete(id)}
                    >
                        <Trash size={18} />
                    </button>
                    <button className="text-slate-600 transition hover:text-slate-800 dark:text-slate-300 dark:hover:text-white" type="button" onClick={onUpdate}>
                        <SquarePen size={18} />
                    </button>
                </div>
            </div>
        </article>
    )
}

export default NoteCard
