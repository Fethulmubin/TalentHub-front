import z from "zod";

export const AppSchema = z.object({
    jobId: z.string().uuid(),
    resume: z.instanceof(File).refine((file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024, {
        message: "Invalid file. Only PDF files under 5MB are allowed.",
    }),
})