import Link from "next/link";

export default function OpportunityPage() {
  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold text-black mb-4">
        Opportunity Agent
      </h1>

      <p className="text-black mb-6">
        Discovers relevant opportunities based on user goals.
      </p>

      <Link href="/" className="text-black underline">
        ← Back to Home
      </Link>
    </main>
  );
}
