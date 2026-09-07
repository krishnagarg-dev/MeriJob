const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    skills: [{ type: String, trim: true }],
    location: { type: String, default: "" },
    workMode: { type: String, enum: ["remote", "hybrid", "onsite"], default: "onsite" },
    employmentType: { type: String, enum: ["full-time", "part-time", "contract", "internship", "freelance"], default: "full-time" },
    experience: { type: String, default: "" },
    salaryMin: { type: Number, default: null },
    salaryMax: { type: Number, default: null },
    salaryPeriod: { type: String, enum: ["year", "month", "hour"], default: "year" },
    openings: { type: Number, default: 1, min: 1 },
    deadline: { type: Date, default: null },
    status: { type: String, enum: ["draft", "pending", "published", "closed", "rejected"], default: "pending" },
    source: { type: String, enum: ["merijob", "external"], default: "merijob" },
    externalId: { type: String, default: "" },
  },
  { timestamps: true }
);

jobSchema.index({ status: 1, createdAt: -1 });
jobSchema.index({ company: 1, status: 1 });

module.exports = mongoose.model("Job", jobSchema);
