// lib/api.ts

// Changed from localhost to 127.0.0.1 to ensure direct connectivity with the FastAPI backend
const API_BASE_URL = "http://127.0.0.1:8000";

// ----------------------------
// 1. Resume Upload & Extraction
// ----------------------------
// This hits the /upload-resume endpoint which parses PDF and runs the orchestrator
export async function uploadResume(file: File, targetRole: string = "Backend Developer") {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("target_role", targetRole);

  const response = await fetch(`${API_BASE_URL}/upload-resume`, {
    method: "POST",
    // Note: No 'Content-Type' header needed for FormData; browser sets it with boundary
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Resume upload and analysis failed");
  }

  return response.json();
}

// ----------------------------
// 2. Capability Agent API
// ----------------------------
export async function analyzeCapability(resumeText: string) {
  const response = await fetch(`${API_BASE_URL}/capability`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resume_text: resumeText,
    }),
  });

  if (!response.ok) {
    throw new Error("Capability API failed");
  }

  return response.json();
}

// ----------------------------
// 3. Professional Presence (GitHub & LinkedIn)
// ----------------------------
export async function analyzeProfessionalPresence(githubUrl: string, linkedinUrl: string, targetRole: string) {
  const response = await fetch(`${API_BASE_URL}/professional-insight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
      target_role: targetRole,
      // Sending empty text object as the backend agent handles the ingestion
      linkedin_text: { headline: "", about: "", experience: [] }
    }),
  });

  if (!response.ok) {
    throw new Error("Professional presence review failed");
  }

  return response.json();
}

// ----------------------------
// 4. Opportunity Agent API
// ----------------------------
export async function analyzeOpportunities(
  capabilities: any,
  targetRole: string = ""
) {
  const response = await fetch(`${API_BASE_URL}/opportunities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      capabilities: capabilities,
      market_analysis: {}, // Backend expects this structure
      target_role: targetRole,
    }),
  });

  if (!response.ok) {
    throw new Error("Opportunity API failed");
  }

  return response.json();
}