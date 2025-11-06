import numpy as np
from pathlib import Path
import pickle
from typing import Tuple, List, Dict

def load_models():
    """
    Load TFLite and scikit-learn models
    """
    # Stub model for prototype
    class DummyTFLiteModel:
        def predict(self, image):
            return np.array([[0.85]])  # Dummy confidence score
    
    # Load or create dummy crop recommendation model
    model_path = Path("models/crop_recommendation.pkl")
    if model_path.exists():
        with open(model_path, "rb") as f:
            crop_model = pickle.load(f)
    else:
        crop_model = DummyCropModel()
    
    return DummyTFLiteModel(), crop_model

class DummyCropModel:
    """
    Dummy crop recommendation model for prototype
    """
    def predict_proba(self, X):
        # Return dummy probabilities for demonstration
        return np.array([[0.6, 0.3, 0.1]])
    
    def classes_(self):
        return ["Boro Rice", "Maize", "Potato"]

def predict_crop(ph: float, moisture: float, temp: float) -> Tuple[List[str], Dict[str, float]]:
    """
    Predict suitable crops based on soil and weather parameters
    """
    # Create feature vector
    X = np.array([[ph, moisture, temp]])
    
    # Load model
    _, model = load_models()
    
    # Get predictions
    probs = model.predict_proba(X)[0]
    crops = model.classes_()
    
    # Sort by probability
    sorted_idx = np.argsort(probs)[::-1]
    top_crops = [crops[i] for i in sorted_idx[:2]]
    probabilities = {crops[i]: float(probs[i]) for i in sorted_idx[:2]}
    
    return top_crops, probabilities