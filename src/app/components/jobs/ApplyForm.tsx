"use client";
import { useActionState, useEffect, useState } from "react";
import { Upload, Plus, FileIcon, X } from "lucide-react";
import { ApplyForJob } from "@/app/lib/actions/App";
import { Button } from "@/components/ui/button";
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
        toast.success("Application Submitted successfully!");
      }
      else if (state?.status === false && state?.message) {
        toast.error(state.message);
      }
    }, [state]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <form
        action={action}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          Apply for Position
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Join our team of talented developers. Upload your resume and showcase
          your skills.
        </p>

        {/* Resume Upload */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Resume Upload</h2>
          <label className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition flex flex-col items-center">
            <Upload className="mb-3 text-blue-500" size={32} />
            <p className="text-gray-600">
              Drop your resume here or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Only PDF Supported (up to 5MB)
            </p>
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <input type="text" value={jobId} name="jobId" className="hidden" />
          {resumeFile && (
            <span className="mt-2 flex items-center gap-2 text-sm">
              <FileIcon className="text-blue-500" size={20} />
              <span className="text-gray-700">{resumeFile.name}</span>
              <X
                className="ml-2 cursor-pointer text-red-500"
                size={16}
                onClick={() => setResumeFile(null)}
              />
            </span>
          )}
        </div>

        {/* Technical Skills */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>{" "}
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a skill (e.g., React, AWS)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-blue-500 text-white px-4 rounded-xl flex items-center gap-1 hover:bg-blue-600 transition"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Hidden skills input */}
        {/* {skills.map((skill, i) => (
          <input key={i} type="hidden" name="skills" value={skill} />
        ))} */}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 rounded-xl ${
            isPending
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isPending ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}
