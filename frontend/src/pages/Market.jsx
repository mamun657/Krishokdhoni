import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from '../components/Card';
import { getMarketPrice } from '../services/api';

const Market = () => {
    const [selectedCrop, setSelectedCrop] = useState('tomato');
    const [selectedMarket, setSelectedMarket] = useState('dhaka');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const crops = ['tomato', 'potato', 'rice', 'wheat', 'maize'];
    const markets = ['dhaka', 'chittagong', 'rajshahi', 'khulna'];

    useEffect(() => {
        fetchPrices();
    }, [selectedCrop, selectedMarket]);

    const fetchPrices = async () => {
        setLoading(true);
        try {
            const result = await getMarketPrice(selectedCrop, selectedMarket);
            setData(result);
            setError('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Error fetching market prices');
        } finally {
            setLoading(false);
        }
    };

    const combinedData = data ? [...data.historical, ...data.forecast] : [];

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary-600">
                Market Price Tracker
            </h1>

            <Card>
                <div className="flex gap-4 mb-6">
                    <select
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        className="p-2 border rounded"
                    >
                        {crops.map(crop => (
                            <option key={crop} value={crop}>
                                {crop.charAt(0).toUpperCase() + crop.slice(1)}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedMarket}
                        onChange={(e) => setSelectedMarket(e.target.value)}
                        className="p-2 border rounded"
                    >
                        {markets.map(market => (
                            <option key={market} value={market}>
                                {market.charAt(0).toUpperCase() + market.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {error && (
                    <div className="text-red-500 text-sm mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : data && (
                    <div className="overflow-x-auto">
                        <LineChart
                            width={800}
                            height={400}
                            data={combinedData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#16a34a"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>

                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                            <p>* Historical data shown in solid line</p>
                            <p>* Forecast data shown after current date</p>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Market;