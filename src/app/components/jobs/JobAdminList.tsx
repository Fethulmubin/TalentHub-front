"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getJobByUserId } from "@/app/lib/actions/Job";
import { DataGrid, Column } from "@/components/system/data-grid";
import { Badge } from "@/components/system/badge";
import { Button } from "@/components/system/button";
import { EmptyState } from "@/components/system/empty-state";
import { Briefcase } from "lucide-react";

type Job = {
  id: string;
  title: string;
  description: string;
  price?: number;
  createdAt: string;
  skills: { id: string; name: string }[];
};

export default function JobList({ userId }: { userId: string }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getJobByUserId(userId);
      if (res.status) {
        setJobs(res.jobs);
      } else {
        setError(res.message || "Failed to fetch jobs");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const columns: Column<Job>[] = [
    {
      key: "title",
      header: "Title",
      sortable: true,
      render: (job) => (
        <div>
          <span className="font-medium text-sm">{job.title}</span>
        </div>
      ),
    },
    {
      key: "skills",
      header: "Skills",
      render: (job) => (
        <div className="flex flex-wrap gap-1">
          {job.skills.length > 0
            ? job.skills.slice(0, 3).map((s) => (
                <Badge key={s.id} variant="soft" size="sm">
                  {s.name}
                </Badge>
              ))
            : <span className="text-xs text-muted-foreground">—</span>}
        </div>
      ),
    },
    {
      key: "price",
      header: "Salary",
      sortable: true,
      render: (job) => (
        <span className="text-sm text-muted-foreground tabular-nums">{job.price ? `$${Number(job.price).toLocaleString()}` : "—"}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (job) => (
        <span className="text-sm text-muted-foreground">
          {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (job) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/${userId}/apps/${job.id}`}>
            <Button variant="ghost" size="xs">
              Apps
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataGrid
      columns={columns}
      data={jobs}
      keyExtractor={(job) => job.id}
      loading={loading}
      error={error}
      onRetry={fetchData}
      emptyState={
        <EmptyState
          icon={<Briefcase size={24} />}
          title="No jobs posted yet"
          description="Create your first job posting to attract candidates."
          action={{ label: "Post a Job", onClick: () => window.location.href = `/admin/${userId}/jobs/post` }}
        />
      }
    />
  );
}
