"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/system/card";
import { Button } from "@/components/system/button";
import { Badge } from "@/components/system/badge";
import { Upload, FileText, CheckCircle, Sparkles, Loader, ArrowRight, RotateCcw } from "lucide-react";
import { uploadResume } from "@/app/lib/actions/Resume";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResumeUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const result = await uploadResume(file);
    setLoading(false);

    if (result.status) {
      setProfileId(result.profileId);
      toast.success("Resume uploaded! Processing started.");
    } else {
      toast.error(result.message);
    }
  };

  if (profileId) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <div className="w-full max-w-sm text-center space-y-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 text-success ring-1 ring-success/20">
            <CheckCircle size={28} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Resume Uploaded</h1>
            <p className="text-sm text-muted-foreground mt-1">Your resume is being processed. This may take a minute.</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-surface/50 rounded-lg px-4 py-3">
            <Loader size={14} className="animate-spin text-accent" />
            <span>Analyzing skills, experience, and education...</span>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={() => router.push(`/candidates/${profileId}`)} className="w-full">
              View Results
              <ArrowRight size={14} />
            </Button>
            <Button variant="outline" onClick={() => { setProfileId(null); setFile(null); }} className="w-full">
              <RotateCcw size={14} />
              Upload Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
            <Upload size={22} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Upload Resume</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload your PDF for AI-powered analysis and matching</p>
        </div>

        <Card>
          <CardContent className="p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border/60 bg-surface/30 p-8 cursor-pointer hover:border-accent/40 hover:bg-accent/5 transition-all duration-150">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Upload size={22} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    {file ? file.name : "Drop your resume here"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "or click to browse (PDF, up to 5MB)"}
                  </p>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>

              {file && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-surface/50 rounded-lg px-3 py-2">
                  <FileText size={13} className="text-accent" />
                  <span className="truncate flex-1">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove file"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5 3.5L3.5 11.5M3.5 3.5L11.5 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={!file} loading={loading}>
                {loading ? "Uploading..." : "Upload & Analyze"}
                {!loading && <Sparkles size={14} />}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles size={14} className="text-accent" />
              What happens next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FileText size={11} />
              </div>
              <span className="text-xs">PDF text is extracted and parsed</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <CheckCircle size={11} />
              </div>
              <span className="text-xs">Skills, experience, and education are identified by AI</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Sparkles size={11} />
              </div>
              <span className="text-xs">Vector embeddings enable semantic candidate search</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
