from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.orchestrator_agent import run_career_orchestrator

router = APIRouter()


class OrchestratorRequest(BaseModel):
    resume_text: str
    target_role: str
    timeframe_months: int = 3


@router.post("/career-agent")
def career_agent(req: OrchestratorRequest):
    return run_career_orchestrator(
        resume_text=req.resume_text,
        target_role=req.target_role,
        timeframe_months=req.timeframe_months
    )
