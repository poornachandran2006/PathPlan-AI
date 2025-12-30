// lib/api.ts
export async function generatePathAPI(goal: string) {
  const res = await fetch("http://localhost:8000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goal }),
  });

  if (!res.ok) {
    throw new Error("Backend not reachable");
  }

  return res.json();
}

export async function analyzeCapabilityAPI(resumeText: string) {
  const res = await fetch("http://localhost:8000/capability", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resume_text: resumeText,
    }),
  });

  if (!res.ok) {
    throw new Error("Capability API failed");
  }

  return res.json();
}
