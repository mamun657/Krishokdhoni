import React from 'react';

const Footer = () => {
    return (
        <footer className="relative z-10 mt-12 px-4 pb-5">
            <div className="container mx-auto section-panel px-4 py-6 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <h3 className="brand-title text-lg font-semibold text-emerald-50">কৃষকবন্ধু - Your AI Farming Companion</h3>
                        <p className="text-sm text-muted">Empowering farmers with practical AI technology</p>
                    </div>
                    <div className="flex space-x-3 text-sm">
                        <a href="#" className="btn-outline px-3 py-1.5">About</a>
                        <a href="#" className="btn-outline px-3 py-1.5">Contact</a>
                        <a href="#" className="btn-outline px-3 py-1.5">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;