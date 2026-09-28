const SavedJob = require("../models/SavedJob");

const saveJob = async (req, res) => {
  try {
    const { jobId, jobTitle, company, location, redirectUrl } = req.body;

    if (!jobId || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: "Job ID and job title are required",
      });
    }

    const existingSavedJob = await SavedJob.findOne({
      user: req.user.userId,
      jobId,
    });

    if (existingSavedJob) {
      return res.status(409).json({
        success: false,
        message: "You have already saved this job",
      });
    }

    const savedJob = await SavedJob.create({
      user: req.user.userId,
      jobId: String(jobId),
      jobTitle: jobTitle.trim(),
      company: company || "",
      location: location || "",
      redirectUrl: redirectUrl || "",
    });

    return res.status(201).json({
      success: true,
      message: "Job saved successfully",
      savedJob,
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already saved this job",
      });
    }

    console.error("Save job error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to save job",
    });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: savedJobs.length,
      savedJobs,
    });
  } catch (error) {
    console.error("Get saved jobs error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch saved jobs",
    });
  }
};

const removeSavedJob = async (req, res) => {
  try {
    const savedJob = await SavedJob.findOneAndDelete({
      user: req.user.userId,
      jobId: req.params.jobId,
    });

    if (!savedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found",
      });
    }

    return res.json({
      success: true,
      message: "Saved job removed successfully",
    });
  } catch (error) {
    console.error("Remove saved job error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to remove saved job",
    });
  }
};

module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};
