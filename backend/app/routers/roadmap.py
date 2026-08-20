from fastapi import APIRouter
from pydantic import BaseModel
from app.services.recommender import get_roadmap

router = APIRouter(prefix="/api")

class RoadmapRequest(BaseModel):
    missing_skills: list[str]

@router.post("/roadmap")
def roadmap(payload: RoadmapRequest):
    return get_roadmap(payload.missing_skills)