from pydantic import BaseModel
from typing import List, Dict

class CropRecommendRequest(BaseModel):
    ph: float
    moisture: float
    temp: float

class CropRecommendResponse(BaseModel):
    recommended: List[str]
    probabilities: Dict[str, float]

class MarketPrice(BaseModel):
    date: str
    price: float

class MarketPriceResponse(BaseModel):
    historical: List[MarketPrice]
    forecast: List[MarketPrice]

class WeatherForecast(BaseModel):
    date: str
    temp: float
    description: str

class WeatherResponse(BaseModel):
    city: str
    temp: float
    humidity: int
    description: str
    forecast: List[WeatherForecast]

class DiseaseResponse(BaseModel):
    disease: str
    confidence: float
    advice: str