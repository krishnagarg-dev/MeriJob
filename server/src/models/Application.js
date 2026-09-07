const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default: null },
    companyRef: { type: mongoose.Schema.Types.ObjectId, ref: "Company", default: null },
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true, trim: true },
    companyName: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    redirectUrl: { type: String, default: "" },
    resume: { type: String, default: "" },
    coverLetter: { type: String, default: "" },
    employerNotes: { type: String, default: "" },
    status: { type: String, enum: ["applied", "shortlisted", "interview", "rejected", "selected"], default: "applied" },
  },
  { timestamps: true }
);

applicationSchema.index({ user: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
