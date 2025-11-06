from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import json
import numpy as np
from pathlib import Path
from datetime import datetime, timedelta
import os.path
from dotenv import load_dotenv
from typing import List, Dict, Optional
import tempfile

from utils.image_utils import preprocess_image
from utils.ml_utils import load_models, predict_crop
from utils.audio_utils import process_voice_query
from models.base_models import (
    CropRecommendRequest,
    CropRecommendResponse,
    MarketPriceResponse,
    WeatherResponse,
    DiseaseResponse
)

# Load environment variables
load_dotenv()

app = FastAPI(title="Krishokdhoni API", description="AI-powered farming assistant")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create static directory for audio files
STATIC_DIR = Path("static")
STATIC_DIR.mkdir(exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Load ML models
disease_model, crop_model = load_models()

@app.post("/api/predict_disease", response_model=DiseaseResponse)
async def predict_disease(file: UploadFile = File(...)):
    """
    Predict plant disease from uploaded image
    """
    try:
        # Read and preprocess image
        image = await file.read()
        processed_image = preprocess_image(image)
        
        # Run inference
        prediction = disease_model.predict(processed_image)
        disease = "Leaf Blight"  # Dummy prediction for prototype
        confidence = float(prediction[0][0])
        
        return {
            "disease": disease,
            "confidence": confidence,
            "advice": "Apply neem oil spray and ensure proper spacing between plants."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/recommend_crop", response_model=CropRecommendResponse)
async def recommend_crop(data: CropRecommendRequest):
    """
    Recommend crops based on soil and weather parameters
    """
    try:
        crops, probabilities = predict_crop(
            data.ph, data.moisture, data.temp
        )
        return {
            "recommended": crops,
            "probabilities": probabilities
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/market_price", response_model=MarketPriceResponse)
async def get_market_price(crop: str, market: str):
    """
    Get historical prices and forecast for a crop in a specific market
    """
    try:
        # Load sample data for prototype
        historical = [
            {"date": (datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d"),
             "price": float(np.random.randint(50, 100))}
            for i in range(30, 0, -1)
        ]
        
        forecast = [
            {"date": (datetime.now() + timedelta(days=i)).strftime("%Y-%m-%d"),
             "price": float(np.random.randint(60, 110))}
            for i in range(1, 8)
        ]
        
        return {
            "historical": historical,
            "forecast": forecast
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/weather", response_model=WeatherResponse)
async def get_weather(city: str):
    """
    Get current weather and forecast using OpenWeatherMap API
    """
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        # Return sample data if API key not configured
        return {
            "city": city,
            "temp": 28.5,
            "humidity": 75,
            "description": "Partly cloudy",
            "forecast": [
                {"date": "2025-11-07", "temp": 29.0, "description": "Sunny"},
                {"date": "2025-11-08", "temp": 28.0, "description": "Light rain"},
                {"date": "2025-11-09", "temp": 27.5, "description": "Cloudy"}
            ]
        }
    
    # TODO: Implement actual OpenWeatherMap API call here
    raise HTTPException(status_code=501, detail="Live weather API not implemented")

@app.post("/api/voice_query")
async def handle_voice_query(file: UploadFile = File(...)):
    """
    Process voice query and return audio response
    """
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_path = temp_file.name

        # Process voice query
        text_response, audio_path = process_voice_query(temp_path)
        
        # Cleanup temp file
        os.unlink(temp_path)
        
        return {
            "text": text_response,
            "audio_url": f"/static/{os.path.basename(audio_path)}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)