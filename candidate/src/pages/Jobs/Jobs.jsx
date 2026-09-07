import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import JobCard from "../../components/JobCard/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    salary: 0,
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (filters.jobTitle.trim()) {
          params.append("what", filters.jobTitle.trim());
        }

        if (filters.location.trim()) {
          params.append("where", filters.location.trim());
        }

        if (filters.jobType) {
          params.append("contract", filters.jobType);
        }

        if (filters.salary > 0) {
          params.append("salary_min", filters.salary);
        }

        params.append("page", page);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jobs?${params.toString()}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch jobs"
          );
        }

        const formattedJobs = data.jobs.map((job) => ({
          id: job.id,
          title: job.title,

          company:
            job.company?.display_name ||
            "Company not available",

          location:
            job.location?.display_name ||
            "Location not available",

          type: job.contract_time
            ? job.contract_time.replace("_", " ")
            : "Full Time",

          salary:
            job.salary_min && job.salary_max
              ? `â‚¹${Math.round(
                job.salary_min / 100000
              )}L - â‚¹${Math.round(
                job.salary_max / 100000
              )}L`
              : "Salary not disclosed",

          redirect_url: job.redirect_url,

          description: job.description,

          category: job.category,
        }));

        setJobs(formattedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);

        setError(
          "Unable to load jobs. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters, page]);

  return (
    <>
      <Navbar />

      {/* PAGE HEADER */}
      <section className="bg-black px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">
          Jobs
        </h1>

        <p className="mt-3 text-sm text-gray-400">
          Find the perfect opportunity for your career
        </p>
      </section>

      {/* JOBS CONTENT */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col gap-8 lg:flex-row">

            {/* SIDEBAR */}
            <Sidebar
              onApplyFilters={(newFilters) => {
                setFilters(newFilters);
                setPage(1);
              }}
            />

            {/* JOB LIST */}
            <div className="flex-1">

              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {jobs.length}
                  </span>{" "}
                  jobs
                </p>

                <select className="rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-500 outline-none">
                  <option>Sort by latest</option>
                  <option>Sort by salary</option>
                  <option>Sort by relevance</option>
                </select>
              </div>

              {/* LOADING */}
              {loading && (
                <div className="py-20 text-center text-gray-500">
                  Loading jobs...
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="py-20 text-center text-red-500">
                  {error}
                </div>
              )}

              {/* NO JOBS */}
              {!loading &&
                !error &&
                jobs.length === 0 && (
                  <div className="py-20 text-center text-gray-500">
                    No jobs found.
                  </div>
                )}

              {/* JOBS */}
              {!loading &&
                !error &&
                jobs.length > 0 && (
                  <>
                    <div className="space-y-5">
                      {jobs.map((job) => (
                        <JobCard
                          key={job.id}
                          job={job}
                        />
                      ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="mt-10 flex items-center justify-center gap-2">

                      <button
                        disabled={page === 1}
                        onClick={() =>
                          setPage(page - 1)
                        }
                        className="rounded-md border border-gray-200 px-4 py-2 text-xs text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        â† Previous
                      </button>

                      <button className="flex h-8 w-8 items-center justify-center rounded-md bg-[#309689] text-xs text-white">
                        {page}
                      </button>

                      <button
                        onClick={() =>
                          setPage(page + 1)
                        }
                        className="rounded-md border border-gray-200 px-4 py-2 text-xs text-gray-600"
                      >
                        Next â†’
                      </button>

                    </div>
                  </>
                )}

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Jobs;



