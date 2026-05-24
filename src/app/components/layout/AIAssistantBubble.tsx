"use client";

import { Sparkles } from "lucide-react";

export default function AIAssistantBubble() {
  return (
    <button
      className="fixed bottom-6 right-6 z-fixed flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/80 text-white shadow-lg shadow-accent/20 ring-1 ring-white/10 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-accent/30 active:scale-95"
      aria-label="AI Assistant"
      title="Ask AI Assistant"
    >
      <Sparkles size={18} />
    </button>
  );
}
