from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.planner_agent import build_career_roadmap

router = APIRouter()


class PlannerRequest(BaseModel):
    capabilities: dict
    goal: str
    timeframe_months: int = 3


@router.post("/roadmap")
def roadmap(req: PlannerRequest):
    return build_career_roadmap(
        capabilities=req.capabilities,
        goal=req.goal,
        timeframe_months=req.timeframe_months
    )
