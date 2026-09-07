const Job = require("../models/Job");
const Company = require("../models/Company");

const getCompanyForUser = (userId) => Company.findOne({ owner: userId });

const createJob = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);
    if (!company) return res.status(400).json({ success: false, message: "Create your company profile first" });
    if (company.status !== "approved") return res.status(403).json({ success: false, message: "Your company must be approved before posting jobs" });

    const job = await Job.create({ ...req.body, company: company._id, source: "merijob", status: "pending" });
    res.status(201).json({ success: true, message: "Job submitted for approval", job });
  } catch (error) {
    console.error("Create job error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create job" });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);
    if (!company) return res.json({ success: true, jobs: [] });
    const jobs = await Job.find({ company: company._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

const updateJob = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);
    const job = await Job.findOne({ _id: req.params.id, company: company?._id });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    Object.assign(job, req.body);
    job.company = company._id;
    job.source = "merijob";
    job.status = req.body.status === "draft" ? "draft" : "pending";
    await job.save();
    res.json({ success: true, message: "Job updated and submitted for approval", job });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update job" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);
    const job = await Job.findOneAndDelete({ _id: req.params.id, company: company?._id });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete job" });
  }
};

module.exports = { createJob, getMyJobs, updateJob, deleteJob };
