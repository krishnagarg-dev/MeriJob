const { z } = require("zod");

const applicationSchema = z.object({
  jobId: z.string().trim().min(1, "Job ID is required").max(200),
  jobTitle: z.string().trim().min(1, "Job title is required").max(200),
  company: z.string().trim().max(200).optional().default(""),
  location: z.string().trim().max(200).optional().default(""),
  redirectUrl: z
    .string()
    .trim()
    .max(2048)
    .optional()
    .default("")
    .refine(
      (value) => !value || /^https?:\/\//i.test(value),
      "Redirect URL must use http or https"
    ),
});

const applicationStatusSchema = z.object({
  status: z.enum(["applied", "shortlisted", "interview", "rejected", "selected"]),
});

module.exports = { applicationSchema, applicationStatusSchema };