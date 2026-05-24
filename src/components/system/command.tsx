"use client";

import { forwardRef, useEffect, useState, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  icon?: ReactNode;
  onSelect: () => void;
}

interface CommandProps {
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
  placeholder?: string;
  className?: string;
}

function Command({ items, open, onClose, placeholder = "Search...", className }: CommandProps) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const filtered = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        filtered[selectedIndex].onSelect();
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [filtered, selectedIndex, onClose]
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-modal flex items-start justify-center pt-[15vh] bg-black/30 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={cn(
          "w-full max-w-lg rounded-xl border border-border bg-popover shadow-2xl overflow-hidden animate-scale-in",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="flex items-center border-b border-border px-4">
          <svg className="mr-3 h-4 w-4 shrink-0 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9 9.5L12.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Search commands"
          />
          <kbd className="hidden sm:inline-flex items-center rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>
        <div className="max-h-72 overflow-y-auto p-2 scrollbar-thin" role="listbox">
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">No results found.</p>
          )}
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-left transition-colors",
                idx === selectedIndex ? "bg-accent text-accent-foreground" : "text-foreground"
              )}
              onClick={() => { item.onSelect(); onClose(); }}
              onMouseEnter={() => setSelectedIndex(idx)}
              role="option"
              aria-selected={idx === selectedIndex}
            >
              {item.icon && <span className="flex h-5 w-5 items-center justify-center text-muted-foreground">{item.icon}</span>}
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{item.label}</div>
                {item.description && <div className="text-xs text-muted-foreground truncate">{item.description}</div>}
              </div>
              {item.shortcut && (
                <kbd className="hidden sm:inline-flex items-center rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground shrink-0">
                  {item.shortcut}
                </kbd>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

const CommandTrigger = forwardRef<
  HTMLButtonElement,
  { onClick: () => void; className?: string; children?: ReactNode }
>(({ onClick, className, children }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    className={cn(
      "inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
      className
    )}
    aria-label="Open command palette"
  >
    {children || (
      <>
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9 9.5L12.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Search</span>
        <kbd className="ml-auto hidden sm:inline-flex items-center rounded-md border border-border px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </>
    )}
  </button>
));
CommandTrigger.displayName = "CommandTrigger";

export { Command, CommandTrigger };
