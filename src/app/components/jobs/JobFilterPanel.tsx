"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// simple debounce helper
function debounce(fn: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
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

  // update URL query with debounce
  const updateQuery = debounce(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (skill) params.set("skill", skill);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 250); // 250ms delay

  // watch input changes
  useEffect(() => {
    updateQuery();
  }, [search, skill]);

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded flex-1"
      />

      <select
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="border p-2 rounded flex-1"
      >
        <option value="">All Skills</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
        <option value="Python">Python</option>
      </select>
    </div>
  );
}
