from app.agents.capability_agent import build_capability_map
from app.agents.market_trend_agent import analyze_market_trends
from app.agents.opportunity_agent import identify_opportunities
from app.agents.planner_agent import build_career_roadmap

def run_career_orchestrator(
    resume_text: str,
    target_role: str,
    timeframe_months: int = 3
) -> dict:
    """Master agent coordinating all specialized agents."""

    # 1️⃣ Analysis
    capability_result = build_capability_map(resume_text)
    capabilities = capability_result.get("capabilities")

    # 2️⃣ Market Trends
    market_result = analyze_market_trends(capabilities=capabilities, role=target_role)
    market_analysis = market_result.get("market_analysis")

    # 3️⃣ Opportunities
    opportunity_result = identify_opportunities(
        capabilities=capabilities,
        market_analysis=market_analysis,
        target_role=target_role
    )
    opportunities = opportunity_result.get("opportunities")

    # 4️⃣ Roadmap
    roadmap_result = build_career_roadmap(
        capabilities=capabilities,
        goal=target_role,
        timeframe_months=timeframe_months
    )
    roadmap = roadmap_result.get("roadmap")

    return {
        "capabilities": capabilities,
        "market_analysis": market_analysis,
        "opportunities": opportunities,
        "roadmap": roadmap
    } #