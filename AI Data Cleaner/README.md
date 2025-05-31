# AI Data Cleaner

![AI Data Cleaner](frontend/frontend/public/data-cleaning.svg)

A powerful web application that uses AI to automatically clean and analyze your datasets, providing intelligent visualization suggestions.

## Features

### 🧹 Automated Data Cleaning
- Handles missing values intelligently
- Removes duplicate entries
- Converts data types automatically
- Optimizes data format for analysis

### 📊 Smart Analysis
- Provides detailed statistics about your data
- Shows before/after cleaning comparisons
- Analyzes data types and distributions
- Calculates data quality improvements

### 🎨 Visualization Suggestions
- AI-powered visualization recommendations
- Tailored charts and graphs suggestions
- Power BI-specific implementation tips
- Business insights for each visualization

### 💻 User-Friendly Interface
- Drag & drop file upload
- Dark/Light theme support
- Real-time processing feedback
- Responsive design for all devices

## Supported File Formats
- CSV
- Excel (XLSX, XLS)
- JSON

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- React Markdown
- Prism React Renderer

### Backend
- FastAPI
- Pandas
- NumPy
- Google Gemini AI
- Python 3.x

## Getting Started

### Prerequisites
- Python 3.x
- Node.js
- Google Gemini API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-data-cleaner.git
cd ai-data-cleaner
```

2. Set up the backend
```bash
cd backend
pip install -r requirements.txt
```

3. Configure environment variables
```bash
# Create .env file in backend directory
GEMINI_API_KEY=your_api_key_here
```

4. Set up the frontend
```bash
cd ../frontend/frontend
npm install
```

5. Run the application
```bash
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend/frontend
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Upload your dataset using the drag & drop interface or file browser
2. Wait for the AI to process and clean your data
3. Review the cleaning statistics and improvements
4. Check the AI-generated visualization suggestions
5. Download your cleaned dataset

## Author

👨‍💻 **Hassaan**
- GitHub: [@hassaanmaqsood](https://github.com/batman-hassaan)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
