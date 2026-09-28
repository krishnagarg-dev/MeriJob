
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function EmployerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const [c, j, a] = await Promise.all([
          api("/api/company"),
          api("/api/employer/jobs"),
          api("/api/employer/applications"),
        ]);

        if (!active) return;

        setCompany(c.company || null);
        setJobs(j.jobs || []);
        setApplications(a.applications || []);
      } catch (e) {
        if (e.message.toLowerCase().includes("authentication")) {
          navigate("/login", { replace: true });
          return;
        }

        if (active) {
          setError(e.message || "Unable to load dashboard");
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [navigate]);

  const published = jobs.filter((j) => j.status === "published").length;
  const pending = jobs.filter((j) => j.status === "pending").length;

  return (
    <main className="min-h-screen bg-[#f5f8f7]">
      <Navbar />

      {/* Welcome Header */}
      <section className="relative overflow-hidden bg-[#102c29] px-6 py-12 text-white sm:py-16">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#309689]/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#309689]/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-[#b9e8dc]">
              <span className="h-2 w-2 rounded-full bg-[#4dd4b5]" />
              Employer Workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, {user?.name || "Employer"}!
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
              Manage your company, track job postings, and connect with
              candidates who can help your team grow.
            </p>
          </div>

          <Link
            to="/employer/jobs/new"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#309689] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#3aa99b] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#75d6c5] focus:ring-offset-2 focus:ring-offset-[#102c29]"
          >
            <span className="text-lg leading-none">+</span>
            Post a New Job
          </Link>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-7xl">
          {error && (
            <div
              role="alert"
              className="mb-6 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <span className="text-lg">!</span>
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#d8eee9] border-t-[#309689]" />
              <p className="text-sm font-medium text-gray-500">
                Loading your dashboard...
              </p>
            </div>
          ) : (
            <>
              {/* Overview */}
              <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#309689]">
                    Overview
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Hiring at a glance
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    A quick overview of your hiring activity.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Stat
                  title="Total Jobs"
                  value={jobs.length}
                  icon="▤"
                  description="All your job postings"
                  accent="teal"
                />
                <Stat
                  title="Published Jobs"
                  value={published}
                  icon="✓"
                  description="Currently published"
                  accent="green"
                />
                <Stat
                  title="Applications"
                  value={applications.length}
                  icon="♙"
                  description="Candidates who applied"
                  accent="blue"
                />
                <Stat
                  title="Pending Jobs"
                  value={pending}
                  icon="◷"
                  description="Awaiting approval"
                  accent="amber"
                />
              </div>

              {/* Main Content */}
              <div className="mt-10 grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_350px]">
                {/* Job Listings */}
                <section className="min-w-0">
                  <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Your Job Posts
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Only jobs posted by your company are shown here.
                      </p>
                    </div>

                    <Link
                      to="/employer/jobs"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#309689] transition-colors hover:text-[#267c72]"
                    >
                      View all jobs
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {jobs.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf5f2] text-3xl text-[#309689]">
                        +
                      </div>
                      <h3 className="mt-5 text-base font-bold text-gray-900">
                        No jobs posted yet
                      </h3>
                      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                        Create your first job posting to start connecting
                        with potential candidates.
                      </p>
                      <Link
                        to="/employer/jobs/new"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#309689] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#267c72]"
                      >
                        Create your first job
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {jobs.slice(0, 5).map((j) => (
                        <article
                          key={j._id}
                          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#309689]/25 hover:shadow-lg sm:p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eaf5f2] text-xl font-bold text-[#309689] transition-colors group-hover:bg-[#309689] group-hover:text-white">
                              {j.title?.charAt(0)?.toUpperCase() || "J"}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                <div className="min-w-0">
                                  <h3 className="line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-[#267c72] sm:text-base">
                                    {j.title}
                                  </h3>

                                  <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                                    <span>{j.location || "India"}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="capitalize">
                                      {j.workMode || "onsite"}
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    <span className="capitalize">
                                      {j.employmentType || "full-time"}
                                    </span>
                                  </p>
                                </div>

                                <span
                                  className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize ${
                                    j.status === "published"
                                      ? "bg-emerald-50 text-emerald-700"
                                      : j.status === "pending"
                                        ? "bg-amber-50 text-amber-700"
                                        : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      j.status === "published"
                                        ? "bg-emerald-500"
                                        : j.status === "pending"
                                          ? "bg-amber-500"
                                          : "bg-gray-400"
                                    }`}
                                  />
                                  {j.status || "Unknown"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </section>

                {/* Sidebar */}
                <aside className="space-y-5">
                  {/* Company Profile */}
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="h-2 bg-gradient-to-r from-[#309689] to-[#79c9b8]" />

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-base font-bold text-gray-900">
                          Company Profile
                        </h2>
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf5f2] text-lg text-[#309689]">
                          ▣
                        </span>
                      </div>

                      {company ? (
                        <>
                          <div className="mt-5 flex items-center gap-3">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#eaf5f2] to-[#d5eee8] text-xl font-bold text-[#309689]">
                              {company.name?.charAt(0)?.toUpperCase() || "C"}
                            </div>
                            <div className="min-w-0">
                              <h3 className="truncate font-bold text-gray-900">
                                {company.name}
                              </h3>
                              <p className="mt-1 truncate text-xs text-gray-500">
                                {company.industry || "Industry not specified"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                            <div className="flex items-start gap-3 text-sm text-gray-600">
                              <span className="text-[#309689]" aria-hidden="true">
                                ⌖
                              </span>
                              <span>
                                {company.location || "Location not specified"}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs text-gray-500">
                                Profile status
                              </span>
                              <span className="rounded-full bg-[#eaf5f2] px-3 py-1 text-xs font-semibold capitalize text-[#267c72]">
                                {company.status || "Not specified"}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="mt-4 text-sm leading-6 text-gray-500">
                          Company profile not found.
                        </p>
                      )}

                      <Link
                        to="/setup"
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-[#309689] hover:bg-[#f4fbf9] hover:text-[#267c72]"
                      >
                        Update Company Profile
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Hiring Activity */}
                  <div className="relative overflow-hidden rounded-2xl bg-[#eaf5f2] p-6">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#309689]/10" />
                    <div className="relative">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#267c72]">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80">
                          ♙
                        </span>
                        Hiring Activity
                      </div>

                      <p className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900">
                        {applications.length}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Total candidate applications
                      </p>

                      <Link
                        to="/employer/applications"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-[#267c72] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      >
                        Review Applications
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Stat({ title, value, icon, description, accent }) {
  const accentStyles = {
    teal: {
      icon: "bg-[#eaf5f2] text-[#309689]",
      dot: "bg-[#309689]",
    },
    green: {
      icon: "bg-emerald-50 text-emerald-600",
      dot: "bg-emerald-500",
    },
    blue: {
      icon: "bg-blue-50 text-blue-600",
      dot: "bg-blue-500",
    },
    amber: {
      icon: "bg-amber-50 text-amber-600",
      dot: "bg-amber-500",
    },
  };

  const style = accentStyles[accent] || accentStyles.teal;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110 ${style.icon}`}
        >
          {icon}
        </span>
      </div>

      <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900">
        {value}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
        <p className="text-xs font-medium text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default EmployerDashboard;