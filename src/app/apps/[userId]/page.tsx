"use client";

import { getAppById } from "@/app/lib/actions/App";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DataGrid, Column } from "@/components/system/data-grid";
import { Badge } from "@/components/system/badge";
import { Button } from "@/components/system/button";
import { EmptyState } from "@/components/system/empty-state";
import ApplicationTimeline from "@/app/components/apps/ApplicationTimeline";
import { Briefcase, Clock, X, Eye, FileText } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

type Application = {
  id: string;
  job: {
    title: string;
    createdAt: string;
    createdBy: { name: string };
    price?: string;
  };
  status: "APPLIED" | "SHORTLISTED" | "REJECTED";
  createdAt: string;
};

const statusVariant: Record<string, "success" | "info" | "destructive" | "soft"> = {
  SHORTLISTED: "info",
  APPLIED: "success",
  REJECTED: "destructive",
};

export default function ApplicationsPage({ params }: { params: Promise<{ userId: string }> }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAppById((await params).userId);
      if (res.status) {
        setApplications(res.app);
      }
      setLoading(false);
    };
    fetchData();
  }, [params]);

  const columns: Column<Application>[] = [
    {
      key: "title",
      header: "Position",
      sortable: true,
      render: (app) => (
        <div>
          <p className="font-medium text-sm">{app.job.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{app.job.createdBy.name}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (app) => (
        <Badge variant={statusVariant[app.status] || "soft"} size="sm">
          {app.status}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Applied",
      sortable: true,
      render: (app) => (
        <span className="text-sm text-muted-foreground">{dayjs(app.createdAt).format("MMM DD, YYYY")}</span>
      ),
    },
    {
      key: "price",
      header: "Salary",
      sortable: true,
      render: (app) => (
        <span className="text-sm font-medium tabular-nums">{app.job.price ? `$${parseInt(app.job.price).toLocaleString()}` : "—"}</span>
      ),
    },
    {
      key: "timeline",
      header: "",
      render: (app) => (
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
          className="gap-1 text-muted-foreground hover:text-foreground"
        >
          <Clock size={12} />
          Timeline
        </Button>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <PageHeader title="My Applications" description="Track the status of your job applications" />

      <DataGrid
        columns={columns}
        data={applications}
        keyExtractor={(app) => app.id}
        loading={loading}
        emptyState={
          <EmptyState
            icon={<Briefcase size={24} />}
            title="No applications yet"
            description="Apply to a job to start tracking your applications."
          />
        }
      />

      {selectedApp && (
        <div className="mt-6 rounded-xl border border-accent/20 bg-card shadow-xs animate-slide-up">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-accent" />
              <span className="text-sm font-medium">{selectedApp.job.title}</span>
            </div>
            <Button variant="ghost" size="xs" onClick={() => setSelectedApp(null)} className="text-muted-foreground">
              <X size={14} />
            </Button>
          </div>
          <div className="p-5">
            <ApplicationTimeline
              status={selectedApp.status}
              createdAt={selectedApp.createdAt}
              jobTitle={selectedApp.job.title}
              companyName={selectedApp.job.createdBy.name}
            />
          </div>
        </div>
      )}
    </div>
  );
}
