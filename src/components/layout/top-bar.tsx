"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TopBarProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function TopBar({ title, description, actions, className }: TopBarProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="min-w-0 flex-1">
        {title && <h1 className="text-lg font-semibold tracking-tight truncate">{title}</h1>}
        {description && <p className="text-sm text-muted-foreground truncate">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
