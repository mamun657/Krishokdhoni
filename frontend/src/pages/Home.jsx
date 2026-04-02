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
            <div className="text-center mb-10 md:mb-12 fade-in-up">
                <span className="highlight-chip mb-4">Smart Agriculture Dashboard</span>
                <h1 className="section-title brand-title text-4xl md:text-5xl font-bold mb-4">
                    কৃষকবন্ধু — Your AI Farming Companion
                </h1>
                <p className="section-subtitle text-lg md:text-xl max-w-2xl mx-auto">
                    AI-powered tools for disease scan, crop planning, market intelligence, and voice guidance in one unified workspace.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                    <Link key={index} to={feature.link} className="block">
                        <Card className="h-full hover:-translate-y-1 transition-transform duration-200 fade-in-up" style={{ animationDelay: `${index * 90}ms` }}>
                            <div className="flex items-start space-x-4">
                                <span className="text-4xl">{feature.icon}</span>
                                <div>
                                    <h3 className="section-title text-xl font-semibold mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted">
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