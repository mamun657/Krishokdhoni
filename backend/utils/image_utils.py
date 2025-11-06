from PIL import Image
import io
import numpy as np

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Preprocess image for TFLite model
    """
    # Load image
    img = Image.open(io.BytesIO(image_bytes))
    
    # Resize to model input size
    img = img.resize((224, 224))
    
    # Convert to array and normalize
    img_array = np.array(img) / 255.0
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array.astype(np.float32)