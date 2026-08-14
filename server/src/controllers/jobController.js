const getJobs = async (req, res) => {
  try {
    const {
      what = "software developer",
      where = "india",
      contract = "",
      salary_min = "",
    } = req.query;

    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1`;

    const params = new URLSearchParams({
      app_id: process.env.ADZUNA_APP_ID,
      app_key: process.env.ADZUNA_APP_KEY,
      what,
      where,
      results_per_page: "20",
    });

    if (contract) {
      params.append("contract", contract);
    }

    if (salary_min) {
      params.append("salary_min", salary_min);
    }

    const response = await fetch(`${url}?${params.toString()}`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Adzuna API error: ${response.status} ${errorText}`
      );
    }

    const data = await response.json();

    res.json({
      success: true,
      count: data.count,
      jobs: data.results,
    });
  } catch (error) {
    console.error("Adzuna error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};


const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const url = `https://api.adzuna.com/v1/api/jobs/in/details/${id}`;

    const params = new URLSearchParams({
      app_id: process.env.ADZUNA_APP_ID,
      app_key: process.env.ADZUNA_APP_KEY,
    });

    const response = await fetch(`${url}?${params.toString()}`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Adzuna API error: ${response.status} ${errorText}`
      );
    }

    const job = await response.json();

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(
      "Adzuna job details error:",
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
