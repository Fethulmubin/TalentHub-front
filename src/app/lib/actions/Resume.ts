import type { ResumeProfile, SearchResult } from "@/types/resume";

export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("resume", file);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/process`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      return { status: false as const, message: data.message || "Upload failed" };
    }

    return { status: true as const, message: "Resume queued for processing", profileId: data.profileId };
  } catch {
    return { status: false as const, message: "Something went wrong" };
  }
}

export async function getResumeProfile(profileId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/profile/${profileId}`, {
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      return { status: false as const, message: data.message || "Failed to fetch profile" };
    }

    return { status: true as const, profile: data.profile as ResumeProfile };
  } catch {
    return { status: false as const, message: "Something went wrong" };
  }
}

export async function searchResumes(query: string, options?: { limit?: number; filterSkills?: string[] }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        limit: options?.limit || 10,
        filterSkills: options?.filterSkills,
      }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      return { status: false as const, message: data.message || "Search failed" };
    }

    return { status: true as const, results: data.results as SearchResult[] };
  } catch {
    return { status: false as const, message: "Something went wrong" };
  }
}
