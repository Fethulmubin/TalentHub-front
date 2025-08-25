import ApplicationTable from "@/app/components/apps/ApplicationTable";


export default function ApplicationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Application Management</h1>
      <ApplicationTable />
    </div>
  );
}
