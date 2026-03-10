from fastapi import APIRouter, UploadFile, File
import os
import shutil
from app.services.ocr_service import extract_text_from_image
from app.services.llm_service import extract_invoice_data

router = APIRouter(prefix="/invoice", tags=["invoice"])


# Upload Route
@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # OCR extraction
    raw_text = extract_text_from_image(file_path)

    # LLM structured extraction
    structure_data = extract_invoice_data(raw_text)

    return {
        "filename": file.filename,
        "extracted_text": structure_data
    }