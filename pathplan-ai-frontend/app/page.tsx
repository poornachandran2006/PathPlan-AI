"use client";

import { useState } from "react";
import Link from "next/link";

// Mock API function for demo
const generatePathAPI = async (goal: string) => {
  return new Promise<{ roadmap: string[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        roadmap: [
          "Week 1-2: Learn HTML, CSS, and JavaScript",
          "Week 3-4: Master React fundamentals",
          "Month 2: Build full-stack applications",
          "Month 3: Deploy projects and prepare for interviews",
        ],
      });
    }, 1500);
  });
};

export default function Home() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<string[]>([]);
  const [error, setError] = useState("");

  const generatePath = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await generatePathAPI(goal);
      setRoadmap(data.roadmap);
    } catch (err) {
      setError("Backend not connected yet. Demo mode active.");
      setRoadmap([
        "Week 1–2: Learn HTML, CSS, and JavaScript",
        "Week 3–4: Master React fundamentals",
        "Month 2: Build full-stack applications",
        "Month 3: Deploy projects and prepare for interviews",
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium">
            AI-Powered Career Co-Pilot
          </div>
          <h1 className="text-6xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            PathPlan AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your career aspirations into actionable roadmaps with intelligent planning, continuous feedback, and personalized guidance
          </p>
        </div>
      </section>

      {/* Agent Navigation Cards */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your AI Career Agents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/capability" className="group">
            <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Capability Agent</h3>
              <p className="text-gray-600 text-sm">Analyze your skills and identify growth opportunities</p>
            </div>
          </Link>

          <Link href="/opportunity" className="group">
            <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Opportunity Agent</h3>
              <p className="text-gray-600 text-sm">Discover jobs, internships, and hackathons tailored for you</p>
            </div>
          </Link>

          <Link href="/route-planner" className="group">
            <div className="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Route Planner Agent</h3>
              <p className="text-gray-600 text-sm">Build your personalized learning and career roadmap</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Goal Input Section */}
      <section className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Define Your Career Goal</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Tell us what you want to achieve, and our AI will create a personalized roadmap to get you there.
          </p>

          <div className="flex flex-col sm:flex-row gap-4" suppressHydrationWarning>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Become a full-stack developer in 6 months"
              className="flex-1 border-2 border-gray-200 rounded-xl px-6 py-4 text-gray-800 focus:border-indigo-500 focus:outline-none transition-colors placeholder:text-gray-400"
            />

            <button
              suppressHydrationWarning
              onClick={generatePath}
              disabled={loading || !goal.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Path"
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Roadmap Output Section */}
      <section className="max-w-4xl mx-auto px-8 py-12 pb-20">
        <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Your Personalized Roadmap</h2>
          </div>

          {roadmap.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                Enter your career goal above to generate your personalized roadmap
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {roadmap.map((step, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl p-5 border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-2"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1 leading-relaxed pt-1">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}