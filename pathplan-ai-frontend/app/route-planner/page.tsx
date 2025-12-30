import Link from "next/link";

export default function RoutePlannerPage() {
  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold text-black mb-4">
        Route Planner Agent
      </h1>

      <p className="text-black mb-6">
        Generates a step-by-step personalized roadmap.
      </p>

      <Link href="/" className="text-black underline">
        ← Back to Home
      </Link>
    </main>
  );
}
