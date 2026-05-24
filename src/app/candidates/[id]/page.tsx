"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getResumeProfile } from "@/app/lib/actions/Resume";
import { CandidateProfile } from "@/components/ai/candidate-profile";
import type { ResumeProfile } from "@/types/resume";
import { Breadcrumbs } from "@/components/system/breadcrumbs";
import { Button } from "@/components/system/button";
import { User, ArrowLeft, RotateCcw } from "lucide-react";

export default function CandidatePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<ResumeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    const result = await getResumeProfile(id);
    if (result.status) {
      setProfile(result.profile);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchProfile();
  }, [id]);

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
            <User size={24} />
          </div>
          <div>
            <p className="text-sm font-medium">Failed to load candidate</p>
            <p className="text-xs text-muted-foreground mt-1">{error}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchProfile}>
              <RotateCcw size={12} />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          Back to dashboard
        </Link>
        <Breadcrumbs
          items={[
            { label: "Candidates" },
            { label: id ? id.slice(0, 8) + "..." : "Loading..." },
          ]}
        />
      </div>

      <CandidateProfile
        profile={profile!}
        loading={loading}
        onRetry={fetchProfile}
      />
    </div>
  );
}
