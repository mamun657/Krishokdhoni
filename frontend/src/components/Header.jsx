import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="bg-primary-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">কৃষকবন্ধু</Link>
                    
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/disease-scan" className="hover:text-primary-200">Disease Scan</Link>
                        <Link to="/crop-recommend" className="hover:text-primary-200">Crop Recommendation</Link>
                        <Link to="/market" className="hover:text-primary-200">Market Prices</Link>
                        <Link to="/voice-assistant" className="hover:text-primary-200">Voice Assistant</Link>
                    </nav>

                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg bg-primary-700 hover:bg-primary-800"
                    >
                        {darkMode ? '🌞' : '🌙'}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;