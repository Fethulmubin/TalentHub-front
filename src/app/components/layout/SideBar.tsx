"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Sparkles,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/context/AuthContext";

const appCount = 3;

export default function Sidebar({ userId }: { userId: string }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    { name: "Dashboard", href: `/admin/${userId}`, icon: LayoutDashboard },
    { name: "Post Job", href: `/admin/${userId}/jobs/post`, icon: PlusCircle },
    { name: "My Jobs", href: `/admin/${userId}/jobs`, icon: Briefcase },
    {
      name: "Applications",
      href: `/admin/${userId}/jobs`,
      icon: FileText,
      badge: appCount,
      activeOn: [`/admin/${userId}/apps`],
    },
    { name: "AI Candidate Search", href: `/admin/${userId}/candidates`, icon: Sparkles },
  ];

  const isActive = (href: string, activeOn?: string[]) => {
    if (href === `/admin/${userId}`) return pathname === href;

    if (activeOn) {
      for (const prefix of activeOn) {
        if (pathname === prefix || pathname.startsWith(prefix + "/")) return true;
      }
      return false;
    }

    if (pathname === href) return true;
    if (pathname.startsWith(href + "/")) {
      const childSeg = pathname.slice(href.length + 1).split("/")[0];
      if (childSeg === "post") return false;
      return true;
    }
    return false;
  };

  const userInitials = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 h-full border-r border-border bg-card overflow-hidden">
      <div className="flex h-14 items-center gap-2.5 px-5 border-b border-border shrink-0">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-[10px] font-bold text-white shadow-sm">
          T
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-foreground leading-tight">TalentHub</p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium leading-tight">Employer</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 p-2 overflow-y-auto">
        {menuItems.map(({ name, href, icon: Icon, badge, activeOn }) => {
          const active = isActive(href, activeOn);
          return (
            <Link
              key={name}
              href={href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-accent shadow-sm shadow-accent/30" />
              )}
              <Icon size={18} className={cn("shrink-0", active ? "text-accent" : "text-muted-foreground/60")} />
              <span className="flex-1 truncate">{name}</span>
              {badge != null && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent/10 px-1.5 text-[10px] font-semibold text-accent">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3 shrink-0">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
            {userInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-foreground truncate">{user?.email?.split("@")[0] || "User"}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user?.email || ""}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
