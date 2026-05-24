import Sidebar from "@/app/components/layout/SideBar";
import { AdminBreadcrumbs } from "./breadcrumbs";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <div className="flex w-full h-[calc(100vh-3.5rem)]">
      <Sidebar userId={userId} />
      <DashboardShell>
        <AdminBreadcrumbs userId={userId} />
        <div className="mt-4">{children}</div>
      </DashboardShell>
    </div>
  );
}
