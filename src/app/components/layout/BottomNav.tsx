"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Briefcase, User, LayoutDashboard, FileText, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isApplicant = user?.role === "APPLICANT";
  const isEmployer = user?.role === "EMPLOYER";

  const tabs = [
    { label: "Jobs", href: "/", icon: Briefcase, exact: true, show: true },
    ...(isApplicant
      ? [
          { label: "Resume", href: "/resume/upload", icon: Upload, exact: false, show: true },
          { label: "My Apps", href: `/apps/${user.id}`, icon: FileText, exact: false, show: true },
        ]
      : []),
    ...(isEmployer
      ? [
          { label: "Dashboard", href: `/admin/${user.id}`, icon: LayoutDashboard, exact: false, show: true },
        ]
      : []),
    { label: user ? "Account" : "Sign In", href: user ? "#" : "/auth/signIn", icon: User, exact: false, show: true },
  ].filter((t) => t.show);

  const isActive = (tab: (typeof tabs)[number]) => {
    if (tab.href === "#") return false;
    if (tab.exact) return pathname === tab.href;
    return pathname.startsWith(tab.href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-fixed border-t border-border/60 bg-background/95 backdrop-blur-lg safe-area-bottom">
      <div className="flex items-center justify-around h-14 px-2">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={cn(
              "flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all duration-150 min-w-0 flex-1",
              isActive(tab)
                ? "text-primary"
                : "text-muted-foreground/60 hover:text-foreground"
            )}
          >
            <tab.icon size={17} />
            <span className="text-[10px] font-medium leading-none truncate max-w-full">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
