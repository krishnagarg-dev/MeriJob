const Application = require("../models/Application");
const Job = require("../models/Job");

const applyForJob = async (req, res) => {
  try {
    const { jobId, jobTitle, company, location, redirectUrl } = req.body;
    if (!jobId || !jobTitle) return res.status(400).json({ success: false, message: "Job ID and job title are required" });

    const existingApplication = await Application.findOne({ user: req.user.userId, jobId });
    if (existingApplication) return res.status(409).json({ success: false, message: "You have already applied for this job" });

    const internalJob = /^[a-fA-F0-9]{24}$/.test(String(jobId)) ? await Job.findById(jobId).populate("company") : null;
    const application = await Application.create({
      user: req.user.userId,
      job: internalJob?._id || null,
      companyRef: internalJob?.company?._id || null,
      jobId: String(jobId),
      jobTitle,
      companyName: company || internalJob?.company?.name || "",
      location: location || internalJob?.location || "",
      redirectUrl: redirectUrl || "",
    });
    res.status(201).json({ success: true, message: "Job application saved successfully", application });
  } catch (error) {
    console.error("Apply job error:", error.message);
    res.status(500).json({ success: false, message: "Failed to apply for job" });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, count: applications.length, applications });
  } catch (error) { res.status(500).json({ success: false, message: "Failed to fetch applications" }); }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const allowed = ["applied", "shortlisted", "interview", "rejected", "selected"];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ success: false, message: "Invalid application status" });
    const application = await Application.findOneAndUpdate({ _id: req.params.id, user: req.user.userId }, { status: req.body.status }, { new: true, runValidators: true });
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });
    res.json({ success: true, message: "Application status updated", application });
  } catch (error) { res.status(500).json({ success: false, message: "Failed to update application" }); }
};

module.exports = { applyForJob, getMyApplications, updateApplicationStatus };
