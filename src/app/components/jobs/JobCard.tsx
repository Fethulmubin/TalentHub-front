import Link from "next/link";
import { getJobs } from "../../lib/actions/Job";
import { JobCardProps } from "@/types/Job";

interface JobCardPropsWithFilters {
  search?: string;
  skill?: string;
}
export default async function JobCard({
  search,
  skill,
}: JobCardPropsWithFilters) {
  const jobs = await getJobs({ search, skill });

  if (!jobs || jobs.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No jobs found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {job.title}
            </h3>
            <p className="text-gray-700 mb-3 line-clamp-3">{job.description}</p>

            <div className="mb-3">
              <h4 className="font-medium text-gray-800 mb-1">Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="text-gray-500 text-sm">
              <p>
                Posted by:{" "}
                <span className="font-medium">{job.createdBy.name}</span>
              </p>
              <p>Created at: {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Apply Button */}
            <Link href={`/jobs/${job.id}`}>
              <button className="mt-2 bg-blue-600 cursor-pointer text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
