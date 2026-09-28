const Job = require("../models/Job");
const Company = require("../models/Company");

const getCompanyForUser = (userId) => Company.findOne({ owner: userId });

const createJob = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);
    if (!company) {
      return res
        .status(400)
        .json({ success: false, message: "Create your company profile first" });
    }
    if (company.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Your company must be approved before posting jobs",
      });
    }

    const {
      title,
      description,
      skills,
      location,
      workMode,
      employmentType,
      experience,
      salaryMin,
      salaryMax,
      salaryPeriod,
      openings,
      deadline,
    } = req.body;

    const job = await Job.create({
      title,
      description,
      skills,
      location: location || company.location || "",
      workMode,
      employmentType,
      experience,
      salaryMin,
      salaryMax,
      salaryPeriod,
      openings,
      deadline,
      company: company._id,
      source: "merijob",
      status: "published",
    });

    return res
      .status(201)
      .json({ success: true, message: "Job published successfully", job });
  } catch (error) {
    console.error("Create job error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create job" });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);
    if (!company) return res.json({ success: true, count: 0, jobs: [] });

    const jobs = await Job.find({
      company: company._id,
      source: "merijob",
    }).sort({ createdAt: -1 });
    return res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    console.error("Get employer jobs error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch jobs" });
  }
};

const updateJob = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);
    if (!company)
      return res
        .status(400)
        .json({ success: false, message: "Company profile not found" });

    if (!/^[a-fA-F0-9]{24}$/.test(req.params.id)) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const job = await Job.findOne({
      _id: req.params.id,
      company: company._id,
      source: "merijob",
    });
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    const allowed = [
      "title",
      "description",
      "skills",
      "location",
      "workMode",
      "employmentType",
      "experience",
      "salaryMin",
      "salaryMax",
      "salaryPeriod",
      "openings",
      "deadline",
      "status",
    ];
    for (const key of allowed) {
      if (req.body[key] !== undefined) job[key] = req.body[key];
    }

    const finalSalaryMin = job.salaryMin;
    const finalSalaryMax = job.salaryMax;
    if (
      finalSalaryMin != null &&
      finalSalaryMax != null &&
      finalSalaryMin > finalSalaryMax
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Maximum salary must be greater than or equal to minimum salary",
      });
    }

    // Keep the existing workflow: employers can save drafts; other edits publish the job.
    job.company = company._id;
    job.source = "merijob";
    if (job.status !== "draft") job.status = "published";

    await job.save();
    return res.json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error("Update job error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update job" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);
    if (!company)
      return res
        .status(400)
        .json({ success: false, message: "Company profile not found" });

    if (!/^[a-fA-F0-9]{24}$/.test(req.params.id)) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      company: company._id,
      source: "merijob",
    });
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    return res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete job" });
  }
};

module.exports = { createJob, getMyJobs, updateJob, deleteJob };
