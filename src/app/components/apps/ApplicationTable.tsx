"use client";

import { getAppByJobId } from "@/app/lib/actions/App";
import dayjs from "dayjs";
import { Edit2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import JobRowSkeleton from "../ui/JobRowSkeleton";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await getAppByJobId(jobId);
      if (res.status) setApplications(res.app);
      setLoading(false);
    };
    fetchUser();
  }, [jobId]);

  if (loading) return Array.from({ length: 6 }).map((_, idx) => <JobRowSkeleton key={idx} />);

  if (!applications.length)
    return <p className="text-gray-500 text-center">No applications found</p>;

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
            <div>
              <h3 className="font-medium">{app.user.name}</h3>
              <p className="text-gray-500 text-sm">{app.user.email}</p>
            </div>
            <p className="text-sm text-gray-500">
              Applied: {dayjs(app.createdAt).format("MMM D, YYYY")}
            </p>
            <p className="text-sm">
              Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === "APPLIED"
                          ? "bg-green-400/20 text-green-700"
                          : app.status === "SHORTLISTED"
                          ? "bg-blue-400/20 text-blue-700"
                          : "bg-red-400/20 text-red-700"
                      }`}>{app.status}</span>
            </p>
            <a
              href={app.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              {app.user.name} &apos; Resume
            </a>
            <div className="flex space-x-4 mt-2 text-gray-600">
              <Edit2 size={18} />
              <Trash2 size={18} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default table for desktop
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
          {applications.map((app) => (
            <tr key={app.id} className="bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm">
              <td className="p-2 sm:p-3">
                <div className="flex flex-col">
                  <span className="font-medium">{app.user.name}</span>
                  <span className="text-xs sm:text-sm text-gray-500">{app.user.email}</span>
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
              <td className="p-2 sm:p-3 text-sm sm:text-base">{dayjs(app.createdAt).format("MMM D, YYYY")}</td>
              <td className="p-2 sm:p-3">
                <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        app.status === "APPLIED"
                          ? "bg-green-400/20 text-green-700"
                          : app.status === "SHORTLISTED"
                          ? "bg-blue-400/20 text-blue-700"
                          : "bg-red-400/20 text-red-700"
                      }`}>{app.status}</span>
              </td>
              <td className="p-2 sm:p-3 text-gray-600 flex space-x-2 sm:space-x-4">
                <Edit2 size={18} className="sm:w-5 sm:h-5" />
                <Trash2 size={18} className="sm:w-5 sm:h-5" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
