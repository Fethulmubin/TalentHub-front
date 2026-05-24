"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  size?: "sm" | "default" | "lg";
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, indeterminate, size = "default", ...props }, ref) => {
    const pct = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeStyles: Record<string, string> = {
      sm: "h-1.5",
      default: "h-2",
      lg: "h-3",
    };

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label="Progress"
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-muted",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full bg-accent transition-all duration-700 ease-out",
            indeterminate && "w-1/2 animate-shimmer"
          )}
          style={indeterminate ? {} : { width: `${pct}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
