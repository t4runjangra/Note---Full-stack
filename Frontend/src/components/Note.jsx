import { useEffect, useState } from 'react'
import NoteCard from './NoteCard'
import useAuth from '../context/AuthContext';
function Note({ showForm, onToggleForm, onCloseForm, setShowForm }) {
    const { user } = useAuth()
    const [editingId, setEditingId] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [notes, setNotes] = useState([])


    function resetForm() {
        setTitle('')
        setContent('')
        setEditingId(null)
    }

    const getNotes = async () => {
    }

    useEffect(() => {
        getNotes()
    }, [])

async function handleCreate(e) {
    e.preventDefault()

    if (!title.trim() || !content.trim()) return

    if (editingId) {

    } else {

    }

    onCloseForm()
    resetForm()
}


    function handleEdit(note) {
        setTitle(note.title)
        setContent(note.content)
        setEditingId(note.id)
        setShowForm(true)
    }


    return (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Your notes</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                        Simple and calm, just the essentials.
                    </p>
                </div>
                <button
                    className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
                    type="button"
                    onClick={onToggleForm}
                >
                    {showForm ? 'Cancel' : 'New note'}
                </button>
            </div>

            {showForm && (
                <form className="mt-4 grid gap-3" onSubmit={handleCreate}>
                    <input
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                        type="text"
                        placeholder="Note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="min-h-25 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                        placeholder="Write something..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button
                        className="w-full rounded-full bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-fit"
                        type="submit"
                    >
                        {editingId ? 'Update note' : 'Save note'}
                    </button>
                </form>
            )}

            <div className="mt-4 grid gap-3">
                {notes.map((note) => (
                    <NoteCard
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        content={note.content}
                        date={new Date(note.created_at).toLocaleString()}
                        onDelete={handleDelete}
                        onUpdate={() => handleEdit(note)}
                    />
                ))}
            </div>
        </section>

)
}
export default Note
