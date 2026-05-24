"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/system/progress";
import { Card, CardContent } from "@/components/system/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SkillBarProps {
  name: string;
  confidence: number;
  evidence?: string;
}

function SkillBar({ name, confidence, evidence }: SkillBarProps) {
  const [showEvidence, setShowEvidence] = useState(false);

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={() => evidence && setShowEvidence(!showEvidence)}
        className={cn(
          "flex w-full items-center justify-between text-left group",
          evidence && "cursor-pointer"
        )}
      >
        <span className="text-sm font-medium group-hover:text-foreground transition-colors">{name}</span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
          {Math.round(confidence * 100)}%
          {evidence && (
            showEvidence ? <ChevronUp size={12} /> : <ChevronDown size={12} />
          )}
        </span>
      </button>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
          style={{ width: `${Math.round(confidence * 100)}%` }}
        />
      </div>
      {evidence && showEvidence && (
        <div className="mt-1 rounded-lg border border-border/40 bg-surface/50 p-2.5 text-xs text-muted-foreground leading-relaxed animate-fade-in">
          {evidence}
        </div>
      )}
    </div>
  );
}

interface SkillGraphProps {
  skills: { name: string; confidence: number; evidence?: string }[];
  className?: string;
}

export function SkillGraph({ skills, className }: SkillGraphProps) {
  if (skills.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-sm text-muted-foreground">No skills detected</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {skills
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 12)
        .map((skill) => (
          <SkillBar key={skill.name} {...skill} />
        ))}
      {skills.length > 12 && (
        <p className="text-xs text-muted-foreground text-center pt-1">
          +{skills.length - 12} more skills
        </p>
      )}
    </div>
  );
}
