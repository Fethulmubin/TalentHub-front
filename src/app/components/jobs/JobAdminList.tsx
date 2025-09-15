"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import JobRowSkeleton from "../ui/JobRowSkeleton";
import { getJobByUserId } from "@/app/lib/actions/Job";

type Job = {
  id: string;
  title: string;
  description: string;
  price?: number;
  createdAt: string;
  skills: { id: string; name: string }[];
};

export default function JobList({ userId }: { userId: string }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await getJobByUserId(userId);
      if (res.status) setJobs(res.jobs);
      setLoading(false);
    };
    fetchUser();
  }, [userId]);

  if (loading) return <JobRowSkeleton />;
  if (!jobs.length)
    return <p className="text-gray-500">You haven’t posted any jobs yet.</p>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
      <table className="min-w-[600px] sm:min-w-full w-full">
        <thead className="bg-indigo-600 text-white text-sm sm:text-base">
          <tr>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Title</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Skills</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Price</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Created</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b hover:bg-gray-50 transition">
              <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{job.title}</td>
              <td className="py-2 sm:py-3 px-2 sm:px-4">
                {job.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {job.skills.map((s) => (
                      <span
                        key={s.id}
                        className="bg-indigo-100 text-indigo-600 text-xs sm:text-sm px-2 py-1 rounded-full"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs sm:text-sm">No skills</span>
                )}
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4">{job.price ? `$${job.price}` : "N/A"}</td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 text-sm sm:text-base text-gray-500">
                {new Date(job.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                <Link
                  href={`/admin/${userId}/apps/${job.id}`}
                  className="inline-block bg-indigo-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-indigo-700 transition text-xs sm:text-sm"
                >
                  Show Applications
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
