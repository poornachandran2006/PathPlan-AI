import os
import shutil
from fastapi import APIRouter, UploadFile, File
from app.agents.resume_parser_agent import extract_text_from_resume
from app.agents.orchestrator_agent import run_career_orchestrator

router = APIRouter()

UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload-resume")
async def upload_resume(
    resume: UploadFile = File(...),
    target_role: str = "Backend Developer",
    timeframe_months: int = 3
):
    file_path = os.path.join(UPLOAD_DIR, resume.filename)

    try:
        # 1️⃣ Save uploaded resume temporarily
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        # 2️⃣ Extract text
        resume_text = extract_text_from_resume(file_path)

        # 🔍 DEBUG (optional — remove later)
        print("\n========== RESUME TEXT START ==========\n")
        print(resume_text[:1500])
        print("\n========== RESUME TEXT END ==========\n")

        # 3️⃣ Run full agent pipeline
        result = run_career_orchestrator(
            resume_text=resume_text,
            target_role=target_role,
            timeframe_months=timeframe_months
        )

        # 4️⃣ Return result
        return {
            "resume_filename": resume.filename,
            "resume_text_preview": resume_text[:500],
            "result": result
        }

    finally:
        # 5️⃣ ALWAYS delete file after processing
        if os.path.exists(file_path):
            os.remove(file_path)
