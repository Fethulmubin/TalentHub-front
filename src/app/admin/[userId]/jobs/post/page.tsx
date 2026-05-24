"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus, X, Sparkles, ArrowRight } from "lucide-react";
import { PostJob } from "@/app/lib/actions/Job";
import { toast } from "sonner";

export default function PostJobPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  {/* [LOGIC PRESERVED — do not modify] */}
  const [state, action, isPending] = useActionState(PostJob, {
    status: false,
    errors: {},
    message: undefined,
  });

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  useEffect(() => {
    if (state?.status === true) {
      toast.success("Job posted successfully!");
    } else if (state?.status === false && state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="max-w-lg mx-auto mt-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Post a new job</h1>
        <p className="text-sm text-muted-foreground mt-1">Create a listing to attract top talent</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <form action={action} className="space-y-5">
          <div className="relative">
            <input
              name="title"
              id="job-title"
              placeholder=" "
              defaultValue=""
              className="peer h-12 w-full rounded-lg border border-gray-200 bg-white px-4 pt-4 pb-1 text-sm text-foreground placeholder-transparent transition-all duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <label
              htmlFor="job-title"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Job Title
            </label>
            {state?.errors?.title?.[0] && (
              <p className="mt-1.5 text-xs text-rose-500">{state.errors.title[0]}</p>
            )}
          </div>

          <div className="relative">
            <textarea
              name="description"
              id="job-description"
              placeholder=" "
              defaultValue=""
              rows={4}
              className="peer min-h-[112px] w-full rounded-lg border border-gray-200 bg-white px-4 pt-6 pb-2 text-sm text-foreground placeholder-transparent transition-all duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
            />
            <label
              htmlFor="job-description"
              className="absolute left-4 top-4 text-sm text-gray-400 transition-all duration-150 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Job Description
            </label>
            {state?.errors?.description?.[0] && (
              <p className="mt-1.5 text-xs text-rose-500">{state.errors.description[0]}</p>
            )}
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 peer-focus-within:text-accent transition-colors pointer-events-none z-10">$</span>
            <input
              type="number"
              name="price"
              id="job-salary"
              placeholder=" "
              defaultValue=""
              className="peer h-12 w-full rounded-lg border border-gray-200 bg-white pl-8 pr-4 pt-4 pb-1 text-sm text-foreground placeholder-transparent transition-all duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <label
              htmlFor="job-salary"
              className="absolute left-8 top-1/2 -translate-y-1/2 text-sm text-gray-400 transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Salary (annual)
            </label>
            {state?.errors?.price?.[0] && (
              <p className="mt-1.5 text-xs text-rose-500">{state.errors.price[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Required Skills</label>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-indigo-400 hover:text-rose-500 transition-colors"
                      aria-label={`Remove ${skill}`}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g. JavaScript, Python, React"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                className="flex-1 h-11 rounded-lg border border-gray-200 bg-white px-4 text-sm text-foreground placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <button
                type="button"
                onClick={addSkill}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-foreground hover:border-accent transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            {skills.map((skill, i) => (
              <input key={i} type="hidden" name="skills" value={skill} />
            ))}
            {state?.errors?.skills && (
              <p className="text-xs text-rose-500">{state.errors.skills[0]}</p>
            )}
          </div>

          {state?.status === false && !state.errors && (
            <p className="text-xs text-rose-500">{state.message}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="h-12 w-full rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              {isPending ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Posting...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  Publish Job
                  <ArrowRight size={15} />
                </span>
              )}
            </button>
            <p className="flex items-center justify-center gap-1.5 mt-3 text-xs text-accent">
              <Sparkles size={12} />
              AI will analyze applications and match top candidates
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
