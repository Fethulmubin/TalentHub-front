"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";

interface RetryStateProps {
  title?: string;
  description?: string;
  onRetry: () => void;
  className?: string;
}

export function RetryState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: RetryStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <svg className="h-6 w-6" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10.5 4.5L12.5 6.5L10.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 10.5L2.5 8.5L4.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 8.5C1.5 5.46243 3.96243 3 7 3H7.5M13.5 8.5C13.5 11.5376 11.0376 14 8 14H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      <Button className="mt-4" variant="secondary" onClick={onRetry}>
        <svg className="mr-2 h-4 w-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1.84998 7.49998C1.84998 4.66416 4.05979 1.53151 7.49998 1.53151C10.2783 1.53151 12.4202 3.54229 13.1375 5.49998M13.15 1.84998V5.49998H9.49998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.15 7.49998C13.15 10.3358 10.9402 13.4685 7.49998 13.4685C4.72166 13.4685 2.57979 11.4577 1.86249 9.49998M1.84998 13.15V9.49998H5.49998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Try Again
      </Button>
    </div>
  );
}
