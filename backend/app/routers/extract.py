from fastapi import APIRouter, UploadFile, File
from app.schemas import ExtractRequest
from app.services.extractor import extract_skills
from app.services.pdf_reader import extract_text_from_pdf

router = APIRouter(prefix="/api")

# We removed response_model=ExtractResponse so it won't crash on lists!
@router.post("/extract")
def extract(payload: ExtractRequest):
    return extract_skills(payload.text)

@router.post("/extract-pdf")
async def extract_pdf(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text_from_pdf(content)
    return extract_skills(text)