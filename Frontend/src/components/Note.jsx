import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Archive, ChevronLeft, ChevronRight, LoaderCircle, Plus, Search, Sparkles, AlertCircle } from 'lucide-react'
import NoteCard from './NoteCard'
import API from '../api/axios'
import useAuth from '../context/AuthContext'
import useTheme from '../context/Theme'

const SORT_OPTIONS = [
    { value: 'updatedAt:desc', label: 'Newest first' },
    { value: 'updatedAt:asc', label: 'Oldest first' },
    { value: 'createdAt:desc', label: 'Created newest' },
    { value: 'createdAt:asc', label: 'Created oldest' },
    { value: 'title:asc', label: 'Title A-Z' },
    { value: 'title:desc', label: 'Title Z-A' },
]

const DEFAULT_PAGINATION = { page: 1, totalPages: 1, totalNotes: 0, hasNextPage: false, hasPreviousPage: false, limit: 6 }

function Note({ view = 'notes' }) {
    const [editingId, setEditingId] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [notes, setNotes] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [sortField, setSortField] = useState('updatedAt')
    const [sortOrder, setSortOrder] = useState('desc')
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION)
    const [feedback, setFeedback] = useState(null)
    const [pendingAction, setPendingAction] = useState(null)
    const [errors, setErrors] = useState({ title: '', content: '' })
    const [confirmingDeleteId, setConfirmingDeleteId] = useState(null)
    const shouldReduceMotion = useReducedMotion()
    const { user } = useAuth()
    const { themeMode } = useTheme()
    const isDarkMode = themeMode === 'dark'

    const isArchiveView = view === 'archive'
    const isTrashView = view === 'trash'
    const isNotesView = view === 'notes'

    function resetForm() {
        setTitle('')
        setContent('')
        setEditingId(null)
        setErrors({ title: '', content: '' })
    }

    function getGreeting() {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 18) return 'Good afternoon'
        return 'Good evening'
    }

    function getErrorMessage(error) {
        return error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.'
    }

    function getViewParams() {
        if (isArchiveView) return { archived: true }
        if (isTrashView) return { trash: true }
        return {}
    }

    async function fetchNotes({ pageNumber = page, search = debouncedSearch, sort = sortField, order = sortOrder } = {}) {
        setIsLoading(true)
        setFeedback(null)

        try {
            const response = await API.get('/note', {
                params: {
                    ...getViewParams(),
                    search,
                    sort,
                    order,
                    page: pageNumber,
                    limit: 6,
                },
            })

            const payload = response?.data?.data
            const fetchedNotes = Array.isArray(payload?.notes) ? payload.notes : []
            setNotes(fetchedNotes)
            setPagination(payload?.pagination || { ...DEFAULT_PAGINATION, totalNotes: fetchedNotes.length })
        } catch (error) {
            setFeedback({ type: 'error', message: getErrorMessage(error) })
            setNotes([])
            setPagination(DEFAULT_PAGINATION)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300)
        return () => clearTimeout(timer)
    }, [searchTerm])

    // Reset to page 1 whenever the view, search, or sort changes
    useEffect(() => {
        setPage(1)
        setShowForm(false)
        resetForm()
        setFeedback(null)
        setConfirmingDeleteId(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view])

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch, sortField, sortOrder])

    useEffect(() => {
        fetchNotes({ pageNumber: page, search: debouncedSearch, sort: sortField, order: sortOrder })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view, page, debouncedSearch, sortField, sortOrder])

    async function runAction(noteId, action, request, successMessage) {
        if (pendingAction?.noteId === noteId && pendingAction?.action === action) return

        setPendingAction({ noteId, action })
        setFeedback(null)

        try {
            await request()
            setFeedback({ type: 'success', message: successMessage })
            await fetchNotes({ pageNumber: page, search: debouncedSearch, sort: sortField, order: sortOrder })
        } catch (error) {
            setFeedback({ type: 'error', message: getErrorMessage(error) })
        } finally {
            setPendingAction(null)
        }
    }

    async function handleTogglePin(note) {
        const action = note.pinnedAt ? 'unpin' : 'pin'
        await runAction(
            note._id,
            action,
            () => API.patch(`/note/${note._id}/${action}`),
            action === 'pin' ? 'Note pinned successfully.' : 'Note unpinned successfully.'
        )
    }

    async function handleArchiveToggle(note) {
        if (isArchiveView) {
            await runAction(note._id, 'unarchive', () => API.patch(`/note/${note._id}/unarchive`), 'Note unarchived successfully.')
            return
        }
        await runAction(note._id, 'archive', () => API.patch(`/note/${note._id}/archive`), 'Note archived successfully.')
    }

    async function handleTrash(note) {
        await runAction(note._id, 'trash', () => API.patch(`/note/${note._id}/trash`), 'Note moved to trash.')
    }

    async function handleRestore(note) {
        await runAction(note._id, 'restore', () => API.patch(`/note/${note._id}/restore`), 'Note restored successfully.')
    }

    function handlePermanentDeleteRequest(noteId) {
        setConfirmingDeleteId(noteId)
    }

    function cancelPermanentDelete() {
        setConfirmingDeleteId(null)
    }

    async function confirmPermanentDelete(noteId) {
        setPendingAction({ noteId, action: 'permanent-delete' })
        setFeedback(null)
        try {
            await API.delete(`/note/${noteId}/permanent`)
            setFeedback({ type: 'success', message: 'Note deleted permanently.' })
            setConfirmingDeleteId(null)
            const isLastItemOnPage = notes.length === 1 && page > 1
            await fetchNotes({
                pageNumber: isLastItemOnPage ? page - 1 : page,
                search: debouncedSearch,
                sort: sortField,
                order: sortOrder,
            })
            if (isLastItemOnPage) setPage(page - 1)
        } catch (error) {
            setFeedback({ type: 'error', message: getErrorMessage(error) })
        } finally {
            setPendingAction(null)
        }
    }

    function validateForm() {
        const nextErrors = {
            title: !title.trim() ? 'Please add a title.' : '',
            content: !content.trim() ? 'Please add note content.' : '',
        }
        setErrors(nextErrors)
        return !nextErrors.title && !nextErrors.content
    }

    async function handleCreate(e) {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)
        setFeedback(null)

        try {
            if (editingId) {
                await API.patch(`/note/${editingId}`, { title: title.trim(), content: content.trim() })
                setFeedback({ type: 'success', message: 'Note updated.' })
            } else {
                await API.post('/note', { title: title.trim(), content: content.trim() })
                setFeedback({ type: 'success', message: 'Note created.' })
            }

            resetForm()
            setShowForm(false)
            await fetchNotes({ pageNumber: 1, search: debouncedSearch, sort: sortField, order: sortOrder })
            setPage(1)
        } catch (error) {
            setFeedback({ type: 'error', message: getErrorMessage(error) })
        } finally {
            setIsSubmitting(false)
        }
    }

    function handleEdit(note) {
        setTitle(note.title)
        setContent(note.content)
        setEditingId(note._id)
        setShowForm(true)
        setErrors({ title: '', content: '' })
    }

    function handleKeyDown(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleCreate(e)
        }
    }

    function goToPreviousPage() {
        if (pagination.hasPreviousPage && !isLoading) {
            setPage((current) => Math.max(1, current - 1))
        }
    }

    function goToNextPage() {
        if (pagination.hasNextPage && !isLoading) {
            setPage((current) => current + 1)
        }
    }

    const heading = isArchiveView ? 'Archive' : isTrashView ? 'Trash' : 'Notes'
    const subheading = isArchiveView
        ? 'Pinned away for later reference.'
        : isTrashView
        ? 'Recovered or permanently removed items.'
        : 'Capture ideas quickly and keep each note easy to revisit.'

    return (
        <section className="rounded-[28px] border border-slate-200 bg-slate-50/90 p-5 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/70 sm:p-6">
            <section
                className={`rounded-[28px] border p-6 shadow-[0_20px_45px_rgba(15,23,42,0.25)] transition-colors duration-300 sm:p-8 ${
                    isDarkMode
                        ? 'border-slate-700 bg-linear-to-br from-slate-900 via-slate-900 to-blue-950 text-white'
                        : 'border-slate-200 bg-white text-slate-900 shadow-slate-200/60'
                }`}
            >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                                isDarkMode
                                    ? 'border-white/15 bg-white/10 text-blue-100'
                                    : 'border-blue-100 bg-blue-50 text-blue-700'
                            }`}
                        >
                            <Sparkles size={14} />
                            {getGreeting()}, {user?.username || 'there'}
                        </div>
                        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">A calm workspace for your ideas.</h1>
                        <p className={`mt-3 max-w-2xl text-sm sm:text-base ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}>
                            Keep your thinking organized with focused notes, archive, and trash views that stay effortless on every screen size.
                        </p>
                    </div>
                    {isNotesView && (
                        <button
                            onClick={() => {
                                if (showForm) {
                                    resetForm()
                                }
                                setShowForm((current) => !current)
                            }}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                            type="button"
                        >
                            <Plus size={18} />
                            {showForm ? 'Close composer' : 'New note'}
                        </button>
                    )}
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
                    <div
                        className={`rounded-2xl border p-4 backdrop-blur ${
                            isDarkMode ? 'border-white/10 bg-white/10' : 'border-slate-200 bg-slate-50'
                        }`}
                    >
                        <p className="text-3xl font-semibold">{pagination.totalNotes}</p>
                        <p className={`mt-1 text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-500'}`}>{isArchiveView ? 'Archived notes' : isTrashView ? 'Trashed notes' : 'Total notes'}</p>
                    </div>
                    <div
                        className={`rounded-2xl border p-4 backdrop-blur ${
                            isDarkMode ? 'border-white/10 bg-white/10' : 'border-slate-200 bg-slate-50'
                        }`}
                    >
                        <p className="text-lg font-semibold">{notes.length ? new Date(notes[0].updatedAt || notes[0].createdAt).toLocaleDateString() : '—'}</p>
                        <p className={`mt-1 text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-500'}`}>Last updated</p>
                    </div>
                    <div
                        className={`rounded-2xl border p-4 backdrop-blur ${
                            isDarkMode ? 'border-white/10 bg-white/10' : 'border-slate-200 bg-slate-50'
                        }`}
                    >
                        <p className="text-lg font-semibold">{pagination.totalPages > 1 ? `Page ${pagination.page}` : 'Ready'}</p>
                        <p className={`mt-1 text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-500'}`}>Current view</p>
                    </div>
                    <div
                        className={`rounded-2xl border p-4 text-sm backdrop-blur ${
                            isDarkMode ? 'border-white/10 bg-white/10 text-slate-100' : 'border-slate-200 bg-slate-50 text-slate-600'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <Archive size={16} />
                            {isArchiveView ? 'Archive view' : isTrashView ? 'Trash view' : 'Active notes'}
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{heading}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subheading}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                        <Search size={16} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search notes"
                            className="w-full bg-transparent outline-none"
                        />
                    </label>
                    <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                        <span className="text-slate-400">Sort</span>
                        <select
                            value={`${sortField}:${sortOrder}`}
                            onChange={(event) => {
                                const [field, order] = event.target.value.split(':')
                                setSortField(field)
                                setSortOrder(order)
                            }}
                            className="bg-transparent outline-none"
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            {feedback ? (
                <div
                    className={`mt-5 flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
                        feedback.type === 'error'
                            ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300'
                            : 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300'
                    }`}
                >
                    {feedback.type === 'error' ? <AlertCircle size={16} className="shrink-0" /> : null}
                    {feedback.message}
                </div>
            ) : null}

            <AnimatePresence initial={false}>
                {isNotesView && showForm && (
                    <motion.form
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="mt-5 grid gap-3 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                        onSubmit={handleCreate}
                    >
                        <input
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                            type="text"
                            placeholder="Note title"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value)
                                setErrors((current) => ({ ...current, title: '' }))
                            }}
                        />
                        {errors.title ? <p className="text-sm text-red-500">{errors.title}</p> : null}
                        <textarea
                            className="min-h-36 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                            placeholder="Write something..."
                            value={content}
                            onKeyDown={handleKeyDown}
                            onChange={(event) => {
                                setContent(event.target.value)
                                setErrors((current) => ({ ...current, content: '' }))
                            }}
                        />
                        {errors.content ? <p className="text-sm text-red-500">{errors.content}</p> : null}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Tip: press Ctrl/Cmd + Enter to save quickly.</p>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={isSubmitting}
                                    className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                    onClick={() => {
                                        setShowForm(false)
                                        resetForm()
                                    }}
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -1 }}
                                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : null}
                                    {editingId ? 'Update note' : 'Save note'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {isLoading ? (
                <div className="mt-5 flex items-center justify-center rounded-2xl border border-slate-200 bg-white/70 py-10 text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                    <LoaderCircle size={20} className="mr-2 animate-spin" />
                    Loading notes...
                </div>
            ) : notes.length === 0 ? (
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-5 py-8 text-center dark:border-slate-700 dark:bg-slate-900/60"
                >
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">No notes here yet</h4>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        {isNotesView ? 'Create a fresh note to get started.' : 'This space is empty for now.'}
                    </p>
                </motion.div>
            ) : (
                <div className="mt-5 grid gap-3 xl:grid-cols-2">
                    <AnimatePresence initial={false}>
                        {notes.map((note, index) => {
                            const isBusy = pendingAction?.noteId === note._id
                            return (
                                <motion.div
                                    key={note._id}
                                    layout
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, delay: index * 0.03, ease: 'easeOut' }}
                                >
                                    <NoteCard
                                        id={note._id}
                                        title={note.title}
                                        content={note.content}
                                        date={new Date(note.updatedAt || note.createdAt).toLocaleString()}
                                        pinned={Boolean(note.pinnedAt)}
                                        archived={Boolean(note.archivedAt)}
                                        view={view}
                                        loading={isBusy}
                                        disabled={isBusy}
                                        onTogglePin={() => handleTogglePin(note)}
                                        onToggleArchive={() => handleArchiveToggle(note)}
                                        onTrash={() => handleTrash(note)}
                                        onRestore={() => handleRestore(note)}
                                        onPermanentDelete={() => handlePermanentDeleteRequest(note._id)}
                                        onUpdate={() => handleEdit(note)}
                                        confirmingDelete={confirmingDeleteId === note._id}
                                        onConfirmPermanentDelete={() => confirmPermanentDelete(note._id)}
                                        onCancelPermanentDelete={cancelPermanentDelete}
                                    />
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            )}

            {pagination.totalPages > 1 ? (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                    <div>
                        Page {pagination.page} of {pagination.totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 transition disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700"
                            onClick={goToPreviousPage}
                            disabled={!pagination.hasPreviousPage || isLoading}
                        >
                            <ChevronLeft size={16} /> Previous
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 transition disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700"
                            onClick={goToNextPage}
                            disabled={!pagination.hasNextPage || isLoading}
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            ) : null}
        </section>
    )
}

export default Note