
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  MapPin,
  Clock3,
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
  Search,
  Building2,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../services/api";

function EmployerJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api("/api/employer/jobs");
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Employer jobs error:", err);

      if (err.status === 401 || err.status === 403) {
        navigate("/login", { replace: true });
        return;
      }

      setJobs([]);
      setError(err.message || "Unable to load jobs");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job posting?")) return;

    try {
      setError("");
      await api(`/api/employer/jobs/${id}`, { method: "DELETE" });
      setJobs((current) => current.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Delete job error:", err);

      if (err.status === 401 || err.status === 403) {
        navigate("/login", { replace: true });
        return;
      }

      setError(err.message || "Unable to delete job");
    }
  };

  const filteredJobs = jobs.filter((job) =>
    [job.title, job.location, job.workMode, job.employmentType]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  const getStatusStyle = (status) => {
    const normalized = (status || "published").toLowerCase();

    if (normalized === "published" || normalized === "active") {
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";
    }

    if (normalized === "pending" || normalized === "draft") {
      return "bg-amber-50 text-amber-700 ring-amber-600/10";
    }

    if (normalized === "closed" || normalized === "rejected") {
      return "bg-slate-100 text-slate-600 ring-slate-500/10";
    }

    return "bg-teal-50 text-teal-700 ring-teal-600/10";
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Page header */}
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-teal-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 text-xs font-semibold text-teal-300">
              <BriefcaseBusiness size={14} />
              Employer Workspace
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Manage your <span className="text-teal-400">jobs</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Create opportunities, keep your job posts organized and manage
              your company's hiring activity.
            </p>
          </div>

          <Link
            to="/employer/jobs/new"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-950/30 transition hover:-translate-y-0.5 hover:bg-teal-400"
          >
            <Plus size={18} />
            Post a Job
          </Link>
        </div>
      </section>

      {/* Main content */}
      <section className="px-5 py-9 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <BriefcaseBusiness size={22} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total job posts
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                  {loading ? "—" : jobs.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <FileText size={22} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Published jobs
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                  {loading
                    ? "—"
                    : jobs.filter((job) =>
                        ["published", "active"].includes(
                          (job.status || "published").toLowerCase()
                        )
                      ).length}
                </p>
              </div>
            </div>
          </div>

          {/* Jobs panel */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-5 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Your Job Posts
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View and manage jobs created by your employer account.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search your jobs..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 sm:w-56"
                  />
                </div>
                <button
                  type="button"
                  onClick={loadJobs}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw
                    size={15}
                    className={loading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="mx-5 mt-5 flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 sm:mx-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>{error}</span>
                <button
                  type="button"
                  onClick={loadJobs}
                  className="shrink-0 font-semibold underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            )}

            {loading ? (
              <div className="space-y-4 p-5 sm:p-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-xl border border-slate-100 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-100" />
                      <div className="flex-1">
                        <div className="h-4 w-1/3 rounded bg-slate-100" />
                        <div className="mt-3 h-3 w-2/3 rounded bg-slate-100" />
                        <div className="mt-5 h-8 w-28 rounded-lg bg-slate-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="px-5 py-16 text-center sm:px-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  {search ? <Search size={27} /> : <BriefcaseBusiness size={27} />}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {search ? "No matching jobs found" : "No jobs posted yet"}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {search
                    ? "Try another search term to find a job in your listings."
                    : "Your job listings will appear here. Create your first opportunity to start organizing your hiring."}
                </p>
                {search ? (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-6 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Clear Search
                  </button>
                ) : (
                  <Link
                    to="/employer/jobs/new"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                  >
                    <Plus size={17} />
                    Create Your First Job
                  </Link>
                )}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredJobs.map((job) => (
                  <article
                    key={job._id}
                    className="p-5 transition hover:bg-slate-50/70 sm:p-6"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
                          <Building2 size={22} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="break-words text-base font-bold text-slate-900 sm:text-lg">
                              {job.title || "Untitled Job"}
                            </h3>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ring-inset ${getStatusStyle(job.status)}`}
                            >
                              {job.status || "published"}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 sm:text-sm">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin size={15} className="text-slate-400" />
                              {job.location || "India"}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <BriefcaseBusiness
                                size={15}
                                className="text-slate-400"
                              />
                              {job.employmentType || "Full Time"}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock3 size={15} className="text-slate-400" />
                              {job.workMode || "On-site"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                        <Link
                          to={`/employer/jobs/${job._id}/edit`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 sm:text-sm"
                        >
                          <Pencil size={15} />
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => deleteJob(job._id)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 sm:text-sm"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-xs text-slate-400">
                        Listed in your employer workspace
                      </span>
                      <Link
                        to={`/employer/jobs/${job._id}/edit`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 transition hover:text-teal-800"
                      >
                        View details
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!loading && filteredJobs.length > 0 && (
              <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3.5 sm:px-6">
                <p className="text-xs font-medium text-slate-500">
                  Showing{" "}
                  <span className="font-bold text-slate-700">
                    {filteredJobs.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-700">
                    {jobs.length}
                  </span>{" "}
                  job {jobs.length === 1 ? "post" : "posts"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EmployerJobs;