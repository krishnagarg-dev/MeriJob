const Application = require("../models/Application");

const applyForJob = async (req, res) => {
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

    const existingApplication = await Application.findOne({
      user: req.user.userId,
      jobId,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      user: req.user.userId,
      jobId,
      jobTitle,
      company,
      location,
      redirectUrl,
    });

    res.status(201).json({
      success: true,
      message: "Job application saved successfully",
      application,
    });
  } catch (error) {
    console.error("Apply job error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to apply for job",
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get applications error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "applied",
      "interview",
      "rejected",
      "selected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findOneAndUpdate(
      {
        _id: id,
        user: req.user.userId,
      },
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.json({
      success: true,
      message: "Application status updated",
      application,
    });
  } catch (error) {
    console.error("Update application error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update application",
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  updateApplicationStatus,
};