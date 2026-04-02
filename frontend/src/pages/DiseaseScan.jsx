import React, { useState } from 'react';
import Card from '../components/Card';
import { predictDisease } from '../services/api';

const DiseaseScan = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
            setError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please select an image first');
            return;
        }

        setLoading(true);
        try {
            const data = await predictDisease(selectedFile);
            setResult(data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Error scanning image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="section-title brand-title text-3xl md:text-4xl font-bold text-center mb-8">
                Plant Disease Scanner
            </h1>

            <Card className="section-panel">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted">
                            Upload plant image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="input-brand"
                        />
                    </div>

                    {preview && (
                        <div className="mt-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-h-64 mx-auto rounded-lg"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="text-amber-300 text-sm mt-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !selectedFile}
                        className="btn-brand w-full py-2.5 px-4"
                    >
                        {loading ? 'Analyzing...' : 'Scan for Diseases'}
                    </button>
                </form>

                {result && (
                    <div className="mt-6 p-4 rounded-lg border border-emerald-200/20 bg-emerald-950/35 text-emerald-50">
                        <h3 className="font-semibold mb-2">Results:</h3>
                        <p>Disease: {result.disease}</p>
                        <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
                        <p className="mt-2">Advice: {result.advice}</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default DiseaseScan;