# Krishokdhoni - AI-Powered Farming Assistant

A full-stack prototype combining React frontend and FastAPI backend to help farmers with crop management, disease detection, market analysis, and voice assistance.

## Features

- 🔍 Plant disease detection using TensorFlow Lite
- 🌾 Crop recommendation based on soil and weather conditions
- 📊 Market price tracking and forecasting
- 🎤 Voice assistant with Bangla support
- ☁️ Weather information integration

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API calls

### Backend
- FastAPI (Python)
- TensorFlow Lite for image classification
- scikit-learn for crop recommendations
- SpeechRecognition + gTTS for voice processing
- SQLite for data storage

## Project Structure

```
/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── services/      # API service layer
│   └── ...
│
└── backend/               # FastAPI backend
    ├── models/            # ML models and Pydantic schemas
    ├── utils/            # Helper functions
    ├── data/             # Dataset files
    └── main.py           # FastAPI application
```

## Setup & Running

### Backend Setup

1. Create and activate virtual environment:
   ```bash
   cd backend
   python -m venv .venv
   # On Windows:
   .venv\Scripts\activate
   # On Unix/macOS:
   source .venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Add your OpenWeatherMap API key to .env
   ```

4. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

   The API will be available at http://localhost:8000

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at http://localhost:5173

## API Endpoints

### POST /api/predict_disease
Upload a plant image to detect diseases.

```bash
curl -X POST -F "file=@leaf_image.jpg" http://localhost:8000/api/predict_disease
```

### POST /api/recommend_crop
Get crop recommendations based on soil parameters.

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"ph": 6.5, "moisture": 60, "temp": 25}' \
  http://localhost:8000/api/recommend_crop
```

### GET /api/market_price
Get historical prices and forecast for crops.

```bash
curl "http://localhost:8000/api/market_price?crop=tomato&market=dhaka"
```

### GET /api/weather
Get weather information for a location.

```bash
curl "http://localhost:8000/api/weather?city=Dhaka"
```

### POST /api/voice_query
Submit voice query and get audio response.

```bash
curl -X POST -F "file=@query.wav" http://localhost:8000/api/voice_query
```

## Development Notes

### Adding Real Models

1. Place your TFLite model in `backend/models/plant_disease_model.tflite`
2. Update the crop recommendation model:
   ```bash
   cd backend
   python utils/train_models.py
   ```

### Security Notes

- File upload size is limited to 10MB
- API includes CORS configuration for frontend origin
- Implement authentication before production use

### Adding New Features

1. Add new endpoint in `backend/main.py`
2. Create corresponding API method in `frontend/src/services/api.js`
3. Add new page component in `frontend/src/pages/`
4. Update routes in `App.jsx`

## License

MIT