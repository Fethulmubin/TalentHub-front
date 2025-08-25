"use client";

import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

const dummyApplications = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    experience: "5+ years",
    applied: "Jan 16, 2024",
    status: "Pending",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    title: "Product Manager",
    location: "New York, NY",
    experience: "7+ years",
    applied: "Jan 15, 2024",
    status: "Shortlisted",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    title: "UX Designer",
    location: "Remote",
    experience: "4+ years",
    applied: "Jan 14, 2024",
    status: "Interviewed",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    title: "Data Scientist",
    location: "Austin, TX",
    experience: "6+ years",
    applied: "Jan 13, 2024",
    status: "Pending",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    title: "Senior Frontend Developer",
    location: "Seattle, WA",
    experience: "8+ years",
    applied: "Jan 12, 2024",
    status: "Rejected",
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-green-100 text-green-700",
  Interviewed: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function ApplicationTable() {
  const [applications] = useState(dummyApplications);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Applications</h2>
      </div>

      <table className="w-full border-separate border-spacing-y-3">
        <thead className="text-left text-sm text-gray-500">
          <tr>
            <th className="p-2">Applicant</th>
            <th className="p-2">Job Title</th>
            {/* <th className="p-2">Location</th> */}
            {/* <th className="p-2">Experience</th> */}
            <th className="p-2">Applied</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm"
            >
              <td className="p-3">
                <div className="flex flex-col">
                  <span className="font-medium">{app.name}</span>
                  <span className="text-xs text-gray-500">{app.email}</span>
                </div>
              </td>
              <td className="p-3">{app.title}</td>
              {/* <td className="p-3">{app.location}</td> */}
              {/* <td className="p-3">{app.experience}</td> */}
              <td className="p-3">{app.applied}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}
                >
                  {app.status}
                </span>
              </td>
              <td className="p-3 text-gray-600 flex space-x-4">
                <Edit2 size={20} />
                <Trash2 size={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
