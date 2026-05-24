"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsible, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        "flex h-full w-64 flex-col border-r border-border bg-sidebar text-sidebar-foreground",
        collapsible && "w-16 transition-all duration-300",
        className
      )}
      aria-label="Sidebar navigation"
      {...props}
    />
  )
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex h-14 items-center border-b border-sidebar-border px-4", className)} {...props} />
  )
);
SidebarHeader.displayName = "SidebarHeader";

interface SidebarNavGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const SidebarNavGroup = forwardRef<HTMLDivElement, SidebarNavGroupProps>(
  ({ className, label, children, ...props }, ref) => (
    <div ref={ref} className={cn("px-3 py-2", className)} {...props}>
      {label && (
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
          {label}
        </p>
      )}
      <nav className="space-y-0.5">{children}</nav>
    </div>
  )
);
SidebarNavGroup.displayName = "SidebarNavGroup";

interface SidebarItemProps extends HTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode;
  active?: boolean;
  href?: string;
}

const SidebarItem = forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ className, icon, active, children, href, ...props }, ref) => {
    const Tag = href ? "a" : "button";
    return (
      <Tag
        ref={ref as any}
        href={href}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          className
        )}
        aria-current={active ? "page" : undefined}
        {...(props as any)}
      >
        {icon && <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>}
        <span>{children}</span>
      </Tag>
    );
  }
);
SidebarItem.displayName = "SidebarItem";

const SidebarFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-auto border-t border-sidebar-border p-3", className)} {...props} />
  )
);
SidebarFooter.displayName = "SidebarFooter";

export { Sidebar, SidebarHeader, SidebarNavGroup, SidebarItem, SidebarFooter };
