"use client";

import dayjs from "dayjs";
import { Timeline, TimelineItem } from "@/components/system/timeline";
import { SendHorizonal, UserCheck, XCircle, Clock } from "lucide-react";

type AppStatus = "APPLIED" | "SHORTLISTED" | "REJECTED";

interface ApplicationTimelineProps {
  status: AppStatus;
  createdAt: string;
  jobTitle: string;
  companyName: string;
}

export default function ApplicationTimeline({
  status,
  createdAt,
  jobTitle,
  companyName,
}: ApplicationTimelineProps) {
  return (
    <Timeline>
      <TimelineItem
        title="Application Submitted"
        description={`${jobTitle} at ${companyName}`}
        timestamp={dayjs(createdAt).format("MMM D, YYYY h:mm A")}
        completed
        icon={<SendHorizonal size={14} />}
      />
      {status === "APPLIED" && (
        <TimelineItem
          title="Under Review"
          description="Your application is being reviewed by the employer"
          icon={<Clock size={14} />}
          active
        />
      )}
      {status === "SHORTLISTED" && (
        <TimelineItem
          title="Shortlisted"
          description="You have been shortlisted for this position"
          timestamp={dayjs(createdAt).format("MMM D, YYYY")}
          completed
          icon={<UserCheck size={14} />}
        />
      )}
      {status === "REJECTED" && (
        <TimelineItem
          title="Not Selected"
          description="The employer has moved forward with other candidates"
          timestamp={dayjs(createdAt).format("MMM D, YYYY")}
          completed
          icon={<XCircle size={14} />}
        />
      )}
    </Timeline>
  );
}
