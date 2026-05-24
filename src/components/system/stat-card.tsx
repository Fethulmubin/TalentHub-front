"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { direction: "up" | "down"; value: string };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border/60 bg-card p-5 shadow-xs", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
          {trend && (
            <p
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium",
                trend.direction === "up" ? "text-success" : "text-destructive"
              )}
            >
              {trend.direction === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
