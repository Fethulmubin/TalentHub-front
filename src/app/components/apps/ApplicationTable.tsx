"use client";

import { getAppByJobId } from "@/app/lib/actions/App";
import dayjs from "dayjs";
import { Edit2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import JobRowSkeleton from "../ui/JobRowSkeleton";

type JobApplication = {
  id: string;
  jobId: string;
  userId: string;
  user: {
    email: string;
    id: string;
    name: string;
    role: string;
  };
  createdAt: string;
  resumeUrl: string;
  status: string;
};

export default function ApplicationTable({ jobId }: { jobId: string }) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await getAppByJobId(jobId);
      if (res.status) setApplications(res.app);
      setLoading(false);
    };
    fetchUser();
  }, [jobId]);

  return (
    <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-medium">Applications</h2>
      </div>

      <table className="w-full border-separate border-spacing-y-3 min-w-[600px] sm:min-w-full">
        <thead className="text-left text-sm sm:text-base text-gray-500">
          <tr>
            <th className="p-2 sm:p-3">Applicant</th>
            <th className="p-2 sm:p-3">Resume</th>
            <th className="p-2 sm:p-3">Applied</th>
            <th className="p-2 sm:p-3">Status</th>
            <th className="p-2 sm:p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => <JobRowSkeleton key={idx} />)
            : applications.length
            ? applications.map((app) => (
                <tr
                  key={app.id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm"
                >
                  <td className="p-2 sm:p-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{app.user.name}</span>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {app.user.email}
                      </span>
                    </div>
                  </td>
                  <td className="p-2 sm:p-3">
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm sm:text-base"
                    >
                      {app.user.name} &apos; Resume
                    </a>
                  </td>
                  <td className="p-2 sm:p-3 text-sm sm:text-base">
                    {dayjs(app.createdAt).format("MMM D, YYYY")}
                  </td>
                  <td className="p-2 sm:p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        app.status === "APPLIED"
                          ? "bg-green-400/20 text-green-700"
                          : app.status === "SHORTLISTED"
                          ? "bg-blue-400/20 text-blue-700"
                          : "bg-red-400/20 text-red-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-2 sm:p-3 text-gray-600 flex space-x-2 sm:space-x-4">
                    <Edit2 size={18} className="sm:w-5 sm:h-5" />
                    <Trash2 size={18} className="sm:w-5 sm:h-5" />
                  </td>
                </tr>
              ))
            : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}
