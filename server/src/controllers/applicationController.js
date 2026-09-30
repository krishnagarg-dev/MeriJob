
const Application = require("../models/Application");

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const {
      jobId,
      job,
      companyRef,
      jobTitle,
      companyName,
      location,
      redirectUrl,
      resume,
      coverLetter,
    } = req.body;

    if (!jobId || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: "Job ID and job title are required",
      });
    }

    const application = await Application.create({
      user: req.user.userId,
      job: job || null,
      companyRef: companyRef || null,
      jobId,
      jobTitle,
      companyName: companyName || "",
      location: location || "",
      redirectUrl: redirectUrl || "",
      resume: resume || "",
      coverLetter: coverLetter || "",
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply for job error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    if (error.name === "CastError" || error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};

// Get applications of the logged-in user
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.userId,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .populate("companyRef")
      .sort({ createdAt: -1 });

    const formattedApplications = applications.map((application) => {
      const item = application.toObject();

      return {
        ...item,
        companyName:
          item.companyName ||
          item.companyRef?.name ||
          item.job?.company?.name ||
          "",
        location: item.location || item.job?.location || "",
        jobTitle: item.jobTitle || item.job?.title || "",
      };
    });

    return res.status(200).json({
      success: true,
      count: formattedApplications.length,
      applications: formattedApplications,
    });
  } catch (error) {
    console.error("Fetch applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "applied",
      "shortlisted",
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
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Update application status error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  updateApplicationStatus,
};