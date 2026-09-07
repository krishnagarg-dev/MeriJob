const Company = require("../models/Company");

const getMyCompany = async (req, res) => {
  const company = await Company.findOne({ owner: req.user.userId });
  res.json({ success: true, company });
};

const createOrUpdateCompany = async (req, res) => {
  try {
    const { name, logo, description, website, industry, location, companySize, foundedYear } = req.body;
    if (!name?.trim()) return res.status(400).json({ success: false, message: "Company name is required" });

    let company = await Company.findOne({ owner: req.user.userId });
    const payload = { name: name.trim(), logo, description, website, industry, location, companySize, foundedYear };
    company = company ? await Company.findOneAndUpdate({ owner: req.user.userId }, payload, { new: true, runValidators: true }) : await Company.create({ owner: req.user.userId, ...payload });

    res.status(company ? 200 : 201).json({ success: true, message: "Company profile saved", company });
  } catch (error) {
    console.error("Company error:", error.message);
    res.status(500).json({ success: false, message: "Failed to save company profile" });
  }
};

module.exports = { getMyCompany, createOrUpdateCompany };
