

import { JobCardProps } from "@/types/Job";
import { JobSchema } from "../validators/job";

// fetching all jobs for the homepage
interface GetJobsParams {
  search?: string;
  skill?: string
}


export async function getJobs({ search, skill }: GetJobsParams): Promise<JobCardProps[]> {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (skill) params.append("skill", skill);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await res.json();

  // The API returns { status: true, jobs: [...] }, so return only jobs
  return data.jobs;
}

// posting jobs
export async function PostJob(prevState: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    skills: formData.getAll("skills") as string[], // multiple inputs named "skills"
  };

  // validate with Zod
  const parsed = JobSchema.safeParse(data);
  if (!parsed.success) {
    return {
      status: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // call backend API
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/createJob`, {
      method: "POST",
      body: JSON.stringify(parsed.data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });

    if (!res.ok) {
      const err = await res.json();
      return { status: false, message: err.message || "Failed to post job" };
    }

    const result = await res.json();
    return { status: true, message: "Job posted successfully", job: result.job };
  } catch (error) {
    console.error("Post job error:", error);
    return { status: false, message: "Something went wrong" };
  }
}