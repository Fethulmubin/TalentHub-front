"use client";

import { cn } from "@/lib/utils";
import { StatCard } from "@/components/system/stat-card";
import { Badge } from "@/components/system/badge";
import { Briefcase, GraduationCap, Code, Sparkles } from "lucide-react";

interface ResumeSummaryProps {
  summary: string | null;
  yearsExperience: number | null;
  skills: string[];
  education: { degree: string; institution: string }[];
  className?: string;
}

export function ResumeSummary({ summary, yearsExperience, skills, education, className }: ResumeSummaryProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {summary && (
        <div className="rounded-lg bg-accent/5 border border-accent/10 p-4">
          <div className="flex items-start gap-2.5">
            <Sparkles size={14} className="text-accent shrink-0 mt-0.5" />
            <p className="text-sm text-foreground-secondary leading-relaxed">{summary}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          title="Experience"
          value={yearsExperience !== null ? `${yearsExperience}y` : "—"}
          icon={<Briefcase size={14} />}
        />
        <StatCard
          title="Education"
          value={String(education.length)}
          icon={<GraduationCap size={14} />}
        />
        <StatCard
          title="Skills"
          value={String(skills.length)}
          icon={<Code size={14} />}
        />
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Detected Skills</p>
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 15).map((skill) => (
            <Badge key={skill} variant="soft" size="sm">{skill}</Badge>
          ))}
          {skills.length > 15 && (
            <Badge variant="soft" size="sm">+{skills.length - 15} more</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
