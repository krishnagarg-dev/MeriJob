const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {
    const { what = "software developer", where = "india", contract = "", salary_min = "", page = "1" } = req.query;
    const pageNumber = Math.max(Number(page) || 1, 1);
    const limit = 20;

    const search = {
      status: "published",
      $or: [
        { title: { $regex: what, $options: "i" } },
        { description: { $regex: what, $options: "i" } },
        { skills: { $regex: what, $options: "i" } },
      ],
    };
    if (where && where.toLowerCase() !== "india") search.location = { $regex: where, $options: "i" };
    if (contract) search.employmentType = contract === "full_time" ? "full-time" : contract;
    if (salary_min) search.salaryMin = { $gte: Number(salary_min) };

    const internalJobs = await Job.find(search).populate("company", "name logo location verified").sort({ createdAt: -1 }).skip((pageNumber - 1) * limit).limit(limit);

    let externalJobs = [];
    if (process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY) {
      try {
        const params = new URLSearchParams({ app_id: process.env.ADZUNA_APP_ID, app_key: process.env.ADZUNA_APP_KEY, what, where, results_per_page: "20" });
        if (contract) params.append("contract", contract);
        if (salary_min) params.append("salary_min", salary_min);
        const response = await fetch(`https://api.adzuna.com/v1/api/jobs/in/search/${pageNumber}?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          externalJobs = data.results || [];
        }
      } catch (error) {
        console.error("External jobs warning:", error.message);
      }
    }

    const jobs = [
      ...internalJobs.map((job) => ({
        id: job._id.toString(), title: job.title, company: { display_name: job.company?.name || "MeriJob Company" }, location: { display_name: job.location || job.company?.location || "India" }, contract_time: job.employmentType, redirect_url: "", description: job.description, category: { label: "MeriJob" }, source: "merijob", workMode: job.workMode, skills: job.skills, salary_min: job.salaryMin, salary_max: job.salaryMax, verified: job.company?.verified || false,
      })),
      ...externalJobs.map((job) => ({ ...job, source: "external" })),
    ];

    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    console.error("Jobs error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    if (/^[a-fA-F0-9]{24}$/.test(id)) {
      const job = await Job.findOne({ _id: id, status: "published" }).populate("company", "name logo description website industry location verified");
      if (job) {
        return res.json({ success: true, job: { id: job._id.toString(), title: job.title, company: { display_name: job.company?.name }, location: { display_name: job.location || job.company?.location }, contract_time: job.employmentType, redirect_url: "", description: job.description, source: "merijob", workMode: job.workMode, skills: job.skills, salary_min: job.salaryMin, salary_max: job.salaryMax, salaryPeriod: job.salaryPeriod, experience: job.experience, openings: job.openings, deadline: job.deadline, companyDetails: job.company } });
      }
    }

    const params = new URLSearchParams({ app_id: process.env.ADZUNA_APP_ID, app_key: process.env.ADZUNA_APP_KEY });
    const response = await fetch(`https://api.adzuna.com/v1/api/jobs/in/details/${id}?${params.toString()}`);
    if (!response.ok) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, job: { ...(await response.json()), source: "external" } });
  } catch (error) {
    console.error("Job details error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch job details" });
  }
};

module.exports = { getJobs, getJobById };
