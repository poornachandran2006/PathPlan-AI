import json
import re
from app.core.llm_client import LLMClient

llm = LLMClient()

def extract_json(text: str) -> dict:
    """
    Extract JSON object from LLM response safely.
    """
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        return {"raw_output": text}

    try:
        return json.loads(match.group())
    except json.JSONDecodeError:
        return {"raw_output": text}


def build_capability_map(resume_text: str) -> dict:
    prompt = f"""
You are an AI career capability analysis agent.

Extract:
- Technical skills
- Tools & frameworks
- Experience level (beginner/intermediate/advanced)

Resume:
{resume_text}

Return ONLY valid JSON.
"""

    response = llm.generate(
        system_prompt="You extract structured career capabilities.",
        user_prompt=prompt
    )

    structured = extract_json(response)

    return {
        "capabilities": structured
    }
