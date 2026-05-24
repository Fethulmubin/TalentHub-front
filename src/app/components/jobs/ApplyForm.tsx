"use client";

import { useActionState, useEffect, useState } from "react";
import { Upload, Plus, FileText, X } from "lucide-react";
import { ApplyForJob } from "@/app/lib/actions/App";
import { Button } from "@/components/system/button";
import { Input } from "@/components/system/input";
import { Badge } from "@/components/system/badge";
import { toast } from "sonner";

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [skills, setSkills] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleAddSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      setSkills([...skills, input.trim()]);
      setInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const [state, action, isPending] = useActionState(ApplyForJob, {
    status: false,
    message: undefined,
  });

  useEffect(() => {
    if (state?.status === true) {
      toast.success("Application submitted successfully!");
    } else if (state?.status === false && state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-accent">
          <FileText size={13} />
        </div>
        <p className="text-sm font-semibold">Apply for this position</p>
      </div>
      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Resume (PDF)</p>
          <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 bg-surface/50 p-5 cursor-pointer hover:border-accent/40 hover:bg-accent/5 transition-all duration-150">
            <Upload size={20} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              {resumeFile ? resumeFile.name : "Drop your resume here or click to browse"}
            </p>
            <p className="text-[10px] text-muted-foreground">PDF only, up to 5MB</p>
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <input type="hidden" name="jobId" value={jobId} />
          {resumeFile && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-surface/50 rounded-lg px-3 py-2">
              <FileText size={13} className="text-accent" />
              <span className="truncate flex-1">{resumeFile.name}</span>
              <button
                type="button"
                onClick={() => setResumeFile(null)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove file"
              >
                <X size={13} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Skills</p>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {skills.map((skill) => (
                <Badge key={skill} variant="soft" size="sm">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label={`Remove ${skill}`}
                  >
                    <X size={10} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a skill..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <Button type="button" variant="secondary" size="sm" onClick={handleAddSkill}>
              <Plus size={14} />
            </Button>
          </div>
        </div>

        {skills.map((skill, i) => (
          <input key={i} type="hidden" name="skills" value={skill} />
        ))}

        {state?.status === false && state?.message && (
          <p className="text-xs text-destructive">{state.message}</p>
        )}

        <Button type="submit" className="w-full" size="sm" loading={isPending}>
          {isPending ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}
