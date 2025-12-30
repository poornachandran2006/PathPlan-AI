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
    Build a FRONTEND-RENDERABLE VISUAL ROADMAP with detailed skill nodes.
    """

    # ✅ Refined prompt to ensure each node contains skill, description, and resources
    prompt = f"""
You are an AI Career Roadmap Architect.

Create a VISUAL ROADMAP STRUCTURE for frontend rendering.

Target Role:
{goal}

User Capabilities:
{json.dumps(capabilities, indent=2)}

Timeframe:
{timeframe_months} months

Rules:
- Break learning into clear SECTIONS
- Each section must include: id, title, level, color, prerequisites, and nodes
- Each NODE inside 'nodes' MUST be an object with:
    - skill: Name of the technology or concept
    - level: Beginner/Intermediate/Advanced
    - description: 1-2 sentences on what to learn
    - resources: List of 2-3 specific topics or platform names (e.g., "MDN", "Official Docs")
- Return ONLY valid JSON (no markdown).

Follow this schema EXACTLY:
{{
  "roadmap_title": "",
  "target_role": "",
  "timeline_months": 0,
  "sections": [
    {{
      "id": "",
      "title": "",
      "level": "foundation | core | application | advanced",
      "color": "",
      "prerequisites": [],
      "nodes": [
        {{
          "skill": "",
          "level": "",
          "description": "",
          "resources": []
        }}
      ]
    }}
  ]
}}
"""

    response = llm.generate(
        system_prompt="You design structured career roadmaps for UI visualization.",
        user_prompt=prompt
    )

    structured = extract_json(response)

    # ---------- NORMALIZATION ----------
    allowed_levels = {"foundation", "core", "application", "advanced"}
    default_colors = {
        "foundation": "#4A90E2",
        "core": "#7ED321",
        "application": "#50E3C2",
        "advanced": "#D0021B"
    }

    sections = structured.get("sections", [])
    normalized_sections = []

    for idx, sec in enumerate(sections):
        level = sec.get("level", "foundation")
        if level not in allowed_levels:
            level = "foundation"

        section_id = sec.get("id", "").strip().lower().replace(" ", "_")

        normalized_sections.append({
            "id": section_id if section_id else f"section_{idx+1}",
            "title": sec.get("title", "Untitled Section"),
            "level": level,
            "color": sec.get("color", default_colors[level]),
            "prerequisites": sec.get("prerequisites", []),
            "nodes": sec.get("nodes", [])
        })

    return {
        "roadmap": {
            "roadmap_title": structured.get("roadmap_title", f"{goal} Roadmap"),
            "target_role": structured.get("target_role", goal),
            "timeline_months": structured.get("timeline_months", timeframe_months),
            "sections": normalized_sections
        }
    }