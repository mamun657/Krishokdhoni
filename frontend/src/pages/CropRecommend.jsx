import React, { useState } from 'react';
import Card from '../components/Card';
import { recommendCrop } from '../services/api';

const CropRecommend = () => {
    const [formData, setFormData] = useState({
        ph: 6.5,
        moisture: 60,
        temp: 25
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await recommendCrop(formData);
            setResult(data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Error getting recommendations');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary-600">
                Crop Recommendation
            </h1>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Soil pH (0-14)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="14"
                            step="0.1"
                            name="ph"
                            value={formData.ph}
                            onChange={handleChange}
                            className="w-full"
                        />
                        <div className="text-center">{formData.ph}</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Soil Moisture (%)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            name="moisture"
                            value={formData.moisture}
                            onChange={handleChange}
                            className="w-full"
                        />
                        <div className="text-center">{formData.moisture}%</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Temperature (°C)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            name="temp"
                            value={formData.temp}
                            onChange={handleChange}
                            className="w-full"
                        />
                        <div className="text-center">{formData.temp}°C</div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                    >
                        {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
                    </button>
                </form>

                {result && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="font-semibold mb-3">Recommended Crops:</h3>
                        <div className="space-y-2">
                            {result.recommended.map((crop, index) => (
                                <div key={crop} className="flex justify-between items-center">
                                    <span>{crop}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {(result.probabilities[crop] * 100).toFixed(1)}% match
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default CropRecommend;