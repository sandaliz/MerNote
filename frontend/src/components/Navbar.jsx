import { SunIcon, MoonIcon, UserIcon, SearchIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getUserFromStorage, clearAuthStorage } from "../lib/utils";

const Navbar = ({ searchQuery, setSearchQuery }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "forest");
    const [showProfile, setShowProfile] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [localQuery, setLocalQuery] = useState(searchQuery);
    const [user, setUser] = useState(() => getUserFromStorage());
    const profileRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        }

        if (showProfile) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showProfile]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchQuery(localQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [localQuery, setSearchQuery]);

    const toggleTheme = () => {
        setTheme(theme === "forest" ? "lemonade" : "forest");
    };

    const handleLogout = () => {
        clearAuthStorage();
        setUser(null);
        setShowProfile(false);
    };

    return (
        <header className="bg-base-300 border-b border-base-content/10 w-full">
            <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Left: Logo */}
                    <h1 className="text-xl sm:text-3xl font-bold text-primary font-mono tracking-tight">
                        MerNote
                    </h1>

                    {/* Right: Search + Theme + Auth */}
                    <div className="flex items-center gap-2 sm:gap-4 relative mr-1 sm:mr-4" ref={profileRef}>
                        {/* Mobile: search toggle */}
                        <button
                            className="sm:hidden btn btn-ghost p-2"
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                            aria-label="Toggle search"
                        >
                            {showMobileSearch ? <XIcon className="w-5 h-5" /> : <SearchIcon className="w-5 h-5" />}
                        </button>

                        {showMobileSearch && (
                            <input
                                type="text"
                                value={localQuery}
                                onChange={(e) => setLocalQuery(e.target.value)}
                                placeholder="Search notes..."
                                className="sm:hidden input input-sm border border-base-content/20 rounded-md px-2 py-1 focus:outline-none w-48 bg-base-100 placeholder:text-base-content/50 text-sm"
                            />
                        )}

                        {/* Desktop: search bar */}
                        <div className="hidden sm:flex items-center border border-base-content/20 rounded-md px-2">
                            <SearchIcon className="w-4 h-4 text-base-content/60" />
                            <input
                                type="text"
                                value={localQuery}
                                onChange={(e) => setLocalQuery(e.target.value)}
                                placeholder="Search notes..."
                                className="input input-sm border-none focus:outline-none w-40 bg-transparent placeholder:text-base-content/50 text-sm"
                            />
                        </div>

                        {/* Theme toggle */}
                        <button onClick={toggleTheme} className="btn btn-ghost p-2">
                            {theme === 'forest' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                        </button>

                        {/* Auth area */}
                        {user ? (
                            <>
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="btn flex items-center gap-2 bg-yellow-500 text-black hover:bg-yellow-600"
                                    aria-haspopup="true"
                                    aria-expanded={showProfile}
                                >
                                    <UserIcon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{user.username || "Profile"}</span>
                                </button>

                                {showProfile && (
                                    <div className="absolute right-0 top-12 bg-base-200 rounded shadow-lg p-4 w-52 z-50">
                                        <p className="text-sm font-semibold">👤 {user.username}</p>
                                        <p className="text-xs text-muted">{user.email}</p>
                                        <hr className="my-2" />
                                        <button className="btn btn-sm w-full">View Profile</button>
                                        <button className="btn btn-sm w-full btn-ghost" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
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
    )
}

export default Navbar
