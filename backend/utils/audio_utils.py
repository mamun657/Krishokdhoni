import speech_recognition as sr
from gtts import gTTS
import os
from pathlib import Path
import uuid

def process_voice_query(audio_path: str) -> tuple[str, str]:
    """
    Process voice query and return text response and audio path
    """
    # Initialize recognizer
    recognizer = sr.Recognizer()
    
    # Load audio file
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
    
    try:
        # Transcribe audio (using Google's speech recognition for prototype)
        text = recognizer.recognize_google(audio)
        
        # Generate response (simple rule-based for prototype)
        if "disease" in text.lower():
            response = "To check for plant diseases, please take a clear photo of the affected leaves."
        elif "weather" in text.lower():
            response = "Current weather in Dhaka is sunny with temperature of 28°C."
        else:
            response = "কৃষক বন্ধু, আপনার প্রশ্নটি বুঝতে পারিনি। অনুগ্রহ করে আবার বলুন।"
        
        # Convert response to speech
        tts = gTTS(response, lang='bn')
        
        # Save audio file
        output_path = Path("static") / f"{uuid.uuid4()}.mp3"
        tts.save(str(output_path))
        
        return response, str(output_path)
        
    except sr.UnknownValueError:
        return "Could not understand audio", ""
    except sr.RequestError:
        return "Error processing audio", ""