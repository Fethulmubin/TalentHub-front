import ApplicationTable from "@/app/components/apps/ApplicationTable";


export default async function ApplicationsPage({params}: {params: Promise<{jobId: string}>}) {
  const { jobId } = await params;
  return (
    <div className="py-6 px-2">
      <h1 className="text-2xl font-semibold mb-6">Application Management</h1>
      <ApplicationTable jobId={jobId} />
    </div>
  );
}
