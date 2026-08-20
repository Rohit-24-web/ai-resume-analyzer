from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import extract, compare, roadmap

app = FastAPI(title="ResumeGapAnalyzer API")

# Updated allow_origins to "*" so the Cloudflare frontend can successfully connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(extract.router)
app.include_router(compare.router)
app.include_router(roadmap.router) # ADDED ROADMAP ROUTER HERE

@app.get("/health")
def health_check():
    return {"status": "ok"}