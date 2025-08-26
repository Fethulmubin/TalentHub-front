

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
    price: formData.get("price") ? Number(formData.get("price")) : 0, // convert to number
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

export async function getJobById(jobId: string) {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`,{
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    });

    if (!res.ok) {
       const err = await res.json();
      return { status: false, message: err.message || "Failed to fetch job" };
    }

   const result = await res.json();
  //  console.log(result)
    return { status: true, message: "Job fetched successfully", job: result.job };
  } catch (error) {
     console.error("Post job error:", error);
    return { status: false, message: "Something went wrong" };
  }

}

export async function getJobByUserId(userId: string){
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/user/${userId}`,{
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      return { status: false, message: err.message || "Failed to fetch jobs" };
    }

    const result = await res.json();
    return { status: true, message: "Jobs fetched successfully", jobs: result.jobs };
  } catch (error) {
    console.error("Get jobs by user ID error:", error);
    return { status: false, message: "Something went wrong" };
  }
}
