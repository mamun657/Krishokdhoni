import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = () => {
    const features = [
        {
            title: "Disease Detection",
            description: "Scan plant leaves to identify diseases and get treatment advice",
            icon: "🔍",
            link: "/disease-scan"
        },
        {
            title: "Crop Recommendation",
            description: "Get personalized crop suggestions based on soil and weather conditions",
            icon: "🌾",
            link: "/crop-recommend"
        },
        {
            title: "Market Prices",
            description: "Track and forecast agricultural market prices",
            icon: "📊",
            link: "/market"
        },
        {
            title: "Voice Assistant",
            description: "Get farming advice through voice interaction in Bangla",
            icon: "🎤",
            link: "/voice-assistant"
        }
    ];

    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-primary-600 mb-4">
                    কৃষকবন্ধু — Your AI Farming Companion
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Empowering farmers with artificial intelligence
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                    <Link key={index} to={feature.link}>
                        <Card className="h-full hover:shadow-lg transition-shadow">
                            <div className="flex items-start space-x-4">
                                <span className="text-4xl">{feature.icon}</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-primary-600">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;