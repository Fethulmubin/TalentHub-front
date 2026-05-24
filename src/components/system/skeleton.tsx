"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("animate-shimmer rounded-md bg-gradient-to-r from-muted via-muted/80 to-muted bg-[length:200%_100%]", className)}
      aria-hidden="true"
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";

const SkeletonCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border border-border p-6 space-y-4", className)} {...props}>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-9 w-24" />
    </div>
  )
);
SkeletonCard.displayName = "SkeletonCard";

const SkeletonTableRow = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-4 py-3", className)} {...props}>
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-4 w-16" />
    </div>
  )
);
SkeletonTableRow.displayName = "SkeletonTableRow";

const SkeletonAvatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <Skeleton ref={ref} className={cn("rounded-full", className)} {...props} />
  )
);
SkeletonAvatar.displayName = "SkeletonAvatar";

export { Skeleton, SkeletonCard, SkeletonTableRow, SkeletonAvatar };

