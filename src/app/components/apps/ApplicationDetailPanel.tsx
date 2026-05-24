"use client";

import { useState } from "react";
import { X, FileText, Calendar, CheckCircle2, Sparkles, Building2, ExternalLink } from "lucide-react";
import ApplicationTimeline from "./ApplicationTimeline";

type JobApplication = {
  id: string;
  jobId: string;
  userId: string;
  user: { email: string; id: string; name: string; role: string };
  createdAt: string;
  resumeUrl: string;
  status: "APPLIED" | "SHORTLISTED" | "REJECTED";
};

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  APPLIED: { bg: "bg-indigo-50", text: "text-indigo-700", label: "Applied" },
  SHORTLISTED: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Under Review" },
  REJECTED: { bg: "bg-rose-50", text: "text-rose-700", label: "Rejected" },
};

interface ApplicationDetailPanelProps {
  application: JobApplication;
  onClose: () => void;
}

const skillRequirements = ["React", "TypeScript", "Node.js", "Python"];
const candidateSkills = ["React", "TypeScript", "GraphQL", "AWS"];
const interviewData: Record<string, { scheduled: boolean; date?: string; interviewer?: string; outcome?: string; notes?: string } | undefined> = {
  "demo-scheduled": { scheduled: true, date: "May 28, 2026 at 2:00 PM", interviewer: "Alex Kim" },
};

export default function ApplicationDetailPanel({ application, onClose }: ApplicationDetailPanelProps) {
  const matchedSkills = candidateSkills.filter((s) => skillRequirements.includes(s));
  const matchPct = Math.round((matchedSkills.length / skillRequirements.length) * 100);
  const st = statusStyles[application.status] || { bg: "bg-gray-50", text: "text-gray-700", label: application.status };
  const interview = interviewData[application.id];
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");

  return (
    <div className="w-[380px] shrink-0 h-full border-l border-border bg-white flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 h-14 shrink-0 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
            {application.user.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{application.user.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{application.user.email}</p>
          </div>
        </div>
        <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors" aria-label="Close panel">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</span>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${st.bg} ${st.text}`}>
              {st.label}
            </span>
          </div>

          <div className="rounded-lg border border-border bg-gray-50/50 p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                <Sparkles size={12} className="text-accent" />
                Requirements Match
              </div>
              <span className="text-xs font-semibold tabular-nums text-accent">{matchPct}%</span>
            </div>
            <div className="space-y-1.5">
              {skillRequirements.map((skill) => {
                const has = candidateSkills.includes(skill);
                return (
                  <div key={skill} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{skill}</span>
                    {has ? (
                      <CheckCircle2 size={12} className="text-emerald-500" />
                    ) : (
                      <X size={12} className="text-rose-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Timeline</span>
            <div className="mt-2">
              <ApplicationTimeline
                status={application.status}
                createdAt={application.createdAt}
                jobTitle="Position"
                companyName={application.user.name}
              />
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Interview</span>
            <div className="mt-2 rounded-lg border border-border p-3">
              {!interview || !interview.scheduled ? (
                <div>
                  <p className="text-xs text-muted-foreground mb-3">No interview scheduled yet.</p>
                  {scheduleOpen ? (
                    <div className="space-y-2">
                      <input
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full h-9 rounded-md border border-gray-200 px-3 text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setScheduleOpen(false); setScheduledDate(""); }}
                          className="flex-1 h-8 rounded-md border border-gray-200 text-xs font-medium text-muted-foreground hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => { setScheduleOpen(false); setScheduledDate(""); }}
                          className="flex-1 h-8 rounded-md bg-accent text-xs font-medium text-white hover:bg-accent/90 transition-colors"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setScheduleOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-3 py-2 text-xs font-medium text-accent hover:bg-accent/20 transition-colors"
                    >
                      <Calendar size={12} />
                      Schedule Interview
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <Calendar size={12} className="text-accent" />
                    <span>{interview.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building2 size={12} />
                    <span>Interviewer: {interview.interviewer}</span>
                  </div>
                  {interview.outcome && (
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      <span className="text-emerald-700 font-medium">{interview.outcome}</span>
                    </div>
                  )}
                  {interview.notes && (
                    <p className="text-xs text-muted-foreground bg-gray-50 rounded-md p-2">{interview.notes}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {application.resumeUrl && (
            <a
              href={application.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-gray-50 px-4 py-2.5 text-sm text-foreground hover:bg-gray-100 transition-all"
            >
              <FileText size={14} className="text-accent" />
              View Resume
              <ExternalLink size={12} className="text-muted-foreground" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
