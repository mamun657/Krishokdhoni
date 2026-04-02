import React, { useState, useRef } from 'react';
import Card from '../components/Card';
import { submitVoiceQuery } from '../services/api';

const VoiceAssistant = () => {
    const [recording, setRecording] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                try {
                    const result = await submitVoiceQuery(audioBlob);
                    setResponse(result);
                    setError('');
                } catch (err) {
                    setError(err.response?.data?.detail || 'Error processing voice query');
                }
            };

            mediaRecorder.current.start();
            setRecording(true);
            setResponse(null);
            setError('');
        } catch (err) {
            setError('Error accessing microphone');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && recording) {
            mediaRecorder.current.stop();
            setRecording(false);
            mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="section-title brand-title text-3xl md:text-4xl font-bold text-center mb-8">
                Voice Assistant
            </h1>

            <Card className="section-panel">
                <div className="text-center space-y-6">
                    <button
                        onClick={recording ? stopRecording : startRecording}
                        className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl border border-white/20 shadow-lg transition-transform ${
                            recording 
                                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                : 'bg-emerald-500 hover:bg-emerald-600 hover:-translate-y-1'
                        } text-white`}
                    >
                        {recording ? '⏹️' : '🎤'}
                    </button>

                    <p className="text-lg text-muted">
                        {recording ? 'Recording... Click to stop' : 'Click to start recording'}
                    </p>

                    {error && (
                        <div className="text-amber-300 text-sm">
                            {error}
                        </div>
                    )}

                    {response && (
                        <div className="mt-8 space-y-4">
                            <div className="p-4 rounded-lg border border-emerald-100/20 bg-emerald-950/35">
                                <p className="text-lg mb-2">{response.text}</p>
                            </div>
                            
                            {response.audio_url && (
                                <audio
                                    controls
                                    src={`http://localhost:8000${response.audio_url}`}
                                    className="w-full"
                                >
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default VoiceAssistant;