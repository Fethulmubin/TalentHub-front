import { Suspense } from "react";
import JobCard from "./components/jobs/JobCard";
import JobCardSkeleton from "./components/ui/JobCardSkeleton";
import JobFilterPanel from "./components/jobs/JobFilterPanel";

interface JobsPageProps {
  searchParams: Promise<{ search?: string; skill?: string }>;
}

export default async function Home({ searchParams }: JobsPageProps) {
  const { search, skill } = await searchParams;
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8 px-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
          Welcome to TalentHub
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mb-2">
          Find Your Dream Job
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Discover opportunities from top companies and take the next step in
          your career journey.
        </p>
      </div>

      {/* Filter Panel */}
      <div className="mb-6">
        <JobFilterPanel />
      </div>

      {/* Job Listings */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 sm:p-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <JobCardSkeleton key={idx} />
            ))}
          </div>
        }
      >
        <JobCard search={search} skill={skill} />
      </Suspense>
    </div>
  );
}
