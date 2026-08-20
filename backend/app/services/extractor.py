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
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        # Safely get the text (will raise exception if blocked by safety filters)
        raw_text = response.text.strip()
        
        # --- CLEANING STEP: Remove markdown backticks if they exist ---
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
            
        cleaned_text = raw_text.strip()
        # -------------------------------------------------------------
        
        return json.loads(cleaned_text)
        
    except Exception as e:
        # This will now print the EXACT error type to your Vercel Runtime Logs!
        print(f"CRITICAL GEMINI ERROR: {type(e).__name__} - {str(e)}")
        return {"skills": [], "experience_years": None, "role_title": None}