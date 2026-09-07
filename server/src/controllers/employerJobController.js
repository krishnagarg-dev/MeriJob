const Job = require("../models/Job");
const Company = require("../models/Company");

const getCompanyForUser = (userId) => {
  return Company.findOne({ owner: userId });
};

// Create a new job
const createJob = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);

    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Create your company profile first",
      });
    }

    if (company.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Your company must be approved before posting jobs",
      });
    }

    const job = await Job.create({
      ...req.body,
      company: company._id,
      source: "merijob",
      status: "published",
    });

    res.status(201).json({
      success: true,
      message: "Job published successfully",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
};

// Get all jobs posted by the logged-in employer
const getMyJobs = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);

    if (!company) {
      return res.json({
        success: true,
        jobs: [],
      });
    }

    const jobs = await Job.find({
      company: company._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get employer jobs error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

// Update an existing job
const updateJob = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);

    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company profile not found",
      });
    }

    const job = await Job.findOne({
      _id: req.params.id,
      company: company._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    Object.assign(job, req.body);

    job.company = company._id;
    job.source = "merijob";

    // Draft stays draft, otherwise publish immediately
    job.status =
      req.body.status === "draft"
        ? "draft"
        : "published";

    await job.save();

    res.json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error("Update job error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update job",
    });
  }
};

// Delete an employer job
const deleteJob = async (req, res) => {
  try {
    const company = await getCompanyForUser(req.user.userId);

    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company profile not found",
      });
    }

    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      company: company._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete job error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete job",
    });
  }
};

module.exports = {
  createJob,
  getMyJobs,
  updateJob,
  deleteJob,
};