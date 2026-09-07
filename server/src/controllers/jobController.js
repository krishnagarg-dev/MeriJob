const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {
    const {
      what = "",
      where = "",
      contract = "",
      salary_min = "",
      page = "1",
    } = req.query;

    const pageNumber = Math.max(Number(page) || 1, 1);
    const limit = 20;

    // Only show real MeriJob employer postings
    const search = {
      status: "published",
      source: "merijob",
    };

    // Search by title, description or skills
    if (what.trim()) {
      search.$or = [
        {
          title: {
            $regex: what.trim(),
            $options: "i",
          },
        },
        {
          description: {
            $regex: what.trim(),
            $options: "i",
          },
        },
        {
          skills: {
            $regex: what.trim(),
            $options: "i",
          },
        },
      ];
    }

    // Location filter
    // "India" means all Indian jobs, so don't filter by location.
    // For a specific city/location, filter normally.
    if (
      where.trim() &&
      where.trim().toLowerCase() !== "india"
    ) {
      search.location = {
        $regex: where.trim(),
        $options: "i",
      };
    }

    // Employment type filter
    if (contract) {
      search.employmentType =
        contract === "full_time"
          ? "full-time"
          : contract;
    }

    // Minimum salary filter
    if (salary_min) {
      const minimumSalary = Number(salary_min);

      if (!Number.isNaN(minimumSalary)) {
        search.salaryMin = {
          $gte: minimumSalary,
        };
      }
    }

    const jobs = await Job.find(search)
      .populate(
        "company",
        "name logo location verified industry description website"
      )
      .sort({
        createdAt: -1,
      })
      .skip((pageNumber - 1) * limit)
      .limit(limit);

    const total = await Job.countDocuments(search);

    const formattedJobs = jobs.map((job) => ({
      id: job._id.toString(),

      title: job.title,

      company: {
        display_name:
          job.company?.name || "MeriJob Company",
      },

      location: {
        display_name:
          job.location ||
          job.company?.location ||
          "India",
      },

      contract_time: job.employmentType,

      redirect_url: "",

      description: job.description,

      category: {
        label:
          job.company?.industry || "Jobs",
      },

      source: "merijob",

      workMode: job.workMode,

      skills: job.skills,

      salary_min: job.salaryMin,

      salary_max: job.salaryMax,

      salaryPeriod: job.salaryPeriod,

      experience: job.experience,

      openings: job.openings,

      deadline: job.deadline,

      verified:
        job.company?.verified || false,

      companyDetails: job.company,
    }));

    res.json({
      success: true,
      count: formattedJobs.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limit),
      jobs: formattedJobs,
    });
  } catch (error) {
    console.error("Jobs error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    // Only MongoDB/MeriJob jobs are handled here
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const job = await Job.findOne({
      _id: id,
      status: "published",
      source: "merijob",
    }).populate(
      "company",
      "name logo description website industry location verified"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,

      job: {
        id: job._id.toString(),

        title: job.title,

        company: {
          display_name:
            job.company?.name || "MeriJob Company",
        },

        location: {
          display_name:
            job.location ||
            job.company?.location ||
            "India",
        },

        contract_time: job.employmentType,

        redirect_url: "",

        description: job.description,

        category: {
          label:
            job.company?.industry || "Jobs",
        },

        source: "merijob",

        workMode: job.workMode,

        skills: job.skills,

        salary_min: job.salaryMin,

        salary_max: job.salaryMax,

        salaryPeriod: job.salaryPeriod,

        experience: job.experience,

        openings: job.openings,

        deadline: job.deadline,

        verified:
          job.company?.verified || false,

        companyDetails: job.company,
      },
    });
  } catch (error) {
    console.error(
      "Job details error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch job details",
    });
  }
};

module.exports = {
  getJobs,
  getJobById,
};