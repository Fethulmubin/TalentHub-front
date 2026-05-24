"use client";

import { Fragment, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-sm text-muted-foreground", className)}>
      {items.map((crumb, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={crumb.label}>
            {i > 0 && (
              <svg className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5.5 3.5L9.5 7.5L5.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {isLast || !crumb.href ? (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5",
                  isLast ? "text-foreground font-medium" : ""
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {crumb.icon}
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                {crumb.icon}
                {crumb.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
