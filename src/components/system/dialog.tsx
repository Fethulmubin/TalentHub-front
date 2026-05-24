"use client";

import { useEffect, useState, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  loading?: boolean;
}

export function Dialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  loading,
}: DialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-md rounded-xl border border-border bg-popover p-6 shadow-xl animate-scale-in"
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        aria-describedby={description ? "dialog-description" : undefined}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p id="dialog-description" className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {children && <div className="mt-4">{children}</div>}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button variant={variant === "destructive" ? "destructive" : "default"} onClick={onConfirm} loading={loading}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
