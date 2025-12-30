import json
import re
from app.core.llm_client import LLMClient

llm = LLMClient()


def extract_json(text: str) -> dict:
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        return {"raw_output": text}
    try:
        return json.loads(match.group())
    except json.JSONDecodeError:
        return {"raw_output": text}


def identify_opportunities(
    capabilities: dict,
    market_analysis: dict,
    target_role: str
) -> dict:
    """
    Identify suitable job/internship opportunities
    based on skills and market alignment.
    """

    prompt = f"""
You are an AI Opportunity Intelligence Agent.

Target role:
{target_role}

User capabilities:
{json.dumps(capabilities, indent=2)}

Market analysis:
{json.dumps(market_analysis, indent=2)}

Your task:
1. Categorize opportunities into:
   - Safe (high match)
   - Stretch (partial match)
   - Aspirational (future-ready)
2. Suggest specific role titles
3. Give concise application advice

Return ONLY valid JSON:
{{
  "safe_opportunities": [],
  "stretch_opportunities": [],
  "aspirational_opportunities": [],
  "application_advice": ""
}}
"""

    response = llm.generate(
        system_prompt="You reason about job opportunities and readiness.",
        user_prompt=prompt
    )

    structured = extract_json(response)

    return {
        "opportunities": structured
    }
