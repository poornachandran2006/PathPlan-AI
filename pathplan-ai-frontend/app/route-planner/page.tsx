"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RoutePlannerPage() {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [targetRole, setTargetRole] = useState("");

  useEffect(() => {
    // 1. Retrieve the stored data from sessionStorage
    const storedSpecificRoadmap = sessionStorage.getItem("roadmapResult");
    const storedInitialRoadmap = sessionStorage.getItem("initial_roadmap");
    const storedRole = sessionStorage.getItem("selected_role") || sessionStorage.getItem("target_role");

    if (storedRole) {
      setTargetRole(storedRole);
    }

    // 2. Determine which roadmap to display (Specific result takes priority over initial orchestrator result)
    let finalRoadmap = null;
    try {
      if (storedSpecificRoadmap) {
        finalRoadmap = JSON.parse(storedSpecificRoadmap);
      } else if (storedInitialRoadmap) {
        finalRoadmap = JSON.parse(storedInitialRoadmap);
      }
    } catch (e) {
      console.error("Error parsing roadmap data:", e);
    }

    // 3. Set the roadmap state
    if (finalRoadmap) {
      // The backend structure might wrap the data in a "roadmap" key
      setRoadmap(finalRoadmap.roadmap || finalRoadmap);
    }
  }, []);

  if (!roadmap) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-red-500">Roadmap Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your career path. Please ensure you've completed the profile analysis first.</p>
          <Link href="/capability" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
            Go to Profile Analysis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">Your Career Roadmap</h1>
              <p className="text-indigo-600 font-bold text-lg flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Targeting: {roadmap.target_role || targetRole}
              </p>
            </div>
            <div className="bg-indigo-50 px-6 py-4 rounded-2xl border border-indigo-100">
              <p className="text-sm font-bold text-indigo-700 uppercase tracking-widest mb-1">Timeframe</p>
              <p className="text-2xl font-black text-indigo-900">{roadmap.timeline_months || "3"} Months</p>
            </div>
          </div>
        </header>

        {/* Roadmap Visualization */}
        <div className="space-y-12 relative">
          {/* Vertical Line for Timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>

          {(roadmap.sections || []).map((section: any, sIdx: number) => (
            <div key={sIdx} className="relative z-10">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center shadow-md hidden md:flex">
                  <span className="text-xl font-black" style={{ color: section.color || '#9ca3af' }}>{sIdx + 1}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 bg-white px-6 py-2 rounded-full border border-gray-100 shadow-sm">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-0 md:ml-24">
                {(section.nodes || []).map((node: any, nIdx: number) => (
                  <div 
                    key={nIdx} 
                    className="bg-white p-6 rounded-2xl border-l-8 shadow-sm hover:shadow-lg transition-all duration-300"
                    style={{ borderColor: section.color || '#6366f1' }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-800">{node.skill}</h3>
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded uppercase">
                        {node.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{node.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {(node.resources || []).map((res: string, rIdx: number) => (
                        <span key={rIdx} className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                          # {res}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-16 bg-neutral-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <h2 className="text-3xl font-black mb-4 relative z-10">AI Strategy Overview</h2>
          <p className="text-gray-300 text-lg leading-relaxed relative z-10 italic">
            "{roadmap.roadmap_title}: A structured path designed to bridge your current capability gaps for the {targetRole} role."
          </p>
          <div className="mt-8 flex gap-4 relative z-10">
            <Link href="/capability" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition">
              Start New Analysis
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}