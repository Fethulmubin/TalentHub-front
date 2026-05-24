"use client";

import { Sparkles, Send, User, ArrowUp } from "lucide-react";
import { useState } from "react";

const suggestedPrompts = [
  "Who fits best?",
  "Compare skills",
  "Strongest backend?",
];

export default function AIAssistantPanel() {
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([
    {
      role: "ai",
      text: "Hi! I've analyzed all applicants for this role. Ask me anything — skills comparison, experience gaps, or who to interview first.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSend = async (msg: string) => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "I've analyzed the candidates. Based on the requirements, Sarah Chen has the strongest match with 94% compatibility. Would you like me to elaborate on any specific skill?" },
      ]);
    }, 1500);
  };

  return (
    <aside className="w-[320px] shrink-0 h-full border-l border-border bg-card flex flex-col">
      <div className="h-14 shrink-0 border-b border-border flex items-center gap-2.5 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Sparkles size={16} />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">AI Candidate Assistant</p>
          <p className="text-[11px] text-muted-foreground leading-tight">Ask anything about applicants</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "ai" ? (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <Sparkles size={12} />
              </div>
            ) : (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                <User size={12} />
              </div>
            )}
            <div className={`max-w-[85%] rounded-xl px-3 py-2.5 text-sm leading-relaxed ${
              msg.role === "ai"
                ? "bg-white border border-gray-200 text-foreground shadow-xs"
                : "bg-accent text-white"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
              <Sparkles size={12} />
            </div>
            <div className="bg-white border border-gray-200 rounded-xl rounded-tl-sm px-3 py-2 shadow-xs">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && !typing && (
          <div className="flex flex-wrap gap-2 pt-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="inline-flex items-center rounded-full border border-accent/30 px-3 py-1 text-xs font-medium text-accent bg-white hover:bg-accent/5 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border p-3 bg-white">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about candidates..."
            className="flex-1 h-10 rounded-full border border-gray-200 bg-gray-50 px-4 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors shadow-xs"
          >
            <ArrowUp size={16} />
          </button>
        </form>
      </div>
    </aside>
  );
}
