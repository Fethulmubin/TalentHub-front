"use client";

import { useEffect, useState, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
  side?: "left" | "right";
}

export function Drawer({ open, onClose, children, className, title, side = "right" }: DrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!mounted || !visible) return null;

  const slideClass = side === "right"
    ? open ? "animate-slide-in-right" : "animate-slide-out-right"
    : open ? "animate-slide-in-right" : "animate-slide-out-right";

  return createPortal(
    <div
      className="fixed inset-0 z-overlay bg-black/30 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-overlay w-full max-w-md border-l border-border bg-background shadow-xl",
          slideClass,
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Drawer"}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-6">
          {title && <h2 className="text-base font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Close drawer"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.5L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31318L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.5L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto p-6" style={{ height: "calc(100% - 3.5rem)" }}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
