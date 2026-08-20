from fastapi import APIRouter
from pydantic import BaseModel
from app.services.comparator import compare_skills

router = APIRouter(prefix="/api")

class CompareRequest(BaseModel):
    resume_skills: list[str]
    jd_skills: list[str]

@router.post("/compare")
def compare(payload: CompareRequest):
    return compare_skills(payload.resume_skills, payload.jd_skills)