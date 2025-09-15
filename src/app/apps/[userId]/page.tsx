// import JobRow from "@/components/JobRow";
// import { applications } from "@/data/applications";

import JobRow from "@/app/components/jobs/JobRow";

export default async function ApplicationsPage({params}: {params: Promise<{ userId: string }>}) {
    const { userId } = await params
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>
      <p className="text-gray-500 mb-4">
        Track the status of your job applications
      </p>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-6 py-3 font-semibold">Position</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Applied Date</th>
              <th className="px-6 py-3 font-semibold">Salary</th>
            </tr>
          </thead>
          <tbody>
           
              <JobRow userId={userId} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
