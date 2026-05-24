import Link from "next/link";
import { Briefcase, Users, FileText, Plus, Search, ArrowUpRight, BarChart3, Sparkles, ArrowUp, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/system/card";
import { Badge } from "@/components/system/badge";
import { PageHeader } from "@/components/layout/page-header";

const trends = [
  { direction: "up" as const, value: "12%" },
  { direction: "up" as const, value: "8%" },
  { direction: "up" as const, value: "24%" },
  { direction: "up" as const, value: "3%" },
];

const topCandidates = [
  { name: "Sarah Chen", role: "Senior Frontend Engineer", match: 94, skills: ["React", "TypeScript", "GraphQL"] },
  { name: "Marcus Johnson", role: "Full Stack Developer", match: 89, skills: ["Node.js", "React", "Python"] },
  { name: "Priya Patel", role: "ML Engineer", match: 86, skills: ["Python", "TensorFlow", "AWS"] },
];

export default async function Admin({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your recruiting activity"
        actions={
          <div className="flex items-center gap-3">
            <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors" aria-label="Notifications">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white">3</span>
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">JD</div>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Briefcase, label: "Active Jobs", value: "0", badge: "Active", iconColor: "text-accent", iconBg: "bg-accent/10" },
          { icon: FileText, label: "Applications", value: "0", badge: "Total", iconColor: "text-blue-500", iconBg: "bg-blue-50" },
          { icon: Users, label: "Candidates", value: "0", badge: "AI Ready", iconColor: "text-emerald-500", iconBg: "bg-emerald-50" },
          { icon: BarChart3, label: "This Month", value: "0", badge: "Month", iconColor: "text-amber-500", iconBg: "bg-amber-50" },
        ].map((stat, i) => {
          const trend = trends[i];
          return (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg} ${stat.iconColor}`}>
                  <stat.icon size={18} />
                </div>
                <Badge variant="soft" size="sm">{stat.badge}</Badge>
              </div>
              <p className="text-3xl font-bold tracking-tight tabular-nums text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              <div className="mt-2.5 flex items-center gap-1 text-xs font-medium">
                <ArrowUp size={12} className="text-emerald-500" />
                <span className="text-emerald-600">{trend.value}</span>
                <span className="text-gray-400 ml-0.5">vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Plus, label: "Post a Job", sub: "Create listing", href: `/admin/${userId}/jobs/post`, iconColor: "text-accent", iconBg: "bg-accent/10" },
            { icon: Briefcase, label: "My Jobs", sub: "Manage listings", href: `/admin/${userId}/jobs`, iconColor: "text-blue-500", iconBg: "bg-blue-50" },
            { icon: Search, label: "AI Search", sub: "Find candidates", href: `/admin/${userId}/candidates`, iconColor: "text-emerald-500", iconBg: "bg-emerald-50" },
            { icon: FileText, label: "Applications", sub: "Review all", href: `/admin/${userId}/apps/${userId}`, iconColor: "text-amber-500", iconBg: "bg-amber-50" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="group block">
              <div className="rounded-xl border border-border bg-card p-4 shadow-xs transition-all duration-200 group-hover:border-accent/30 group-hover:shadow-sm">
                <div className="flex flex-col items-center gap-2.5 text-center">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor} transition-colors group-hover:scale-105`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Top Candidates</h3>
          <Link href={`/admin/${userId}/candidates`} className="text-xs font-medium text-accent hover:text-accent/80 transition-colors">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {topCandidates.map((candidate) => (
            <div key={candidate.name} className="rounded-xl border border-border bg-card p-4 shadow-xs transition-all duration-200 hover:shadow-sm hover:border-accent/30">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                  {candidate.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{candidate.name}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{candidate.role}</p>
                    </div>
                    <span className="shrink-0 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      {candidate.match}% match
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {candidate.skills.map((skill) => (
                      <span key={skill} className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link href={`/admin/${userId}/candidates`} className="inline-flex items-center gap-0.5 mt-2 text-xs font-medium text-accent hover:text-accent/80 transition-colors">
                    View profile <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Getting Started</CardTitle>
            <Badge variant="info" size="sm">Employer Guide</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground leading-relaxed">
            Welcome to TalentHub. Post jobs, review AI-matched candidates, and manage your hiring pipeline — all in one place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {[
              { label: "Post a job to attract talent", icon: Plus, href: `/admin/${userId}/jobs/post` },
              { label: "Browse AI-matched candidates", icon: Search, href: `/admin/${userId}/candidates` },
              { label: "Review incoming applications", icon: FileText, href: `/admin/${userId}/jobs` },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="flex items-center gap-2.5 rounded-lg border border-border bg-gray-50/50 p-3 hover:bg-gray-50 transition-colors group">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <item.icon size={13} />
                </div>
                <span className="text-xs text-muted-foreground flex-1">{item.label}</span>
                <ArrowUpRight size={12} className="text-gray-300 group-hover:text-accent transition-colors" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
