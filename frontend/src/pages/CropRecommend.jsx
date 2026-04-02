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
            <h1 className="section-title brand-title text-3xl md:text-4xl font-bold text-center mb-8">
                Crop Recommendation
            </h1>

            <Card className="section-panel">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-muted">
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
                            className="range-brand"
                        />
                        <div className="text-center text-emerald-100">{formData.ph}</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-muted">
                            Soil Moisture (%)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            name="moisture"
                            value={formData.moisture}
                            onChange={handleChange}
                            className="range-brand"
                        />
                        <div className="text-center text-emerald-100">{formData.moisture}%</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-muted">
                            Temperature (°C)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            name="temp"
                            value={formData.temp}
                            onChange={handleChange}
                            className="range-brand"
                        />
                        <div className="text-center text-emerald-100">{formData.temp}°C</div>
                    </div>

                    {error && (
                        <div className="text-amber-300 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-brand w-full py-2.5 px-4"
                    >
                        {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
                    </button>
                </form>

                {result && (
                    <div className="mt-6 p-4 rounded-lg border border-emerald-200/20 bg-emerald-950/35">
                        <h3 className="font-semibold mb-3">Recommended Crops:</h3>
                        <div className="space-y-2">
                            {result.recommended.map((crop, index) => (
                                <div key={crop} className="flex justify-between items-center">
                                    <span>{crop}</span>
                                    <span className="text-sm text-muted">
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