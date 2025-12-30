from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.career_orchestrator import CareerOrchestratorAgent

router = APIRouter(prefix="/career-agent", tags=["Career Agent"])
agent = CareerOrchestratorAgent()

class ResumeInput(BaseModel):
    resume_text: str

@router.post("/")
def run_agent(data: ResumeInput):
    return agent.run(data.resume_text)
