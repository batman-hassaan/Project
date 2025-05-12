from flask import Flask, request, jsonify
from flask_cors import CORS
from services.gemini_service import GeminiService
from dotenv import load_dotenv
import os

load_dotenv()

# Add this right after load_dotenv()
print("Current environment variables:")
print(f"GEMINI_API_KEY exists: {'GEMINI_API_KEY' in os.environ}")
print(f"FRONTEND_URL: {os.getenv('FRONTEND_URL')}")
print(f"FLASK_DEBUG: {os.getenv('FLASK_DEBUG')}")
print(f"FLASK_PORT: {os.getenv('FLASK_PORT')}")

# Verify the key isn't wrapped in quotes
api_key = os.getenv('GEMINI_API_KEY')
if api_key and (api_key.startswith('"') or api_key.startswith("'")):
    print("WARNING: API key appears to be wrapped in quotes!")
    api_key = api_key.strip('"').strip("'")
    os.environ['GEMINI_API_KEY'] = api_key  # Fix it automatically

# Add verification
if not os.getenv('GEMINI_API_KEY'):
    raise ValueError("GEMINI_API_KEY not found in environment variables")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": os.getenv('FRONTEND_URL', 'http://localhost:3000')}})

print(f"Gemini API Key loaded: {bool(os.getenv('GEMINI_API_KEY'))}")  # Debug line

gemini_service = GeminiService()

@app.route('/api/generate-caption', methods=['POST'])
def generate_caption():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image_file = request.files['image']
    prompt = request.form.get('prompt', None)
    
    try:
        image_data = {'mime_type': image_file.content_type, 'data': image_file.read()}
        caption = gemini_service.generate_caption(image_data, prompt)
        return jsonify({'caption': caption})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=os.getenv('FLASK_DEBUG', 'false').lower() == 'true', port=os.getenv('FLASK_PORT', 5000))