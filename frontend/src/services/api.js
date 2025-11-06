import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL
});

// Add offline fallback interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            // Network error - check localStorage
            const path = error.config.url;
            const cachedData = localStorage.getItem(`cache_${path}`);
            if (cachedData) {
                return { data: JSON.parse(cachedData), cached: true };
            }
        }
        return Promise.reject(error);
    }
);

export const predictDisease = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    const response = await api.post('/predict_disease', formData);
    localStorage.setItem('cache_/predict_disease', JSON.stringify(response.data));
    return response.data;
};

export const recommendCrop = async (params) => {
    const response = await api.post('/recommend_crop', params);
    localStorage.setItem('cache_/recommend_crop', JSON.stringify(response.data));
    return response.data;
};

export const getMarketPrice = async (crop, market) => {
    const response = await api.get(`/market_price?crop=${crop}&market=${market}`);
    localStorage.setItem(`cache_/market_price_${crop}_${market}`, JSON.stringify(response.data));
    return response.data;
};

export const getWeather = async (city) => {
    const response = await api.get(`/weather?city=${encodeURIComponent(city)}`);
    localStorage.setItem(`cache_/weather_${city}`, JSON.stringify(response.data));
    return response.data;
};

export const submitVoiceQuery = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob);
    const response = await api.post('/voice_query', formData);
    return response.data;
};