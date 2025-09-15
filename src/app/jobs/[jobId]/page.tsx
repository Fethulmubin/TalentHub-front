// app/job/page.tsx
import ApplyForm from "@/app/components/jobs/ApplyForm";
import { getJobById } from "@/app/lib/actions/Job";
import {  Building2 } from "lucide-react";


export default async function JobPage({ params }: {params: Promise<{ jobId: string }>}) {
    const { jobId } = await params;
    const  { job }  = await getJobById(jobId);
    // console.log("Job details:", job);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-2xl mx-auto my-10 space-y-3">
      {/* Job Title & Company */}
      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <div className="flex items-center gap-2 text-gray-600 mb-1">
        <Building2 size={16} className="text-blue-500" />
        <span>{job.createdBy?.name} is hiring for: </span>
      </div>

      {/* Job Meta Info */}
      <h2 className="text-lg font-semibold mb-2">Required Skills:</h2>
      <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
        {job?.skills.map((skill : { id: string; name: string }) => (
          <span key={skill.id}  className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {skill.name}
          </span>
        ))}
      </div>

      {/* Job Description */}
      <p className="text-gray-700 leading-relaxed">{job.description}</p>

      <hr className="my-6" />
      {/* Apply component */}
      <ApplyForm jobId={jobId} />
    </div>
  );
}
