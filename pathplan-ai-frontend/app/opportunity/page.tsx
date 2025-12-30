"use client";

import { useEffect, useState } from "react";
import { analyzeOpportunities } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OpportunityPage() {
  const router = useRouter();

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const storedCapabilities = sessionStorage.getItem("capabilities");
        const storedInitialOpportunities = sessionStorage.getItem("initial_opportunities");

        if (!storedCapabilities) {
          setError("No profile data found. Please upload your resume first.");
          setLoading(false);
          return;
        }

        const capabilities = JSON.parse(storedCapabilities);

        if (storedInitialOpportunities) {
          setResult({ opportunities: JSON.parse(storedInitialOpportunities) });
        } else {
          const data = await analyzeOpportunities(capabilities);
          setResult(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to sync career opportunities with the AI agent.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const handleSelectRole = (role: string) => {
    sessionStorage.setItem("selected_role", role);
    router.push("/route-planner");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Career Opportunities</h1>
        <p className="text-lg text-gray-600">
          Based on your analyzed capabilities, our AI has identified these pathways. 
          <span className="text-indigo-600 font-bold"> Select a role to build your roadmap.</span>
        </p>
      </header>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Matching your skills to market demands...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
          <p className="text-red-700">{error}</p>
          <Link href="/capability" className="text-red-800 underline mt-2 block font-bold">Return to Upload Page</Link>
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 gap-10">
          {/* ✅ Added safety checks for all role categories */}
          <CareerSection
            title="Safe Opportunities"
            subtitle="High skill match. You're ready to apply now."
            roles={result.opportunities?.safe_opportunities || []}
            onSelect={handleSelectRole}
            accentColor="bg-green-500"
          />

          <CareerSection
            title="Stretch Opportunities"
            subtitle="Great potential. Requires 1-2 key skill additions."
            roles={result.opportunities?.stretch_opportunities || []}
            onSelect={handleSelectRole}
            accentColor="bg-indigo-500"
          />

          <CareerSection
            title="Aspirational Opportunities"
            subtitle="Long-term growth. High-impact roles for your future."
            roles={result.opportunities?.aspirational_opportunities || []}
            onSelect={handleSelectRole}
            accentColor="bg-purple-500"
          />

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 10-2 0v1a1 1 0 102 0V10zM15.657 14.243a1 1 0 00-1.414 1.414l.707-.707a1 1 0 001.414 1.414l.707-.707zM11 18a1 1 0 10-2 0v-1a1 1 0 102 0v1zM4.343 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM2 10a1 1 0 102 0V9a1 1 0 10-2 0v1zM4.343 5.757a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707z" />
              </svg>
              Strategic Advice
            </h2>
            <p className="text-gray-600 leading-relaxed italic">
              {/* ✅ Added safety check for application_advice */}
              "{result.opportunities?.application_advice || "Review these opportunities and choose a path to begin your personalized roadmap."}"
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

function CareerSection({ title, subtitle, roles, onSelect, accentColor }: any) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-800">{title}</h2>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ✅ Final safety check on mapping roles */}
        {(roles || []).map((role: string, idx: number) => (
          <div
            key={idx}
            onClick={() => onSelect(role)}
            className="group cursor-pointer bg-white hover:bg-indigo-600 transition-all duration-300 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${accentColor}`}></div>
                <span className="text-lg font-bold text-gray-800 group-hover:text-white transition-colors">{role}</span>
              </div>
              <span className="text-indigo-600 font-bold text-sm group-hover:text-indigo-100 flex items-center gap-1">
                Plan Path
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}