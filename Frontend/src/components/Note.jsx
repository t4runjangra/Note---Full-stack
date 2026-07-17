import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import NoteCard from './NoteCard'
import API from '../api/axios'
import useAuth from '../context/AuthContext'
function Note({ showForm, onToggleForm, onCloseForm, setShowForm }) {
    const [editingId, setEditingId] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [notes, setNotes] = useState([])
    const shouldReduceMotion = useReducedMotion()
    const { user } = useAuth()
    function resetForm() {
        setTitle('')
        setContent('')
        setEditingId(null)
    }

    const getNotes = async () => {
        try {
            const response = await API.get("/note")
            setNotes(response.data.data)
        } catch (error) {
            console.log("error while getting the notes", error)
        }
    }

    useEffect(() => {
        getNotes()
    }, [])

    async function handleDelete(id) {
        try {
            await API.delete(`/note/${id}`)
        } catch (error) {
            console.log("Error while deleting the note", error.message)
        }
        await getNotes()
    }

    async function handleCreate(e) {
        e.preventDefault()

        if (!title.trim() || !content.trim()) return

        if (editingId) {
            try {
                await API.patch(`/note/${editingId}`, {
                    title,
                    content
                })
            } catch (error) {
                console.log("Error while updating the note", error)
            }
        } else {
            try {
                await API.post("/note", {
                    title,
                    content
                })
            } catch (error) {
                console.log("Error while creating the note", error.message)
            }
        }
        await getNotes()
        onCloseForm()
        resetForm()
    }

    function handleEdit(note) {
        setTitle(note.title)
        setContent(note.content)
        setEditingId(note._id)
        setShowForm(true)
    }

    return (
        <section className="rounded-[28px] border border-slate-200 bg-slate-50/90 p-5 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/70 sm:p-6">
            <section className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

                <p className="text-sm text-blue-400">
                    Welcome back
                </p>

                <h1 className="mt-2 text-4xl font-bold text-white">
                    Good afternoon, {user?.username} 👋
                </h1>

                <p className="mt-4 max-w-2xl text-slate-400">
                    Stay organized. Capture ideas before they disappear.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-8">

                    <div>
                        <p className="text-3xl font-bold text-white">
                            {notes.length}
                        </p>
                        <p className="text-sm text-slate-400">
                            Total Notes
                        </p>
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-white">
                            {notes.length ? "Today" : "--"}
                        </p>
                        <p className="text-sm text-slate-400">
                            Last Updated
                        </p>
                    </div>

                    <button
                        onClick={onToggleForm}
                        className="ml-auto rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        + New Note
                    </button>

                </div>

            </section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Your notes</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Capture ideas quickly and keep each note easy to revisit.
                    </p>
                </div>

            </div>

            <AnimatePresence initial={false}>
                {showForm && (
                    <motion.form
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="mt-5 grid gap-3"
                        onSubmit={handleCreate}
                    >
                        <input
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                            type="text"
                            placeholder="Note title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="min-h-32 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                            placeholder="Write something..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <motion.button
                            whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -1 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                            className="w-full rounded-full bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-fit"
                            type="submit"
                        >
                            {editingId ? 'Update note' : 'Save note'}
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>

            {notes.length === 0 ? (
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-5 py-8 text-center dark:border-slate-700 dark:bg-slate-900/60"
                >
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">No notes yet</h4>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Start by creating your first note to build a clean personal workspace.
                    </p>
                </motion.div>
            ) : (
                <div className="mt-5 grid gap-3">
                    <AnimatePresence initial={false}>
                        {notes.map((note, index) => (
                            <motion.div
                                key={note._id}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, delay: index * 0.03, ease: 'easeOut' }}
                            >
                                <NoteCard
                                    id={note._id}
                                    title={note.title}
                                    content={note.content}
                                    date={new Date(note.createdAt || note.updatedAt).toLocaleString()}
                                    onDelete={handleDelete}
                                    onUpdate={() => handleEdit(note)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </section>
    )
}

export default Note
