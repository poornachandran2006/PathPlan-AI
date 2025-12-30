"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-6 text-center">
      {/* Decorative Badge */}
      <div className="inline-block mb-6 px-4 py-1 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium">
        AI-Powered Career Co-Pilot
      </div>

      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
        PathPlan AI
      </h1>

      <p className="max-w-2xl text-xl text-gray-600 mb-10 leading-relaxed">
        Unlock your professional potential. Our multi-agent system analyzes your profile 
        and builds a high-precision roadmap to your target role.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/capability")}
          className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300"
        >
          Get Started
        </button>
        
        <button
          className="px-10 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300"
        >
          Watch Demo
        </button>
      </div>

      {/* Trust Signal */}
      <p className="mt-12 text-sm text-gray-400 font-medium uppercase tracking-widest">
        Powered by Llama 3.3 & Groq
      </p>
    </main>
  );
}