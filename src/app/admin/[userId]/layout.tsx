import Sidebar from "@/app/components/layout/SideBar";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userId={userId} />

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 md:p-6 lg:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
