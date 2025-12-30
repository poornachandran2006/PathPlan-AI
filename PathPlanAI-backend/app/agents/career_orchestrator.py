from app.agents.capability_agent import CapabilityAgent
from app.agents.opportunity_agent import OpportunityAgent
from app.agents.route_planner_agent import RoutePlannerAgent
import json

class CareerOrchestratorAgent:
    def __init__(self):
        self.capability_agent = CapabilityAgent()
        self.route_agent = RoutePlannerAgent()

        with open("data/opportunities.json") as f:
            self.opportunities = json.load(f)

        self.opportunity_agent = OpportunityAgent(self.opportunities)

    def run(self, resume_text: str) -> dict:
        capability = self.capability_agent.analyze(resume_text)
        opportunities = self.opportunity_agent.analyze(capability["skills"])
        route = self.route_agent.plan(capability, opportunities)

        return {
            "capability": capability,
            "market": opportunities,
            "plan": route
        }
