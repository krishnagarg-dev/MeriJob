const Application = require("../models/Application");
const Company = require("../models/Company");

const getApplications = async (req, res) => {
  try {
    const company = await Company.findOne({ owner: req.user.userId });
    if (!company) return res.json({ success: true, applications: [] });
    const applications = await Application.find({ companyRef: company._id }).populate("user", "name email").populate("job", "title location workMode").sort({ createdAt: -1 });
    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch employer applications" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const company = await Company.findOne({ owner: req.user.userId });
    const allowed = ["applied", "shortlisted", "interview", "rejected", "selected"];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ success: false, message: "Invalid application status" });
    const application = await Application.findOneAndUpdate({ _id: req.params.id, companyRef: company?._id }, { status: req.body.status }, { new: true, runValidators: true }).populate("user", "name email");
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });
    res.json({ success: true, message: "Application status updated", application });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update application" });
  }
};

module.exports = { getApplications, updateStatus };
