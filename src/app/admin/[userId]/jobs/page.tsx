import JobList from "@/app/components/jobs/JobAdminList";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/system/button";
import { PageHeader } from "@/components/layout/page-header";

export default async function MyJobsPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader title="My Posted Jobs" description="Manage your active and past job listings">
        <Link href={`/admin/${userId}/jobs/post`}>
          <Button size="sm">
            <Plus size={14} />
            Post Job
          </Button>
        </Link>
      </PageHeader>
      <JobList userId={userId} />
    </div>
  );
}
