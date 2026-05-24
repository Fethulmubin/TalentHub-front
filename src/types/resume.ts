export interface CandidateInsight {
  id: string;
  insightType: "SKILL" | "EDUCATION" | "EXPERIENCE" | "PROJECT" | "CERTIFICATION";
  label: string;
  value: string;
  confidence: number;
  evidence: string;
  createdAt: string;
}

export interface Education {
  degree: string;
  institution: string;
  year?: number;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
}

export interface ResumeProfile {
  id: string;
  userId: string | null;
  fileName: string;
  fileUrl: string;
  rawText: string;
  skills: string[];
  education: Education[];
  yearsExperience: number | null;
  technologies: string[];
  projects: Project[];
  summary: string | null;
  status: "PROCESSING" | "COMPLETED" | "FAILED";
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  insights: CandidateInsight[];
}

export interface SearchResult {
  resumeId: string;
  chunkText: string;
  chunkIndex: number;
  fileName: string;
  skills: string[];
  yearsExperience: number | null;
  similarity: number;
}
