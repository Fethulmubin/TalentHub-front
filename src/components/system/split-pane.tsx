"use client";

import { useState, useRef, useCallback, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SplitPaneProps {
  left: ReactNode;
  right: ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

export function SplitPane({
  left,
  right,
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
  className,
}: SplitPaneProps) {
  const [split, setSplit] = useState(defaultSize);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplit(Math.min(Math.max(pct, minSize), maxSize));
    };

    const handleMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [minSize, maxSize]);

  const handleMouseDown = useCallback(() => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  return (
    <div
      ref={containerRef}
      id="split-pane-container"
      className={cn("flex h-full w-full overflow-hidden", className)}
    >
      <div className="overflow-auto" style={{ width: `${split}%` }}>
        {left}
      </div>
      <div
        className="relative flex w-1.5 shrink-0 cursor-col-resize items-center justify-center bg-border hover:bg-ring/50 transition-colors"
        onMouseDown={handleMouseDown}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize panel"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setSplit((s) => Math.max(s - 2, minSize));
          if (e.key === "ArrowRight") setSplit((s) => Math.min(s + 2, maxSize));
        }}
      >
        <div className="h-8 w-0.5 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="overflow-auto flex-1" style={{ width: `${100 - split}%` }}>
        {right}
      </div>
    </div>
  );
}
