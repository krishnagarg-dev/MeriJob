const { z } = require("zod");

const optionalText = z.string().trim().optional().default("");
const nullableNonNegativeNumber = z.number().finite().nonnegative().nullable().optional();
const deadlineSchema = z.union([
  z.string().datetime({ offset: true }).transform((value) => new Date(value)),
  z.string().date().transform((value) => new Date(`${value}T00:00:00.000Z`)),
  z.null(),
]).optional();

const jobFields = {
  title: z.string().trim().min(1, "Job title is required").max(160),
  description: z.string().trim().min(1, "Description is required").max(20000),
  skills: z.array(z.string().trim().min(1).max(80)).max(50).optional().default([]),
  location: optionalText,
  workMode: z.enum(["remote", "hybrid", "onsite"]).optional().default("onsite"),
  employmentType: z.enum(["full-time", "part-time", "contract", "internship", "freelance"]).optional().default("full-time"),
  experience: z.string().trim().max(120).optional().default(""),
  salaryMin: nullableNonNegativeNumber,
  salaryMax: nullableNonNegativeNumber,
  salaryPeriod: z.enum(["year", "month", "hour"]).optional().default("year"),
  openings: z.number().finite().int().min(1).max(10000).optional().default(1),
  deadline: deadlineSchema,
  status: z.enum(["draft", "pending", "published", "closed", "rejected"]).optional().default("pending"),
};

const jobSchema = z.object(jobFields).superRefine((job, context) => {
  if (job.salaryMin != null && job.salaryMax != null && job.salaryMin > job.salaryMax) {
    context.addIssue({ code: "custom", path: ["salaryMax"], message: "Maximum salary must be greater than or equal to minimum salary" });
  }
});

const updateJobSchema = z.object(Object.fromEntries(
  Object.entries(jobFields).map(([key, schema]) => [key, schema.optional()])
)).superRefine((job, context) => {
  if (job.salaryMin != null && job.salaryMax != null && job.salaryMin > job.salaryMax) {
    context.addIssue({ code: "custom", path: ["salaryMax"], message: "Maximum salary must be greater than or equal to minimum salary" });
  }
});

module.exports = { jobSchema, updateJobSchema };
