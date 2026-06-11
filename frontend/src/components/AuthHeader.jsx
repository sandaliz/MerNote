import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const AuthHeader = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "forest");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const next = theme === "forest" ? "lemonade" : "forest";
        setTheme(next);
        localStorage.setItem("theme", next);
    };

    return (
        <header className="border-b border-base-content/10 w-full bg-base-300/80 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-xl sm:text-2xl font-bold text-primary font-mono tracking-tight no-underline">
                        MerNote
                    </Link>
                    <div className="flex items-center gap-3">
                        <button onClick={toggleTheme} className="btn btn-ghost btn-sm" aria-label="Toggle theme">
                            {theme === "forest" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <Link to="/" className="btn btn-sm btn-outline">Home</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AuthHeader;