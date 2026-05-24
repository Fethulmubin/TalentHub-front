import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface AuthShellProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function AuthShell({ children, title, description }: AuthShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <Image src="/talent.png" width={32} height={32} alt="TalentHub" className="h-8 w-8" />
            <span className="text-base font-semibold text-foreground">TalentHub</span>
          </Link>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
