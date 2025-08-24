// components/ui/JobCardSkeleton.tsx
export default function JobCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse flex flex-col justify-between">
      <div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-5 bg-gray-300 rounded-full w-16"></div>
          <div className="h-5 bg-gray-300 rounded-full w-12"></div>
          <div className="h-5 bg-gray-300 rounded-full w-20"></div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-8 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
}
