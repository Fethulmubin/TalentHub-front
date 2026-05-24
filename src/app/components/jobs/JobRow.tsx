"use client";

import { getAppById } from "@/app/lib/actions/App";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Badge } from "@/components/system/badge";

type Application = {
  id: string;
  job: {
    title: string;
    createdAt: string;
    createdBy: { name: string };
    price?: string;
  };
  status: string;
  createdAt: string;
};

const statusVariant: Record<string, "success" | "info" | "destructive" | "soft"> = {
  SHORTLISTED: "info",
  APPLIED: "success",
  REJECTED: "destructive",
};

export default function JobRow({ userId }: { userId: string }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAppById(userId);
      if (res.status) {
        setApplications(res.app);
      }
      setLoading(false);
    };
    fetchData();
  }, [userId]);

  if (loading) {
    return Array.from({ length: 4 }).map((_, i) => (
      <tr key={i} className="border-b border-border last:border-0">
        {Array.from({ length: 4 }).map((_, j) => (
          <td key={j} className="px-4 py-3">
            <div className="h-4 w-full max-w-[100px] rounded bg-muted animate-pulse-soft" />
          </td>
        ))}
      </tr>
    ));
  }

  if (applications.length === 0) {
    return (
      <tr>
        <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
          No applications found.
        </td>
      </tr>
    );
  }

  return applications.map((app) => (
    <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
      <td className="px-4 py-3">
        <p className="text-sm font-medium text-foreground">{app.job.title}</p>
        <p className="text-xs text-muted-foreground">{app.job.createdBy.name}</p>
      </td>
      <td className="px-4 py-3">
        <Badge variant={statusVariant[app.status] || "soft"} size="sm">
          {app.status}
        </Badge>
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {dayjs(app.createdAt).format("MMM DD, YYYY")}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-foreground">
        {app.job.price || "—"}
      </td>
    </tr>
  ));
}
