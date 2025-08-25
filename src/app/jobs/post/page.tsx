"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Plus, X } from "lucide-react";
import { PostJob } from "@/app/lib/actions/Job";
import { toast } from "sonner";

export default function PostJobPage() {
  // local state for skills
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  // server action state (useActionState)
  const [state, action, isPending] = useActionState(PostJob, {
    status: false,
    errors: {},
    message: undefined,
  });

  // add skill
  const addSkill = () => {
    // removing white space and checking if there is duplicate skills
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  // remove skill
  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

//   toast after successfull job post
  useEffect(() => {
    if (state?.status === true) {
      toast.success("Job posted successfully!");
    }
    else if (state?.status === false && state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="max-w-md w-full mt-10 mx-auto bg-white shadow-lg rounded-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r rounded-2xl from-blue-600 to-indigo-500 p-6">
        <h2 className="text-white text-lg font-semibold flex items-center gap-2">
          <Send size={20} className="opacity-90" />
          Post a New Job
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Find the perfect candidate for your team by creating a compelling job posting
        </p>
      </div>

      {/* Form */}
      <form action={action} className="p-6 space-y-4">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Senior Software Engineer"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.errors?.title && (
            <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
          )}
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            name="description"
            rows={4}
            placeholder="Describe responsibilities, requirements..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          {state?.errors?.description && (
            <p className="text-red-500 text-sm">{state.errors.description[0]}</p>
          )}
        </div>

        {/* price */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="e.g. 100000"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.errors?.price && (
            <p className="text-red-500 text-sm">{state.errors.price[0]}</p>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Required Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="e.g. JavaScript"
              className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button type="button" onClick={addSkill} variant="secondary">
              <Plus size={16} />
            </Button>
          </div>

          {/* Skills preview */}
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1 text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          {/* Hidden inputs so skills go into FormData */}
          {skills.map((skill, i) => (
            <input key={i} type="hidden" name="skills" value={skill} />
          ))}

          {state?.errors?.skills && (
            <p className="text-red-500 text-sm">{state.errors.skills[0]}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          disabled={isPending}
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600"
        >
          <Send size={16} />
          {isPending ? "Posting..." : "Publish Job Posting"}
        </Button>

      </form>
    </div>
  );
}
