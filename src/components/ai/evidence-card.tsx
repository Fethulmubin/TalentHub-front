"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/system/badge";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";

interface EvidenceCardProps {
  type: string;
  label: string;
  value: string;
  confidence: number;
  evidence: string;
}

const typeColors: Record<string, string> = {
  SKILL: "border-l-accent/40 bg-accent/[0.02]",
  EDUCATION: "border-l-success/40 bg-success/[0.02]",
  EXPERIENCE: "border-l-info/40 bg-info/[0.02]",
  PROJECT: "border-l-warning/40 bg-warning/[0.02]",
  CERTIFICATION: "border-l-destructive/40 bg-destructive/[0.02]",
};

const typeBadge: Record<string, "info" | "success" | "soft" | "warning"> = {
  SKILL: "info",
  EDUCATION: "success",
  EXPERIENCE: "soft",
  PROJECT: "warning",
};

export function EvidenceCard({ type, label, value, confidence, evidence }: EvidenceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "rounded-lg border border-border/60 border-l-[3px] p-3 transition-all duration-150",
        "hover:bg-surface/50 hover:border-l-accent/60",
        typeColors[type] || "border-l-muted"
      )}
    >
      <button
        type="button"
        className="flex w-full items-start justify-between gap-2 text-left"
        onClick={() => evidence && setExpanded(!expanded)}
      >
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant={typeBadge[type] || "soft"} size="sm">
              {type}
            </Badge>
            <span className="text-xs text-muted-foreground tabular-nums">
              {Math.round(confidence * 100)}% confidence
            </span>
          </div>
          <p className="text-sm font-medium">{label}</p>
          {value && <p className="text-xs text-muted-foreground">{value}</p>}
        </div>
        {evidence && (
          <span className={cn(
            "shrink-0 mt-1 text-muted-foreground transition-all duration-150",
            expanded && "text-accent"
          )}>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        )}
      </button>

      {evidence && expanded && (
        <div className="mt-3 flex gap-2.5 rounded-lg border border-border/40 bg-surface/50 p-3 animate-fade-in">
          <Quote size={12} className="shrink-0 mt-0.5 text-muted-foreground/30" />
          <p className="text-xs text-muted-foreground leading-relaxed">&ldquo;{evidence}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
