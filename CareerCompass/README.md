# AI-Powered Job Application Assistant

Empower your job search with AI! This project leverages advanced AI (Google Gemini) to analyze resumes, generate tailored cover letters, and provide actionable feedback—helping users stand out in the competitive job market.

## 🚀 Project Overview
A full-stack web application that streamlines the job application process:
- **Resume Analyzer:** Upload your resume (PDF/DOCX) and receive an AI-driven analysis, including top skills, improvement suggestions, and a score.
- **Cover Letter Generator:** Instantly generate personalized cover letters based on your resume and target job.

## ✨ Key Features
- **AI Resume Analysis:** Extracts and evaluates skills, suggests improvements, and scores your resume using Google Gemini.
- **Automated Cover Letters:** Generates professional, job-specific cover letters in seconds.
- **Modern UI:** Built with React and Vite for a fast, responsive user experience.
- **Seamless API:** FastAPI backend with robust endpoints for file upload, analysis, and generation.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Framer Motion, React Router
- **Backend:** FastAPI, Uvicorn, Google Gemini API, PyMuPDF
- **Other:** Docker-ready, RESTful APIs, Python, Node.js tooling

## ⚙️ How It Works
1. **Upload Resume:** User uploads a resume via the web interface.
2. **AI Analysis:** Backend extracts text, sends it to Gemini AI for analysis, and returns insights (skills, suggestions, score).
3. **Cover Letter Generation:** User requests a cover letter; the system generates a tailored letter using resume data and job description.
4. **Results Displayed:** All results are shown in a clean, interactive dashboard.

## 🏁 Quick Start
### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
### Frontend
```bash
cd my-frontend
npm install
npm run dev
```
Visit `http://localhost:5173` (or as indicated) to use the app.

## 🏆 Achievements
- Integrated Google Gemini for advanced, context-aware resume analysis
- Automated cover letter generation tailored to job descriptions
- Modern, responsive UI/UX

## 🤝 Connect
Built by [Your Name]. Let's connect on [LinkedIn](https://www.linkedin.com/)!

---
*Ready to supercharge your job applications? Try it out, contribute, or reach out for collaboration!* 