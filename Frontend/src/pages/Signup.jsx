import React, { useState, useContext } from 'react'
import { Link, useAsyncError, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import { AuthContext } from '../context/AuthContext'
function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            console.error("Password must be at least 8 characters and include uppercase, lowercase, and a number.");
            return;
        }
        try {
            setLoading(true)
            const { data } = await API.post("/auth/register", {
                username,
                email,
                password
            })
            const userData = {
                _id: data.data.user._id,
                name: data.data.user.username,
                email: data.data.user.email
            }
            console.log(data);
            console.log(userData);

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
                        Create Account
                    </h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        Sign up to start saving your notes.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="johndoe"
                            required
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="johndoe@gmail.com"
                            required
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
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
                            required
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
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
                    Already have an account?{' '}
                    <Link to="/signin">
                        <span className="cursor-pointer font-medium text-blue-600">
                            Sign In
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup