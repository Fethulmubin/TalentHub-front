import { Suspense } from "react";
import JobCard from "./components/jobs/JobCard";
import JobCardSkeleton from "./components/ui/JobCardSkeleton";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">Welcome to TalentHub</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Find Your Dream Job</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover opportunities from top companies and take the next step in your career journey.
        </p>
      </div>

           <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <JobCardSkeleton key={idx} />
            ))}
          </div>
        }
      >
        <JobCard />
      </Suspense>
    </div>
  );
}
