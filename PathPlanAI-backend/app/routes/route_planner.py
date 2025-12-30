from fastapi import APIRouter
from app.agents.route_planner_agent import plan_route

router = APIRouter(prefix="/route", tags=["Route Planner"])

@router.post("/")
def get_route(capability: dict, opportunities: dict):
    return plan_route(capability, opportunities)
