import JobList from "@/app/components/jobs/JobAdminList";


export default async function MyJobsPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Posted Jobs</h1>
      <JobList userId={userId} />
    </div>
  );
}
