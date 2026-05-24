"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/system/card";
import { Badge } from "@/components/system/badge";
import { Avatar } from "@/components/system/avatar";
import { Skeleton } from "@/components/system/skeleton";
import { ResumeSummary } from "./resume-summary";
import { SkillGraph } from "./skill-graph";
import { EvidenceCard } from "./evidence-card";
import { ResumeTimeline } from "./resume-timeline";
import { Button } from "@/components/system/button";
import { RefreshCw, AlertCircle, Lightbulb } from "lucide-react";
import type { ResumeProfile } from "@/types/resume";

interface CandidateProfileProps {
  profile: ResumeProfile;
  loading?: boolean;
  onRetry?: () => void;
}

export function CandidateProfile({ profile, loading, onRetry }: CandidateProfileProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-16 rounded-lg" />
              <Skeleton className="h-16 rounded-lg" />
              <Skeleton className="h-16 rounded-lg" />
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  if (profile.status === "FAILED") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle size={24} />
          </div>
          <p className="text-base font-medium text-foreground">Processing failed</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            {profile.errorMessage || "An error occurred during resume processing."}
          </p>
          {onRetry && (
            <Button variant="secondary" size="sm" className="mt-4" onClick={onRetry}>
              <RefreshCw size={12} className="mr-1.5" />
              Retry
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (profile.status === "PROCESSING") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <RefreshCw size={24} className="animate-spin" />
          </div>
          <p className="text-base font-medium text-foreground">Processing resume...</p>
          <p className="text-sm text-muted-foreground mt-1">Parsing content and extracting insights</p>
          {onRetry && (
            <Button variant="ghost" size="xs" className="mt-4 text-muted-foreground" onClick={onRetry}>
              <RefreshCw size={10} className="mr-1" />
              Refresh
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const skillInsights = profile.insights.filter((i) => i.insightType === "SKILL");
  const eduInsights = profile.insights.filter((i) => i.insightType === "EDUCATION");
  const expInsights = profile.insights.filter((i) => i.insightType === "EXPERIENCE");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar fallback={profile.fileName} size="lg" />
            <div>
              <CardTitle>Resume Analysis</CardTitle>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant={profile.status === "COMPLETED" ? "success" : "soft"} size="sm">
                  {profile.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{profile.fileName}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResumeSummary
            summary={profile.summary}
            yearsExperience={profile.yearsExperience}
            skills={profile.skills}
            education={profile.education as any}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills & Proficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillGraph
              skills={skillInsights.map((s) => ({
                name: s.label,
                confidence: s.confidence,
                evidence: s.evidence,
              }))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {eduInsights.length > 0 ? (
              eduInsights.map((insight) => (
                <EvidenceCard key={insight.id} type={insight.insightType} label={insight.label} value={insight.value} confidence={insight.confidence} evidence={insight.evidence} />
              ))
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <p className="text-sm text-muted-foreground">No education data extracted.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb size={15} className="text-accent" />
            <CardTitle>Extracted Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {expInsights.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Experience</p>
              <div className="space-y-2">
                {expInsights.map((insight) => (
                  <EvidenceCard key={insight.id} type={insight.insightType} label={insight.label} value={insight.value} confidence={insight.confidence} evidence={insight.evidence} />
                ))}
              </div>
            </div>
          )}
          {eduInsights.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Education</p>
              <div className="space-y-2">
                {eduInsights.map((insight) => (
                  <EvidenceCard key={insight.id} type={insight.insightType} label={insight.label} value={insight.value} confidence={insight.confidence} evidence={insight.evidence} />
                ))}
              </div>
            </div>
          )}
          {skillInsights.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Skills</p>
              <div className="space-y-2">
                {skillInsights.slice(0, 10).map((insight) => (
                  <EvidenceCard key={insight.id} type={insight.insightType} label={insight.label} value={insight.value} confidence={insight.confidence} evidence={insight.evidence} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resume Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ResumeTimeline
            insights={profile.insights}
            createdAt={profile.createdAt}
            updatedAt={profile.updatedAt}
          />
        </CardContent>
      </Card>
    </div>
  );
}
