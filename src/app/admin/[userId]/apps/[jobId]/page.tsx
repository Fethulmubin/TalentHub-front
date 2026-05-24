import ApplicationTable from "@/app/components/apps/ApplicationTable";
import AIAssistantPanel from "@/app/components/apps/AIAssistantPanel";

export default async function ApplicationsPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;

  return (
    <div className="flex h-full gap-0">
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-border bg-white">
          <div>
            <h1 className="text-base font-semibold text-foreground">Applications</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Review and manage applicants for this position</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <ApplicationTable jobId={jobId} />
        </div>
      </div>
      <AIAssistantPanel />
    </div>
  );
}
