"use client";

import { getAppById } from "@/app/lib/actions/App";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';


type JobRowProps = {
  id: string;
  job: {
    title: string;
    createdAt: string;
    createdBy: {
        name: string;
    }
    price?: string;
  };
  status: string;
  createdAt: string;

}[];


export default function JobRow({ userId }: { userId: string }) {
  const [applications, setApplications] = useState<JobRowProps>([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getAppById(userId);
      if (res.status) {
        // If successful, you can use the application data
        setApplications(res.app);
        console.log(res.app)
      } else {
        console.error("Error fetching application:", res.message);
      }
    };
    fetchUser();
  }, [userId]);

   // This triggers Suspense until applications is set
  if (applications === null) {
    throw new Promise(() => {});
  }
  
  return (
    <>
      {applications ? applications.map((app) => (
        <tr key={app.id} className="border-b last:border-none">
          <td className="px-6 py-4">
            <div className="font-medium">{app.job.title}</div>
            <div className="text-sm text-gray-500">
              {app.job.createdBy.name}
            </div>
          </td>
          <td className="px-6 py-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${app.status === "SHORTLISTED" ? "bg-green-100 text-green-700" :  app.status === "APPLIED" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}
            >
              {app.status}
            </span>
          </td>
          <td className="px-6 py-4 text-gray-600">{dayjs(app.createdAt).format("MMM DD, YYYY")}</td>
          <td className="px-6 py-4 font-semibold">{app.job.price || "N/A"}</td>
        </tr>
      )): (
        <tr>
          <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
            No applications found.
          </td>
        </tr>
      )}
    </>
  );
}
