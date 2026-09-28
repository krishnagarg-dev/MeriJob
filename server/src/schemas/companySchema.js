const { z } = require("zod");

const text = (max = 500) => z.string().trim().max(max).optional();

const urlOrEmpty = z
  .string()
  .trim()
  .max(2048)
  .optional()
  .refine(
    (value) => !value || /^https?:\/\//i.test(value),
    "Website and logo must use an http or https URL"
  );

const companySchema = z.object({
  name: z.string().trim().min(1, "Company name is required").max(160),
  logo: urlOrEmpty,
  description: text(5000),
  website: urlOrEmpty,
  industry: text(120),
  location: text(200),
  companySize: text(80),
  foundedYear: z
    .union([
      z.number().int().min(1800).max(new Date().getFullYear()),
      z.null(),
    ])
    .optional(),
});

module.exports = { companySchema };