"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { X, Sparkles, ChevronDown } from "lucide-react";

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function JobFilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [skill, setSkill] = useState(searchParams.get("skill") || "");

  const updateQuery = useCallback(
    debounce((s: string, sk: string) => {
      const params = new URLSearchParams();
      if (s) params.set("search", s);
      if (sk) params.set("skill", sk);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300),
    [router, pathname]
  );

  useEffect(() => {
    updateQuery(search, skill);
  }, [search, skill, updateQuery]);

  const hasFilters = search || skill;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent">
            <Sparkles size={16} />
          </div>
          <input
            type="text"
            placeholder="Search jobs with AI..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-13 w-full rounded-full border border-gray-300 bg-white pl-11 pr-4 text-sm text-foreground placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent shadow-xs"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="relative">
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="flex h-13 rounded-full border border-gray-300 bg-white pl-4 pr-10 text-sm text-foreground appearance-none transition-all duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent shadow-xs min-w-[130px]"
          >
            <option value="">All Skills</option>
            <option value="React">React</option>
            <option value="Node">Node</option>
            <option value="Python">Python</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {hasFilters && (
          <button
            onClick={() => { setSearch(""); setSkill(""); }}
            className="flex h-13 items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-gray-50 transition-all shadow-xs"
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
