from flask import Flask, render_template, request, jsonify, send_file
import pandas as pd
import numpy as np
import os
import atexit
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import google.generativeai as genai
from datetime import datetime, timedelta
import threading
import time

load_dotenv()

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'xls'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# File management
active_files = {}
cleanup_interval = 300  # 5 minutes

# Gemini AI Configuration
gemini_api_key = os.getenv('GEMINI_API_KEY')
if not gemini_api_key:
    raise EnvironmentError("GEMINI_API_KEY not set in environment variables")

genai.configure(api_key=gemini_api_key)
gemini_model = genai.GenerativeModel(model_name='gemini-1.5-pro-latest')

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def cleanup_files():
    """Clean up old files periodically"""
    while True:
        now = datetime.now()
        to_delete = []
        
        for filename, file_info in active_files.items():
            if now - file_info['created_at'] > timedelta(minutes=5):
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                if os.path.exists(filepath):
                    try:
                        os.remove(filepath)
                        to_delete.append(filename)
                    except Exception as e:
                        print(f"Error deleting file {filename}: {e}")
        
        for filename in to_delete:
            del active_files[filename]
        
        time.sleep(cleanup_interval)

# Start cleanup thread
cleanup_thread = threading.Thread(target=cleanup_files, daemon=True)
cleanup_thread.start()

def extract_features_for_gemini(df):
    numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()

    stats = {
        'numeric': {
            col: {
                'min': float(df[col].min()),
                'max': float(df[col].max()),
                'mean': float(df[col].mean()),
                'std': float(df[col].std()),
                'unique': len(df[col].unique())
            } for col in numeric_cols
        },
        'categorical': {
            col: {
                'unique': len(df[col].unique()),
                'top_values': df[col].value_counts().head(3).to_dict()
            } for col in categorical_cols
        }
    }
    
    numeric_for_corr = [col for col in numeric_cols if len(df[col].unique()) > 1]
    correlation = df[numeric_for_corr].corr().to_dict() if len(numeric_for_corr) > 1 else {}

    return {
        "columns": df.columns.tolist(),
        "numeric_columns": numeric_cols,
        "categorical_columns": categorical_cols,
        "stats": stats,
        "correlation": correlation,
        "sample_data": df.head(3).to_dict(orient='records')
    }

def get_plot_suggestions(data_info):
    prompt = f"""
    You are a Power BI expert analyzing this dataset:

    COLUMNS:
    - All: {data_info['columns']}
    - Numeric: {data_info['numeric_columns']}
    - Categorical: {data_info['categorical_columns']}

    STATISTICS:
    {data_info['stats']}

    CORRELATIONS (for numeric columns):
    {data_info['correlation']}

    SAMPLE DATA (first 3 rows):
    {data_info['sample_data']}

    Provide detailed Power BI visualization recommendations including:
    1. Recommended chart types (bar, line, scatter, etc.)
    2. Specific fields to use for each visualization
    3. Business insights each visualization could reveal
    4. Any data transformations needed
    5. Power BI-specific tips (custom visuals, formatting)

    Format your response in clear markdown with sections for each recommendation.
    """
    
    try:
        response = gemini_model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Could not generate suggestions: {str(e)}"

def clean_data(filepath, extension):
    if extension == 'csv':
        df = pd.read_csv(filepath)
    else:
        df = pd.read_excel(filepath)

    original_stats = {
        'rows': len(df),
        'columns': df.shape[1],
        'missing': int(df.isnull().sum().sum()),
        'duplicates': int(df.duplicated().sum()),
        'dtypes': {col: str(dtype) for col, dtype in df.dtypes.items()}
    }

    for col in df.select_dtypes(include=['number']).columns:
        if (df[col] % 1 == 0).all() and not df[col].isnull().all():
            df[col] = pd.to_numeric(df[col], downcast='integer')
        df[col].fillna(df[col].median(), inplace=True)

    for col in df.select_dtypes(include=['object']).columns:
        converted = pd.to_numeric(df[col], errors='coerce')
        if not converted.isnull().all():
            df[col] = converted
            if (df[col] % 1 == 0).all():
                df[col] = df[col].astype('Int64')
            df[col].fillna(df[col].median(), inplace=True)
        else:
            mode = df[col].mode()
            df[col].fillna(mode[0] if not mode.empty else '', inplace=True)

    df.drop_duplicates(inplace=True)

    cleaned_stats = {
        'rows': len(df),
        'columns': df.shape[1],
        'missing': int(df.isnull().sum().sum()),
        'duplicates': int(df.duplicated().sum()),
        'dtypes': {col: str(dtype) for col, dtype in df.dtypes.items()}
    }

    return df, original_stats, cleaned_stats

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
        
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400

    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        extension = filename.rsplit('.', 1)[1].lower()
        cleaned_df, original_stats, cleaned_stats = clean_data(filepath, extension)

        cleaned_filename = f"cleaned_{filename}"
        cleaned_path = os.path.join(app.config['UPLOAD_FOLDER'], cleaned_filename)
        cleaned_df.to_csv(cleaned_path, index=False)

        # Add to active files
        active_files[cleaned_filename] = {
            'created_at': datetime.now(),
            'downloaded': False
        }

        data_info = extract_features_for_gemini(cleaned_df)
        suggestions = get_plot_suggestions(data_info)

        return jsonify({
            'message': 'File processed successfully',
            'original_stats': original_stats,
            'cleaned_stats': cleaned_stats,
            'cleaned_file': cleaned_filename,
            'suggestions': suggestions
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/download/<filename>')
def download_file(filename):
    try:
        if '..' in filename or filename.startswith('/'):
            raise ValueError("Invalid filename")
        
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        if not os.path.isfile(file_path):
            raise FileNotFoundError(f"File {filename} not found")
        
        # Mark file as downloaded
        if filename in active_files:
            active_files[filename]['downloaded'] = True
            
        return send_file(
            file_path,
            as_attachment=True,
            download_name=filename,
            mimetype='text/csv'
        )
        
    except FileNotFoundError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/cleanup/<filename>', methods=['POST'])
def cleanup_single_file(filename):
    try:
        if filename in active_files:
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            if os.path.exists(filepath):
                os.remove(filepath)
            del active_files[filename]
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def cleanup_on_exit():
    """Clean up all files when the app exits"""
    for filename in list(active_files.keys()):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(filepath):
            try:
                os.remove(filepath)
            except Exception as e:
                print(f"Error deleting file {filename}: {e}")

atexit.register(cleanup_on_exit)

if __name__ == '__main__':
    app.run(debug=True)