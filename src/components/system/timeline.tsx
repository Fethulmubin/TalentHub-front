"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-0", className)} {...props}>
      {children}
    </div>
  )
);
Timeline.displayName = "Timeline";

interface TimelineItemProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  completed?: boolean;
  icon?: ReactNode;
  title: string;
  description?: string;
  timestamp?: string;
}

const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, active, completed, icon, title, description, timestamp, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative flex gap-4 pb-8 last:pb-0", className)} {...props}>
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
              completed
                ? "border-primary bg-primary text-primary-foreground"
                : active
                ? "border-primary bg-background text-primary"
                : "border-border bg-background text-muted-foreground"
            )}
          >
            {icon || (
              completed ? (
                <svg className="h-4 w-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              ) : active ? (
                <div className="h-2 w-2 rounded-full bg-primary" />
              ) : (
                <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              )
            )}
          </div>
          <div className="mt-1 flex-1 w-0.5 bg-border" />
        </div>
        <div className="flex-1 pb-4 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn(
              "text-sm font-medium",
              completed ? "text-foreground" : active ? "text-foreground" : "text-muted-foreground"
            )}>
              {title}
            </h4>
            {timestamp && (
              <time className="shrink-0 text-xs text-muted-foreground">{timestamp}</time>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
