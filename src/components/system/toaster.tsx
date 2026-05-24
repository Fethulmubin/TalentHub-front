"use client";

import { Toaster as SonnerToaster } from "sonner";

interface ToasterProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  richColors?: boolean;
  closeButton?: boolean;
  duration?: number;
}

export function Toaster({
  position = "top-right",
  richColors = true,
  closeButton = true,
  duration = 4000,
}: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      richColors={richColors}
      closeButton={closeButton}
      duration={duration}
      toastOptions={{
        className: "text-sm",
      }}
      theme="system"
      aria-label="Notifications"
    />
  );
}
