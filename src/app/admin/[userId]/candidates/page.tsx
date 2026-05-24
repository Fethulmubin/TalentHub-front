"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/system/card";
import { DataGrid, Column } from "@/components/system/data-grid";
import { Button } from "@/components/system/button";
import { Input } from "@/components/system/input";
import { Badge } from "@/components/system/badge";
import { searchResumes } from "@/app/lib/actions/Resume";
import { Search, User, Sparkles, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import type { SearchResult } from "@/types/resume";
import { PageHeader } from "@/components/layout/page-header";

export default function CandidateSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    const res = await searchResumes(query);
    if (res.status) {
      setResults(res.results);
    }
    setLoading(false);
  };

  const columns: Column<SearchResult>[] = [
    {
      key: "fileName",
      header: "Candidate",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border">
            <User size={13} />
          </div>
          <div>
            <span className="font-medium text-sm">{row.fileName.replace(/^\d+-\w+-/, "").replace(".pdf", "")}</span>
          </div>
        </div>
      ),
    },
    {
      key: "skills",
      header: "Skills",
      className: "min-w-[200px]",
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.skills.slice(0, 4).map((s) => (
            <Badge key={s} variant="soft" size="sm">{s}</Badge>
          ))}
          {row.skills.length > 4 && (
            <Badge variant="soft" size="sm">+{row.skills.length - 4}</Badge>
          )}
        </div>
      ),
    },
    {
      key: "yearsExperience",
      header: "Experience",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-muted-foreground tabular-nums">
          {row.yearsExperience !== null ? `${row.yearsExperience}y` : "—"}
        </span>
      ),
    },
    {
      key: "similarity",
      header: "Match",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${Math.round(row.similarity * 100)}%` }}
            />
          </div>
          <span className="text-sm font-medium tabular-nums">
            {Math.round(row.similarity * 100)}%
          </span>
        </div>
      ),
    },
    {
      key: "resumeId",
      header: "",
      render: (row) => (
        <Link href={`/candidates/${row.resumeId}`}>
          <Button variant="ghost" size="xs" className="gap-1">
            View
            <ArrowRight size={12} />
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="AI Candidate Search" description="Search through processed resumes using semantic AI">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles size={12} className="text-accent" />
          <span>AI-powered</span>
        </div>
      </PageHeader>

      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by skills, experience, technologies..."
                leftIcon={<Search size={14} />}
              />
            </div>
            <Button type="submit" loading={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {searched && (
        <div>
          {!loading && (
            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <Users size={14} />
              <span>{results.length} candidate{results.length !== 1 ? "s" : ""} found</span>
            </div>
          )}
          <DataGrid
            columns={columns}
            data={results}
            keyExtractor={(r) => r.resumeId + r.chunkIndex}
            loading={loading}
            emptyState={
              <div className="flex flex-col items-center py-16 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border">
                  <User size={20} />
                </div>
                <p className="text-sm font-medium">No candidates found</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Try a different search query or adjust your keywords
                </p>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
