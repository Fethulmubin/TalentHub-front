import ApplyForm from "@/app/components/jobs/ApplyForm";
import { getJobById } from "@/app/lib/actions/Job";
import { Building2, Briefcase, CalendarDays, DollarSign, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/system/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/system/card";
import Link from "next/link";

export default async function JobPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const { job } = await getJobById(jobId);

  if (!job) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Briefcase size={24} />
          </div>
          <p className="text-sm font-medium">Job not found</p>
          <Link href="/" className="text-sm text-accent hover:text-accent/80 transition-colors">
            Browse all jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Back to jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Building2 size={16} />
                </div>
                <div>
                  <span className="font-medium text-foreground">{job.createdBy?.name}</span>
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl">{job.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {job.skills?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill: { id: string; name: string }) => (
                      <Badge key={skill.id} variant="soft" size="sm">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Description</p>
                <div className="text-sm text-foreground-secondary leading-relaxed whitespace-pre-line">
                  {job.description}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-3">
              {job.price && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Salary</span>
                  <span className="text-sm font-semibold tabular-nums">${parseInt(job.price).toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Posted</span>
                <span className="text-sm">{new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Skills</span>
                <span className="text-sm">{job.skills?.length || 0} required</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardContent className="p-5">
              <ApplyForm jobId={jobId} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
