"use client";

import { useState, useMemo, ReactNode, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  loading?: boolean;
  emptyState?: ReactNode;
  error?: string | null;
  onRetry?: () => void;
  sortable?: boolean;
  defaultSort?: { key: string; direction: "asc" | "desc" };
  className?: string;
}

function SortIcon({ direction }: { direction: "asc" | "desc" | null }) {
  return (
    <svg
      className={cn(
        "inline-block h-3 w-3 ml-1 transition-opacity",
        direction ? "opacity-100" : "opacity-30"
      )}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {direction === "asc" ? (
        <path d="M7.5 11.5V3.5M7.5 3.5L3.5 7.5M7.5 3.5L11.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M7.5 3.5V11.5M7.5 11.5L3.5 7.5M7.5 11.5L11.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function DataGrid<T>({
  columns,
  data,
  keyExtractor,
  loading,
  emptyState,
  error,
  onRetry,
  sortable = true,
  defaultSort,
  className,
}: DataGridProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(defaultSort?.key || null);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(defaultSort?.direction || null);

  const handleSort = useCallback(
    (key: string) => {
      if (!sortable) return;
      if (sortKey === key) {
        if (sortDir === "asc") setSortDir("desc");
        else if (sortDir === "desc") { setSortKey(null); setSortDir(null); }
        else { setSortKey(key); setSortDir("asc"); }
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
    },
    [sortable, sortKey, sortDir]
  );

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <svg className="h-5 w-5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8.4449 2.60817C8.0183 1.79415 6.9817 1.79415 6.55509 2.60817L1.16172 12.75C0.745353 13.5448 1.32846 14.5 2.2606 14.5H12.7394C13.6715 14.5 14.2546 13.5448 13.8383 12.75L8.4449 2.60817Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5 5.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7.5 11.5C7.77614 11.5 8 11.2761 8 11C8 10.7239 7.77614 10.5 7.5 10.5C7.22386 10.5 7 10.7239 7 11C7 11.2761 7.22386 11.5 7.5 11.5Z" fill="currentColor" />
          </svg>
        </div>
        <p className="text-sm font-medium text-foreground">Failed to load data</p>
        <p className="mt-1 text-xs text-muted-foreground">{error}</p>
        {onRetry && (
          <Button variant="secondary" size="sm" className="mt-3" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (!loading && sorted.length === 0) {
    return emptyState ? (
      <>{emptyState}</>
    ) : (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <svg className="h-5 w-5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M7.5 1.5L9.5 5.5L13.5 6L10.5 9L11.5 13L7.5 11L3.5 13L4.5 9L1.5 6L5.5 5.5L7.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-sm font-medium text-foreground">No data</p>
        <p className="mt-1 text-xs text-muted-foreground">There is nothing to display yet.</p>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border/60 bg-card shadow-xs", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "h-10 px-4 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-widest",
                    col.sortable && sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
                    col.hideOnMobile && "hidden sm:table-cell",
                    col.className
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                  aria-sort={sortKey === col.key ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                >
                  <span className="inline-flex items-center">
                    {col.header}
                    {col.sortable && sortable && <SortIcon direction={sortKey === col.key ? sortDir : null} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="border-b border-border/40 last:border-0">
                    {columns.map((col) => (
                      <td key={col.key} className={cn("px-4 py-3", col.hideOnMobile && "hidden sm:table-cell")}>
                        <div className="h-4 w-full max-w-[120px] rounded bg-muted animate-pulse-soft" />
                      </td>
                    ))}
                  </tr>
                ))
              : sorted.map((item, idx) => (
                  <tr
                    key={keyExtractor(item)}
                    className={cn(
                      "border-b border-border/40 last:border-0 transition-colors",
                      "hover:bg-muted/40"
                    )}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn("px-4 py-3 text-sm text-foreground", col.hideOnMobile && "hidden sm:table-cell", col.className)}
                      >
                        {col.render ? col.render(item) : (item as any)[col.key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
