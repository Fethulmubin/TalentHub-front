"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/system/button";
import { Upload, LayoutDashboard, Palette, Briefcase } from "lucide-react";

export default function HeroActions() {
  const { user } = useAuth();

  const isApplicant = user?.role === "APPLICANT";
  const isEmployer = user?.role === "EMPLOYER";

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-6 -mt-2">
      <div className="flex flex-wrap items-center gap-3">
        {isApplicant && (
          <>
            <Link href="/resume/upload">
              <Button size="sm" className="gap-1.5">
                <Upload size={14} />
                Upload Resume
              </Button>
            </Link>
            <Link href={`/apps/${user.id}`}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Briefcase size={14} />
                My Applications
              </Button>
            </Link>
          </>
        )}
        {isEmployer && (
          <Link href={`/admin/${user.id}`}>
            <Button size="sm" className="gap-1.5">
              <LayoutDashboard size={14} />
              Go to Dashboard
            </Button>
          </Link>
        )}
        <Link href="/ui" className="ml-auto">
          <Button variant="ghost" size="xs" className="gap-1.5 text-muted-foreground">
            <Palette size={12} />
            UI Kit
          </Button>
        </Link>
      </div>
    </div>
  );
}
