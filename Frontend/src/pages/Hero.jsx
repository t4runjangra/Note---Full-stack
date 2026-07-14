import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../context/AuthContext";
import { useEffect } from "react";

function Hero() {
    const { user } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            navigate('/home')
        }
    }, [user])
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
            {/* Hero Section */}
            <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                    Powered by React 
                </span>

                <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-tight text-slate-900 dark:text-white md:text-7xl">
                    Capture ideas before
                    <span className="text-blue-600"> they disappear.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                    Create, organize, and access your notes from anywhere.
                    Secure authentication, cloud storage, and a distraction-free
                    writing experience.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <button className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
                        Get Started
                    </button>

                    <button className="rounded-2xl border border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                        Learn More
                    </button>
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
                <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-800">
                    <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                        Secure Authentication
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400">
                        Sign up and login securely with Auth and email
                        verification.
                    </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-800">
                    <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                        Cloud Notes
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400">
                        Your notes are stored in PostgreSQL and available across
                        devices.
                    </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-800">
                    <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                        Fast & Simple
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400">
                        Focus on writing and organizing ideas without unnecessary
                        complexity.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Hero

