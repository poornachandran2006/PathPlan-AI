
import json
import re
from app.core.llm_client import LLMClient

llm = LLMClient()


def extract_json(text: str) -> dict:
    """
    Extract JSON safely from LLM output.
    """
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        return {"raw_output": text}

    try:
        return json.loads(match.group())
    except json.JSONDecodeError:
        return {"raw_output": text}


def build_career_roadmap(
    capabilities: dict,
    goal: str,
    timeframe_months: int = 3
) -> dict:
    """
    Build a personalized learning & application roadmap.
    """

    prompt = f"""
You are an AI Career Planner Agent.

User goal:
{goal}

Timeframe:
{timeframe_months} months

Current capabilities:
{json.dumps(capabilities, indent=2)}

Your task:
1. Identify missing skills
2. Break the timeframe into weekly milestones
3. Suggest 2–3 portfolio projects
4. Define when the user should start applying
5. Output ONLY valid JSON

JSON format:
{{
  "missing_skills": [],
  "weekly_roadmap": {{
    "week_1": "",
    "week_2": ""
  }},
  "recommended_projects": [],
  "application_strategy": ""
}}
"""

    response = llm.generate(
        system_prompt="You are a strategic career planning agent.",
        user_prompt=prompt
    )

    structured = extract_json(response)

    return {
        "roadmap": structured
    }
