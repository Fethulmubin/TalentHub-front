"use server"

import { JobCardProps } from "@/types/Job";

// fetching all jobs for the homepage

export async function getJobs(): Promise<JobCardProps[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await res.json();

  // The API returns { status: true, jobs: [...] }, so return only jobs
  return data.jobs;
}

// adding 
