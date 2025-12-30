"use client";

import { useState } from "react";
import { uploadResume } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CapabilityPage() {
  const router = useRouter();
  const [resume, setResume] = useState<File | null>(null);
  const [github, setGithub] = useState("https://github.com/poornachandran2006");
  const [linkedin, setLinkedin] = useState("https://www.linkedin.com/in/poornachandran2006?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app");
  const [targetRole, setTargetRole] = useState("Backend Developer");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!resume) {
      setError("Please upload your resume to continue.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const data = await uploadResume(resume, targetRole);
      
      if (data.result) {
        // ✅ PERSISTENCE BRIDGE: Storing all parts of the orchestrator result
        sessionStorage.setItem("capabilities", JSON.stringify(data.result.capabilities));
        sessionStorage.setItem("initial_opportunities", JSON.stringify(data.result.opportunities));
        
        // ✅ CRITICAL FIX: Explicitly saving the initial roadmap for the Route Planner
        sessionStorage.setItem("initial_roadmap", JSON.stringify(data.result.roadmap));
        
        sessionStorage.setItem("target_role", targetRole);
        
        setResult(data.result);
      }
    } catch (err) {
      setError("Failed to analyze capability. Please check if the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Build Your Profile</h1>
          <p className="text-gray-600">Complete your professional profile to unlock AI career guidance.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Target Career Goal</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition"
                placeholder="e.g. Senior Backend Developer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Resume (PDF)</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-indigo-400 transition cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                />
                <p className="text-sm text-gray-500">{resume ? resume.name : "Click to upload PDF"}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">GitHub Profile</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition"
                placeholder="https://github.com/username"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">LinkedIn Profile</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition"
                placeholder="https://linkedin.com/in/username"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 transition-all duration-300"
          >
            {loading ? "Analyzing Professional Profile..." : "Analyze My Profile"}
          </button>

          {error && <p className="text-red-500 text-center mt-4 font-medium">{error}</p>}
        </div>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Capability Analysis</h2>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-sm font-bold text-green-700">Readiness Score:</span>
                  <span className="text-xl font-black text-green-700">{result.capabilities?.career_readiness_score || 0}/100</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                    Technical Capability Map
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(result.capabilities?.technical_skills || []).map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold border border-indigo-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                    Professional Strengths
                  </h3>
                  <ul className="space-y-2">
                    {(result.capabilities?.soft_skills || []).map((skill: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold text-indigo-600">Analysis Summary:</span> {result.capabilities?.summary || "Analysis complete."}
                </p>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => router.push('/opportunity')}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
                >
                  View Opportunities
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}