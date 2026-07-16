import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import API from '../api/axios.js'
import { AuthContext } from '../context/AuthContext.jsx'
import AuthShell, { AuthInput, PasswordField, SubmitButton } from '../components/AuthShell.jsx'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { setUser } = useContext(AuthContext)

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
            console.log(error.response?.data)
            console.log(error.response?.status)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthShell
            title="Welcome back"
            subtitle="Sign in to continue capturing ideas in your calm workspace."
            accentText="SIGN IN"
            footer={
                <>
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" className="font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400">
                        Create one
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <AuthInput
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    icon={Mail}
                />

                <PasswordField
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    showPassword={showPassword}
                    toggleVisibility={() => setShowPassword((prev) => !prev)}
                    autoComplete="current-password"
                    icon={Lock}
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="inline-flex items-center gap-2 text-sm text-slate-400">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
                        />
                        Remember me
                    </label>
                    <button type="button" className="text-sm font-medium text-slate-300 transition hover:text-blue-400">
                        Forgot password?
                    </button>
                </div>

                <SubmitButton loading={loading} label="Sign in" loadingLabel="Signing in..." />

            </form>
        </AuthShell>
    )
}

export default Login