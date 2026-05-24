import { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
  header?: ReactNode;
}

export function DashboardShell({ children, header }: DashboardShellProps) {
  return (
    <main className="flex-1 min-w-0 h-full flex flex-col bg-surface">
      {header && (
        <div className="border-b border-border bg-white/80 backdrop-blur-sm px-6 lg:px-8 py-3 shrink-0">
          {header}
        </div>
      )}
      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 lg:py-8">
        {children}
      </div>
    </main>
  );
}
