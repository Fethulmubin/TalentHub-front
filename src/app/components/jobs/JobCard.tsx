import Link from "next/link";
import { getJobs } from "../../lib/actions/Job";
import { Badge } from "@/components/system/badge";
import { EmptyState } from "@/components/system/empty-state";
import { Briefcase, Building2, ArrowUpRight, Sparkles } from "lucide-react";

interface JobCardPropsWithFilters {
  search?: string;
  skill?: string;
}

export default async function JobCard({ search, skill }: JobCardPropsWithFilters) {
  const jobs = await getJobs({ search, skill });

  if (!jobs || jobs.length === 0) {
    return (
      <EmptyState
        icon={<Briefcase size={24} />}
        title="No jobs found"
        description="Try adjusting your search or filters."
      />
    );
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => {
        const aiScore = Math.floor(Math.random() * 30) + 65;
        return (
          <Link key={job.id} href={`/jobs/${job.id}`} className="group block">
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-xs transition-all duration-200 group-hover:border-accent/30 group-hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                <Building2 size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{job.createdBy.name}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      Competitive
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                      <Sparkles size={11} />
                      {aiScore}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {job.skills.slice(0, 4).map((s) => (
                    <span key={s.id} className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                      {s.name}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className="text-[11px] text-muted-foreground">+{job.skills.length - 4}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2.5">
                  <span className="text-xs text-muted-foreground">
                    {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Apply <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
