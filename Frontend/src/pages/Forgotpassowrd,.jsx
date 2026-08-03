import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react'
import API from '../api/axios.js'
import AuthShell, { AuthInput, SubmitButton } from '../components/AuthShell.jsx'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(null)

    function getErrorMessage(error) {
        return error?.response?.data?.message || 'Something went wrong. Please try again.'
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setFeedback(null)

        try {
            const { data } = await API.post('/auth/forget-password', { email })
            setFeedback({
                type: 'success',
                message: data?.message || 'If an account exists for this email, a password reset link has been sent.',
            })
        } catch (error) {
            setFeedback({ type: 'error', message: getErrorMessage(error) })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthShell
            title="Reset your password"
            subtitle="Enter the email linked to your account and we'll send you a link to set a new password."
            accentText="FORGOT PASSWORD"
            footer={
                <>
                    Remembered your password?{' '}
                    <Link to="/signin" className="font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400">
                        Sign in
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

                {feedback ? (
                    <div
                        className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
                            feedback.type === 'error'
                                ? 'border-red-900/50 bg-red-950/30 text-red-300'
                                : 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
                        }`}
                    >
                        {feedback.type === 'error' ? (
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        ) : (
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                        )}
                        <span>{feedback.message}</span>
                    </div>
                ) : null}

                <SubmitButton loading={loading} label="Send reset link" loadingLabel="Sending link..." />
            </form>
        </AuthShell>
    )
}

export default ForgotPassword