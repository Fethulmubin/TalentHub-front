"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Logout } from "@/app/lib/actions/Auth";
import { Command } from "@/components/system/command";
import { useKeyboard } from "@/hooks/use-keyboard";
import { Briefcase, User, LayoutDashboard, FileText, Upload, Search, Palette } from "lucide-react";

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useKeyboard([
    { key: "k", handler: () => setOpen((o) => !o), meta: true },
    { key: "k", handler: () => setOpen((o) => !o), ctrl: true },
  ]);

  const isApplicant = user?.role === "APPLICANT";
  const isEmployer = user?.role === "EMPLOYER";

  const items = [
    { id: "jobs", label: "Browse Jobs", description: "View all available job listings", icon: <Briefcase size={14} />, onSelect: () => router.push("/") },
    { id: "ui", label: "UI Showcase", description: "View all system components", icon: <Palette size={14} />, onSelect: () => router.push("/ui") },
    ...(isApplicant
      ? [
          { id: "upload-resume", label: "Upload Resume", description: "Submit your resume for AI analysis", icon: <Upload size={14} />, onSelect: () => router.push("/resume/upload") },
          { id: "apps", label: "My Applications", description: "Track your applications", icon: <FileText size={14} />, onSelect: () => router.push(`/apps/${user.id}`) },
        ]
      : []),
    ...(isEmployer
      ? [
          { id: "dashboard", label: "Admin Dashboard", description: "Manage jobs and applications", icon: <LayoutDashboard size={14} />, onSelect: () => router.push(`/admin/${user.id}`) },
          { id: "post-job", label: "Post a Job", description: "Create a new job listing", icon: <Upload size={14} />, onSelect: () => router.push(`/admin/${user.id}/jobs/post`) },
          { id: "my-jobs", label: "My Jobs", description: "View posted jobs", icon: <Briefcase size={14} />, onSelect: () => router.push(`/admin/${user.id}/jobs`) },
          { id: "candidates", label: "AI Candidate Search", description: "Search resumes with AI", icon: <Search size={14} />, onSelect: () => router.push(`/admin/${user.id}/candidates`) },
        ]
      : []),
    { id: "signin", label: user ? "Sign Out" : "Sign In", description: user ? "Log out of your account" : "Access your account", icon: <User size={14} />, onSelect: () => { if (!user) router.push("/auth/signIn"); } },
  ];

  return <Command items={items} open={open} onClose={() => setOpen(false)} placeholder="Search pages, actions..." />;
}
