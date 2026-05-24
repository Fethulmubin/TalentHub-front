"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive/15 text-destructive dark:bg-destructive/25",
        outline: "text-foreground border border-border",
        success: "border-transparent bg-success/15 text-success dark:bg-success/25",
        warning: "border-transparent bg-warning/15 text-warning dark:bg-warning/25",
        info: "border-transparent bg-info/15 text-info dark:bg-info/25",
        soft: "bg-muted text-muted-foreground border-transparent",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[10px] leading-[14px]",
        default: "px-2.5 py-0.5 text-xs leading-[16px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} role="status" />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
