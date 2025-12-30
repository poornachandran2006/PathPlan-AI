"use client";

import { useState } from "react";
import Link from "next/link";
import { analyzeCapabilityAPI } from "@/lib/api";

export default function CapabilityPage() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeCapability = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await analyzeCapabilityAPI(resumeText);
      setResult(data);
    } catch (err) {
      setError("Failed to analyze capability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <section className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          Capability Agent
        </h1>
        <p className="text-black">
          Paste your resume to analyze your skills and readiness.
        </p>
      </section>

      <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow mb-8">
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={6}
          placeholder="Paste your resume text here..."
          className="w-full border border-gray-300 rounded p-3 text-black"
        />

        <button
          suppressHydrationWarning
          onClick={analyzeCapability}
          className="mt-4 bg-black text-white px-6 py-2 rounded"
        >
          {loading ? "Analyzing..." : "Analyze Capability"}
        </button>

        {error && (
          <p className="text-sm text-red-600 mt-2">
            {error}
          </p>
        )}
      </section>

      {result && (
        <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-black mb-4">
            Analysis Result
          </h2>

          <p className="text-black mb-2">
            <b>Total Skills Detected:</b> {result.total_skills_detected}
          </p>

          <p className="text-black mb-2">
            <b>Skills:</b> {result.skills.join(", ")}
          </p>

          <p className="text-black">
            <b>Readiness Score:</b> {result.readiness_score}
          </p>
        </section>
      )}

      <div className="max-w-4xl mx-auto mt-6">
        <Link href="/" className="text-black underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
