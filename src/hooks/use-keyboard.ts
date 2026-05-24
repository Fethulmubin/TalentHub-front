"use client";

import { useEffect, useRef } from "react";

type KeyHandler = (e: KeyboardEvent) => void;

interface KeyBinding {
  key: string;
  handler: KeyHandler;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  enabled?: boolean;
}

export function useKeyboard(bindings: KeyBinding[]) {
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      for (const binding of bindingsRef.current) {
        if (binding.enabled === false) continue;

        const keyMatch = e.key.toLowerCase() === binding.key.toLowerCase();
        const ctrlMatch = !!binding.ctrl === (e.ctrlKey || e.metaKey);
        const metaMatch = !!binding.meta === e.metaKey;
        const shiftMatch = !!binding.shift === e.shiftKey;
        const altMatch = !!binding.alt === e.altKey;

        if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
          e.preventDefault();
          binding.handler(e);
          return;
        }
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
}
