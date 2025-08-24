"use server"

import { JobCardProps } from "@/types/Job";

export async function getJobs(): Promise<JobCardProps[]> {
  const res = await fetch("http://localhost:3500/jobs");
  
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await res.json();

  // The API returns { status: true, jobs: [...] }, so return only jobs
  return data.jobs;
}
