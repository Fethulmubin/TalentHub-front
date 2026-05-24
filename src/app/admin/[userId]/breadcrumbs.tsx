"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/system/breadcrumbs";
import { LayoutDashboard, Briefcase, PlusCircle, FileText } from "lucide-react";

const iconMap: Record<string, any> = {
  "dashboard": LayoutDashboard,
  "jobs": Briefcase,
  "post": PlusCircle,
  "apps": FileText,
};

export function AdminBreadcrumbs({ userId }: { userId: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const items = [
    { label: "Dashboard", href: `/admin/${userId}`, icon: <LayoutDashboard size={14} /> },
  ];

  let current = `/admin/${userId}`;
  for (let i = 2; i < segments.length; i++) {
    const seg = segments[i];
    current += `/${seg}`;
    const Icon = iconMap[seg];
    items.push({
      label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      href: current,
      icon: Icon ? <Icon size={14} /> : <></>,
    });
  }

  return <Breadcrumbs items={items} />;
}
