import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setDarkMode(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const navItems = [
        { to: '/disease-scan', label: 'Disease Scan' },
        { to: '/crop-recommend', label: 'Crop Recommendation' },
        { to: '/market', label: 'Market Prices' },
        { to: '/voice-assistant', label: 'Voice Assistant' }
    ];

    const navClass = ({ isActive }) =>
        `px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
            isActive
                ? 'bg-white/20 text-white'
                : 'text-emerald-100 hover:text-white hover:bg-white/10'
        }`;

    return (
        <header className="relative z-20 pt-4 md:pt-6 px-4">
            <div className="container mx-auto nav-glass rounded-2xl px-4 py-3 md:px-6 md:py-4">
                <div className="flex items-center justify-between gap-3">
                    <Link to="/" className="brand-title text-xl md:text-2xl font-bold tracking-wide text-emerald-50">
                        কৃষকবন্ধু
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink key={item.to} to={item.to} className={navClass}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleDarkMode}
                            className="btn-outline h-10 w-10 text-lg"
                            aria-label="Toggle theme"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="btn-outline h-10 w-10 text-base md:hidden"
                            aria-label="Toggle navigation"
                        >
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <nav className="md:hidden mt-3 grid gap-2 fade-in-up">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={navClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;