import { Link, Navigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { NotebookPen } from "lucide-react";

function Hero() {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">

            {/* Navbar */}
            <header className="border-b border-slate-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-tight flex justify-center items-center gap-2"
                    >
                        <NotebookPen size={22} />

                        My Notes
                    </Link>

                    <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
                        <a href="#features" className="hover:text-white">
                            Features
                        </a>

                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white"
                        >
                            GitHub
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/signin"
                            className="rounded-xl px-5 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                        >
                            Sign In
                        </Link>

                        <Link
                            to="/signup"
                            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                    Secure • Fast • Cloud Based
                </span>

                <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
                    Capture ideas before
                    <span className="text-blue-500"> they disappear.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-slate-400">
                    Organize your thoughts, projects, and daily notes in one
                    distraction-free workspace with secure authentication and
                    cloud storage.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">

                    <Link
                        to="/signup"
                        className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-700"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/signin"
                        className="rounded-2xl border border-slate-700 px-8 py-4 text-lg font-semibold transition hover:bg-slate-800"
                    >
                        Sign In
                    </Link>

                </div>
            </section>

            {/* Features */}
            <section
                id="features"
                className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3"
            >
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <h3 className="mb-3 text-xl font-semibold">
                        Secure Authentication
                    </h3>

                    <p className="text-slate-400">
                        JWT authentication with refresh-token rotation keeps
                        your account protected.
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <h3 className="mb-3 text-xl font-semibold">
                        Cloud Notes
                    </h3>

                    <p className="text-slate-400">
                        Access your notes anywhere with automatic cloud
                        synchronization.
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <h3 className="mb-3 text-xl font-semibold">
                        Built for Productivity
                    </h3>

                    <p className="text-slate-400">
                        A clean workspace designed to help you focus on writing,
                        organizing, and sharing ideas.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Hero;