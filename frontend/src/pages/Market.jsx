import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
            <h1 className="section-title brand-title text-3xl md:text-4xl font-bold text-center mb-8">
                Market Price Tracker
            </h1>

            <Card className="section-panel">
                <div className="flex gap-4 mb-6">
                    <select
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        className="select-brand"
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
                        className="select-brand"
                    >
                        {markets.map(market => (
                            <option key={market} value={market}>
                                {market.charAt(0).toUpperCase() + market.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {error && (
                    <div className="text-amber-300 text-sm mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-8 text-muted">Loading...</div>
                ) : data && (
                    <div className="overflow-x-auto">
                        <div className="h-[360px] rounded-xl border border-emerald-100/20 bg-emerald-950/30 p-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={combinedData}
                                    margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(220,255,236,0.18)" />
                                    <XAxis dataKey="date" stroke="#b6e9d2" />
                                    <YAxis stroke="#b6e9d2" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(6, 38, 27, 0.95)',
                                            border: '1px solid rgba(174, 255, 222, 0.24)',
                                            borderRadius: '10px',
                                            color: '#eefff7'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#5bea98"
                                        strokeWidth={3}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 text-sm text-muted">
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