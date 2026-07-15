import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios.js'
import { AuthContext } from '../context/AuthContext.jsx'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await API.post("/auth/login", {
                email,
                password
            })
            const userData = {
                _id: data.data.user._id,
                email: data.data.user.email,
                username: data.data.user.username
            }
            setUser(userData)

        } catch (error) {
            console.log(error.response?.data);
            console.log(error.response?.status);
        }
        finally {
            setLoading(false)

        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-900">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        Login to access your notes.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="johndoe@gmail.com"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div className="my-6 flex items-center">
                        <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700"></div>

                        <span className="px-4 text-sm text-slate-500 dark:text-slate-400">
                            OR
                        </span>

                        <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700"></div>
                    </div>
                </form>



                <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                    Don&apos;t have an account?{' '}
                    <Link to="/signup">
                        <span className="cursor-pointer font-medium text-blue-600">
                            Sign Up
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login