from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import extract, compare, roadmap

app = FastAPI(title="ResumeGapAnalyzer API")

# Why: React (localhost:5173) and FastAPI (localhost:8000) are different
# "origins" for the browser -> without this, browser blocks the request.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(extract.router)
app.include_router(compare.router)
app.include_router(roadmap.router) # ADDED ROADMAP ROUTER HERE

@app.get("/health")
def health_check():
    return {"status": "ok"}