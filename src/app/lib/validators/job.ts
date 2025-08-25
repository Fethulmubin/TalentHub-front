import z from "zod";

export const JobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Job description must be at least 10 characters"),
  skills: z
    .array(z.string().min(2, "Skill must be at least 2 characters"))
    .nonempty("At least one skill is required"),
});
