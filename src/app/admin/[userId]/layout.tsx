import Sidebar from "@/app/components/layout/SideBar";


export default async function AdminLayout({ children, params }: { children: React.ReactNode, params: Promise<{ userId: string }> }) {
  const {userId} = await params;
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar (client) */}
      <Sidebar userId={userId} />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
