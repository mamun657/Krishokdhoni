import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary-800 text-white mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold">কৃষকবন্ধু - Your AI Farming Companion</h3>
                        <p className="text-primary-200">Empowering farmers with AI technology</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-primary-200">About</a>
                        <a href="#" className="hover:text-primary-200">Contact</a>
                        <a href="#" className="hover:text-primary-200">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;