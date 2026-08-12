
const SavedJob = require("../models/SavedJob");

const saveJob = async (req, res) => {
  try {
    const {
      jobId,
      jobTitle,
      company,
      location,
      redirectUrl,
    } = req.body;

    if (!jobId || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: "Job ID and job title are required",
      });
    }

    const existingJob = await SavedJob.findOne({
      user: req.user.userId,
      jobId,
    });

    if (existingJob) {
      return res.status(409).json({
        success: false,
        message: "Job is already saved",
      });
    }

    const savedJob = await SavedJob.create({
      user: req.user.userId,
      jobId,
      jobTitle,
      company,
      location,
      redirectUrl,
    });

    res.status(201).json({
      success: true,
      message: "Job saved successfully",
      savedJob,
    });
  } catch (error) {
    console.error("Save job error:", error.message);

    res.status(500).json({
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

    res.json({
      success: true,
      count: savedJobs.length,
      savedJobs,
    });
  } catch (error) {
    console.error("Get saved jobs error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch saved jobs",
    });
  }
};

const removeSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const deletedJob = await SavedJob.findOneAndDelete({
      user: req.user.userId,
      jobId,
    });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found",
      });
    }

    res.json({
      success: true,
      message: "Job removed from saved jobs",
    });
  } catch (error) {
    console.error("Remove saved job error:", error.message);

    res.status(500).json({
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
