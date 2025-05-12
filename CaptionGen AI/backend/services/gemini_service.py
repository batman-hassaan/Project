import os
import base64
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class GeminiService:
    def __init__(self):
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')  # Updated model name
        print("Gemini 1.5 Flash service initialized successfully")  # Debug line

    def generate_caption(self, image_data, prompt=None):
        try:
            if prompt is None:
                prompt = "Generate a creative and engaging caption for this image."
            
            print(f"Generating caption with prompt: {prompt}")  # Debug line

            # Convert image bytes to base64 string
            encoded_image = base64.b64encode(image_data['data']).decode('utf-8')

            # Construct parts for Gemini input
            parts = [
                prompt,
                {
                    "mime_type": image_data['mime_type'],
                    "data": encoded_image
                }
            ]

            response = self.model.generate_content(parts)
            return response.text
        except Exception as e:
            print(f"Error generating caption: {str(e)}")
            raise Exception(f"Failed to generate caption: {str(e)}")
