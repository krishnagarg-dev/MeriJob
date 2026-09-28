
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import JobCard from "../../components/JobCard/JobCard";

function Jobs() {
  const location = useLocation();
  const initialSearch = location.state?.search || {};

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    jobTitle: initialSearch.keyword || "",
    location: initialSearch.location || "",
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

        const apiUrl = (
          import.meta.env.VITE_API_URL ||
          "https://merijob-backend.onrender.com"
        ).replace(/\/$/, "");

        const response = await fetch(
          `${apiUrl}/api/jobs?${params.toString()}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch jobs");
        }

        const formattedJobs = (Array.isArray(data.jobs) ? data.jobs : []).map(
          (job) => ({
            id: job.id,
            title: job.title,
            company:
              job.company?.display_name ||
              job.company ||
              "Company not available",
            location:
              job.location?.display_name ||
              job.location ||
              "Location not available",
            type: job.contract_time
              ? job.contract_time.replace("_", " ")
              : "Full Time",
            salary:
              job.salary_min && job.salary_max
                ? `₹${Math.round(job.salary_min / 100000)}L - ₹${Math.round(
                    job.salary_max / 100000
                  )}L`
                : "Salary not disclosed",
            redirect_url: job.redirect_url,
            description: job.description,
            category: job.category,
          })
        );

        setJobs(formattedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setError("Unable to load jobs. Please try again.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters, page]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f7faf9]">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="relative overflow-hidden bg-[#071b19] px-6 py-16 text-center text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(48,150,137,0.22),_transparent_55%)]" />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex rounded-full border border-[#309689]/30 bg-[#309689]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#65c8ba]">
            EXPLORE CAREER OPPORTUNITIES
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Find Your Next <span className="text-[#55b9aa]">Opportunity</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-300 md:text-base">
            Explore opportunities, discover companies, and take the next step
            in your career with MeriJob.
          </p>
        </div>
      </section>

      {/* JOBS CONTENT */}
      <section className="px-5 py-10 md:px-6 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#309689]">
                Your next step starts here
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
                Explore Jobs
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Browse available roles and find a match for your skills.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-500">Jobs on this page</p>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {loading ? "—" : jobs.length}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-7 lg:flex-row lg:items-start">
            {/* SIDEBAR */}
            <div className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72">
              <Sidebar onApplyFilters={handleApplyFilters} />
            </div>

            {/* JOB LIST */}
            <div className="min-w-0 flex-1">
              <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {loading
                      ? "Finding opportunities..."
                      : `Showing ${jobs.length} jobs`}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {filters.jobTitle || filters.location
                      ? "Based on your selected filters"
                      : "Explore the latest available opportunities"}
                  </p>
                </div>

                <select
                  aria-label="Sort jobs"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-600 outline-none transition focus:border-[#309689] focus:ring-2 focus:ring-[#309689]/10"
                  defaultValue="latest"
                >
                  <option value="latest">Sort by latest</option>
                  <option value="salary">Sort by salary</option>
                  <option value="relevance">Sort by relevance</option>
                </select>
              </div>

              {/* LOADING */}
              {loading && (
                <div className="rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-sm">
                  <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-[#309689]" />
                  <p className="mt-4 text-sm font-medium text-gray-700">
                    Loading jobs...
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Finding opportunities for you
                  </p>
                </div>
              )}

              {/* ERROR */}
              {!loading && error && (
                <div className="rounded-2xl border border-red-100 bg-white px-6 py-16 text-center shadow-sm">
                  <div className="text-3xl">⚠️</div>
                  <h3 className="mt-4 font-semibold text-gray-900">
                    Unable to load jobs
                  </h3>
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                  <button
                    type="button"
                    onClick={() => setPage((current) => current)}
                    className="mt-5 rounded-lg bg-[#309689] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#267d73]"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* NO JOBS */}
              {!loading && !error && jobs.length === 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white px-6 py-20 text-center shadow-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ebf5f4] text-3xl">
                    🔎
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    No jobs found
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    Try changing your search terms or clearing some filters to
                    discover more opportunities.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyFilters({
                        jobTitle: "",
                        location: "",
                        jobType: "",
                        salary: 0,
                      })
                    }
                    className="mt-6 rounded-lg bg-[#309689] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#267d73]"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* JOBS */}
              {!loading && !error && jobs.length > 0 && (
                <>
                  <div className="space-y-5">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>

                  {/* PAGINATION */}
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      disabled={page === 1 || loading}
                      onClick={() => setPage((current) => current - 1)}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-600 transition hover:border-[#309689] hover:text-[#309689] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Previous
                    </button>

                    <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#309689] px-3 text-sm font-semibold text-white">
                      {page}
                    </span>

                    <button
                      type="button"
                      onClick={() => setPage((current) => current + 1)}
                      disabled={loading}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-600 transition hover:border-[#309689] hover:text-[#309689] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next →
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Jobs;