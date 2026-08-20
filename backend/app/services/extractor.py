import google.generativeai as genai
import os, json
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Using the modern model specifically assigned to your key!
model = genai.GenerativeModel("gemini-2.5-flash")

EXTRACTION_PROMPT = """
You are a resume/job-description parser. Extract technical and soft skills.
Return ONLY valid JSON in this exact shape, no explanation text:
{{
  "skills": ["skill1", "skill2"],
  "experience_years": null,
  "role_title": "string"
}}

TEXT:
{text}
"""

def extract_skills(text: str) -> dict:
    prompt = EXTRACTION_PROMPT.format(text=text)
    
    try:
        # Since 2.5 is a modern model, we can safely use the JSON enforcer again!
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Failed to parse JSON: {e}")
        return {"skills": [], "experience_years": None, "role_title": None}