// frontend/src/api/client.js
import axios from "axios";

// This points to your FastAPI server running on port 8000
const api = axios.create({ baseURL: "https://ai-resume-analyzer-gamma-eight.vercel.app/api" });

export const extractSkills = (text) => api.post("/extract", { text });
export const compareSkills = (resume_skills, jd_skills) =>
  api.post("/compare", { resume_skills, jd_skills });
export const getRoadmap = (missing_skills) =>
  api.post("/roadmap", { missing_skills });

export default api;