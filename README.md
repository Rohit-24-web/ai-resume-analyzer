# 🚀 AI Resume Gap Analyzer

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Site-brightgreen)](https://ai-resume-analyzer-5xx.pages.dev/)
[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-blue)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-teal)](https://fastapi.tiangolo.com/)
[![Cloudflare](https://img.shields.io/badge/Hosted%20On-Cloudflare%20Pages-orange)](https://pages.cloudflare.com/)
[![Vercel](https://img.shields.io/badge/Serverless-Vercel-black)](https://vercel.com/)

[**🔗 Explore Live Application**](https://ai-resume-analyzer-5xx.pages.dev/)

An intelligent, full-stack application that leverages Large Language Models (LLMs) to parse unstructured resume data, compare it against target job descriptions, identify skill deficiencies, and generate actionable, personalized study roadmaps.

---

## 🎯 Key Features

* **AI-Powered Skill Extraction:** Utilizes Google Gemini to parse technical and soft skills from resumes and job descriptions into structured JSON.
* **Intelligent Gap Analysis:** Evaluates candidate qualifications against job requirements using fuzzy string matching and scoring algorithms.
* **Dynamic Study Roadmaps:** Generates tailored learning milestones and programmatically fetches high-quality YouTube tutorials to bridge detected skill gaps.
* **Serverless Architecture:** Edge-deployed frontend on Cloudflare Pages coupled with FastAPI serverless handlers on Vercel for fast, scalable inference.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Axios, Tailwind CSS (Hosted on Cloudflare Pages)
* **Backend:** FastAPI, Python, RapidFuzz, pdfplumber (Hosted on Vercel)
* **AI & External APIs:** Google Gemini API, YouTube Data API v3

---

## ⚙️ Local Development Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/](https://github.com/)<your-username>/ai-resume-analyzer.git
cd ai-resume-analyzer
```

2. Backend Setup
```Bash
cd backend
python -m venv venv
# Activate virtual environment:
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
Create a .env file in the backend folder:
```
Code snippet
GEMINI_API_KEY=your_gemini_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
Start the FastAPI development server:

```Bash
uvicorn app.main:app --reload
```
3. Frontend Setup
In a separate terminal window:

```Bash
cd frontend
npm install
npm run dev
```
🔒 Security & Best Practices
Environment Isolation: Sensitive API keys are managed securely via serverless environment variables and excluded from source control via .gitignore.

CORS Management: Configured CORS middleware allows seamless cross-origin communication between the edge frontend and the API server.


---

### How to apply it:
1. In VS Code, open **`README.md`** in your project root (create it if it does not exist).
2. Paste the block above.
3. Replace `<your-username>` with your actual GitHub username in the clone command.
4. Save, commit, and push:
   ```bash
   git add README.md
   git commit -m "Add professional README documentation"
   git push origin main
   ```
