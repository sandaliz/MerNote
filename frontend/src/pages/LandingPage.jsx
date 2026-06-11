import { Link } from "react-router-dom";
import { FileText, Lock, Zap, ArrowRight, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserFromStorage } from "../lib/utils";

const LandingPage = () => {
    const [user, setUser] = useState(() => getUserFromStorage());
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "forest");
    const isDark = theme === "forest";

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const next = isDark ? "lemonade" : "forest";
        setTheme(next);
        localStorage.setItem("theme", next);
    };

    return (
        <div className="min-h-screen flex flex-col relative bg-base-300">
            {/* Subtle background effect */}
            <div className="fixed inset-0 -z-10">
                <div className={`absolute inset-0 h-full w-full transition-colors duration-300 ${
                    isDark
                        ? "bg-[radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"
                        : "bg-[radial-gradient(125%_125%_at_50%_10%,#e8f5e9_60%,#81c78440_100%)]"
                }`}></div>
            </div>

            {/* Navbar */}
            <header className="border-b border-base-content/10 w-full bg-base-300/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl sm:text-3xl font-bold text-primary font-mono tracking-tight">
                            MerNote
                        </h1>
                        <div className="flex items-center gap-3">
                            <button onClick={toggleTheme} className="btn btn-ghost btn-sm" aria-label="Toggle theme">
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            {user ? (
                                <Link to="/notes" className="btn btn-primary btn-sm">
                                    My Notes
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            ) : (
                                <div className="flex gap-2">
                                    <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
                                    <Link to="/signup" className="btn btn-sm btn-primary">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-grow flex items-center justify-center px-4 py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-8">
                        <Zap className="w-4 h-4" />
                        <span>Minimalist notes for the modern web</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-base-content">
                        Write. Organize.
                        <br />
                        <span className="text-primary">Stay in flow.</span>
                    </h2>

                    <p className="mt-6 text-base-content/70 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
                        MerNote is a clean, distraction-free notes app.
                        Create notes, organize them your way, and access them anywhere.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        {user ? (
                            <Link to="/notes" className="btn btn-primary btn-lg gap-2">
                                Go to My Notes
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        ) : (
                            <>
                                <Link to="/signup" className="btn btn-primary btn-lg gap-2">
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/login" className="btn btn-outline btn-lg">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Feature cards */}
                    <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                        <div className="p-6 rounded-xl border border-base-content/10 bg-base-200/70 backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-base-content mb-2">Simple Notes</h3>
                            <p className="text-sm text-base-content/60 leading-relaxed">
                                Create and edit notes with a clean editor. No clutter, just your content.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-base-content/10 bg-base-200/70 backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Lock className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-base-content mb-2">Private & Secure</h3>
                            <p className="text-sm text-base-content/60 leading-relaxed">
                                Your notes are private. Only you can access them with your account.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-base-content/10 bg-base-200/70 backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-base-content mb-2">Fast & Accessible</h3>
                            <p className="text-sm text-base-content/60 leading-relaxed">
                                Works everywhere. Instant load times. No unnecessary distractions.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-base-content/10 py-6 text-center text-sm text-base-content/40">
                <div className="max-w-7xl mx-auto px-4">
                    MerNote &mdash; built with the MERN stack
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;