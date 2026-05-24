"use client";

import dayjs from "dayjs";
import { Timeline, TimelineItem } from "@/components/system/timeline";
import { GraduationCap, Code, Briefcase, Star, Upload, CheckCircle } from "lucide-react";
import type { CandidateInsight } from "@/types/resume";

const iconMap: Record<string, any> = {
  SKILL: Code,
  EDUCATION: GraduationCap,
  EXPERIENCE: Briefcase,
  PROJECT: Star,
};

interface ResumeTimelineProps {
  insights: CandidateInsight[];
  createdAt: string;
  updatedAt: string;
}

export function ResumeTimeline({ insights, createdAt, updatedAt }: ResumeTimelineProps) {
  const grouped = insights.reduce(
    (acc, insight) => {
      if (!acc[insight.insightType]) acc[insight.insightType] = [];
      acc[insight.insightType].push(insight);
      return acc;
    },
    {} as Record<string, CandidateInsight[]>
  );

  return (
    <Timeline>
      <TimelineItem
        title="Resume Submitted"
        description="Your resume was uploaded for processing"
        timestamp={dayjs(createdAt).format("MMM D, YYYY h:mm A")}
        completed
        icon={<Upload size={14} />}
      />
      {insights.length > 0 && (
        <TimelineItem
          title="Processing Complete"
          description={`Extracted ${insights.length} data points from your resume`}
          timestamp={dayjs(updatedAt).format("MMM D, YYYY h:mm A")}
          completed
          icon={<CheckCircle size={14} />}
        />
      )}
      {Object.entries(grouped).map(([type, items]) => {
        const Icon = iconMap[type] || Star;
        return (
          <TimelineItem
            key={type}
            title={`${type.charAt(0) + type.slice(1).toLowerCase()} Insights`}
            description={`${items.length} ${type.toLowerCase()} entries found`}
            icon={<Icon size={14} />}
            active
          >
            <div className="space-y-1 mt-1">
              {items.slice(0, 3).map((item) => (
                <p key={item.id} className="text-xs text-muted-foreground">
                  {item.label}
                  <span className="ml-1 text-muted-foreground/60">
                    {Math.round(item.confidence * 100)}%
                  </span>
                </p>
              ))}
              {items.length > 3 && (
                <p className="text-xs text-muted-foreground/60">+{items.length - 3} more</p>
              )}
            </div>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
