import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios'
import { AuthContext } from '../context/AuthContext'
import AuthShell, { AuthInput, PasswordField, SubmitButton } from '../components/AuthShell.jsx'

function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { setUser } = useContext(AuthContext)

    async function handleSubmit(e) {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
        if (!passwordRegex.test(password)) {
            console.error('Password must be at least 8 characters and include uppercase, lowercase, and a number.')
            return
        }
        try {
            setLoading(true)
            const { data } = await API.post('/auth/register', {
                username,
                email,
                password
            })
            const userData = {
                _id: data.data.user._id,
                name: data.data.user.username,
                email: data.data.user.email
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
            title="Create your account"
            subtitle="Join a polished workspace built for thoughtful writing and quick capture."
            accentText="SIGN UP"
            isSignup
            footer={
                <>
                    Already have an account?{' '}
                    <Link to="/signin" className="font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400">
                        Sign in
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInput
                    id="username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="johndoe"
                    autoComplete="username"
                />

                <AuthInput
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                />

                <PasswordField
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    showPassword={showPassword}
                    toggleVisibility={() => setShowPassword((prev) => !prev)}
                    autoComplete="new-password"
                />

                <PasswordField
                    id="confirmPassword"
                    label="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    showPassword={showConfirmPassword}
                    toggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
                    autoComplete="new-password"
                />

                <SubmitButton loading={loading} label="Create account" loadingLabel="Creating account..." />
            </form>
        </AuthShell>
    )
}

export default Signup