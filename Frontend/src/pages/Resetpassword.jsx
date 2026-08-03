import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react'
import API from '../api/axios.js'
import AuthShell, { PasswordField, SubmitButton } from '../components/AuthShell.jsx'

const PASSWORD_RULES = [
    { test: (value) => value.length >= 8, label: 'At least 8 characters' },
    { test: (value) => /[A-Z]/.test(value), label: 'One uppercase letter' },
    { test: (value) => /[a-z]/.test(value), label: 'One lowercase letter' },
    { test: (value) => /[0-9]/.test(value), label: 'One number' },
]

function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(null)
    const [success, setSuccess] = useState(false)

    function getErrorMessage(error) {
        return error?.response?.data?.message || 'Something went wrong. Please try again.'
    }

    function validate() {
        const failedRule = PASSWORD_RULES.find((rule) => !rule.test(newPassword))
        if (failedRule) {
            return `Password requirement missing: ${failedRule.label.toLowerCase()}.`
        }
        if (newPassword !== confirmPassword) {
            return 'Passwords do not match.'
        }
        return ''
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!token) {
            setFeedback({ type: 'error', message: 'This reset link is missing its token. Please request a new one.' })
            return
        }

        const validationError = validate()
        if (validationError) {
            setFeedback({ type: 'error', message: validationError })
            return
        }

        setLoading(true)
        setFeedback(null)

        try {
            const { data } = await API.post(`/auth/reset-password/${token}`, { newPassword })
            setSuccess(true)
            setFeedback({ type: 'success', message: data?.message || 'Password reset successful.' })
            setTimeout(() => navigate('/signin', { replace: true }), 2000)
        } catch (error) {
            setFeedback({ type: 'error', message: getErrorMessage(error) })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthShell
            title="Set a new password"
            subtitle="Choose a strong new password to finish resetting your account."
            accentText="RESET PASSWORD"
            footer={
                <>
                    Remembered it after all?{' '}
                    <Link to="/signin" className="font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400">
                        Sign in
                    </Link>
                </>
            }
        >
            {success ? (
                <div className="flex items-start gap-2 rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    <span>{feedback?.message} Redirecting you to sign in...</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <PasswordField
                        id="newPassword"
                        label="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter a new password"
                        showPassword={showPassword}
                        toggleVisibility={() => setShowPassword((prev) => !prev)}
                        autoComplete="new-password"
                        icon={Lock}
                    />

                    <PasswordField
                        id="confirmPassword"
                        label="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your new password"
                        showPassword={showConfirmPassword}
                        toggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
                        autoComplete="new-password"
                        icon={Lock}
                    />

                    <ul className="grid grid-cols-1 gap-1 text-xs text-slate-500 sm:grid-cols-2">
                        {PASSWORD_RULES.map((rule) => {
                            const met = rule.test(newPassword)
                            return (
                                <li key={rule.label} className={`flex items-center gap-1.5 ${met ? 'text-emerald-400' : 'text-slate-500'}`}>
                                    <CheckCircle2 size={14} className={met ? 'opacity-100' : 'opacity-30'} />
                                    {rule.label}
                                </li>
                            )
                        })}
                    </ul>

                    {feedback ? (
                        <div
                            className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
                                feedback.type === 'error'
                                    ? 'border-red-900/50 bg-red-950/30 text-red-300'
                                    : 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
                            }`}
                        >
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            <span>{feedback.message}</span>
                        </div>
                    ) : null}

                    <SubmitButton loading={loading} label="Reset password" loadingLabel="Resetting..." />
                </form>
            )}
        </AuthShell>
    )
}

export default ResetPassword