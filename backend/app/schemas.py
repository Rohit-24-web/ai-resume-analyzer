from pydantic import BaseModel
from typing import List, Optional

class ExtractRequest(BaseModel):
    text: str

class SkillExtraction(BaseModel):
    skills: List[str]
    experience_years: Optional[int] = None
    role_title: Optional[str] = None