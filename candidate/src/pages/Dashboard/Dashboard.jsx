
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StatCard from "../../components/StatCard/StatCard";
import ApplicationCard from "../../components/ApplicationCard/ApplicationCard";

function Dashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [applicationsResponse, savedJobsResponse] =
          await Promise.all([
            fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
              headers,
            }),
            fetch(`${import.meta.env.VITE_API_URL}/api/saved-jobs`, {
              headers,
            }),
          ]);

        const applicationsData = await applicationsResponse.json();
        const savedJobsData = await savedJobsResponse.json();

        if (!applicationsResponse.ok || !applicationsData.success) {
          throw new Error(
            applicationsData.message || "Failed to fetch applications"
          );
        }

        if (!savedJobsResponse.ok || !savedJobsData.success) {
          throw new Error(
            savedJobsData.message || "Failed to fetch saved jobs"
          );
        }

        setApplications(applicationsData.applications || []);
        setSavedJobs(savedJobsData.savedJobs || []);
      } catch (error) {
        console.error("Dashboard data error:", error);
        setError(error.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const totalApplications = applications.length;

  const applicationsSent = applications.filter(
    (application) => application.status === "applied"
  ).length;

  const interviews = applications.filter(
    (application) => application.status === "interview"
  ).length;

  const offers = applications.filter(
    (application) => application.status === "offer"
  ).length;

  const recentApplications = [...applications]
    .sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 4);

  const currentDate = new Date();

  const applicationsThisMonth = applications.filter((application) => {
    const date = new Date(application.createdAt);

    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  }).length;

  return (
    <main className="min-h-screen bg-[#f5f8f7] text-gray-900">
      <Navbar />

      {/* Welcome Header */}
      <section className="relative overflow-hidden bg-[#102b29] px-5 py-10 text-white sm:px-8 lg:py-14">
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#309689]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 right-1/3 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-teal-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Candidate Dashboard
            </div>

            <p className="text-sm text-teal-100/80">
              Welcome back!
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Your career, your journey.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300">
              Keep track of your applications, explore new opportunities,
              and take the next step in your career.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#309689] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-[#267c72] focus:outline-none focus:ring-2 focus:ring-teal-200 focus:ring-offset-2 focus:ring-offset-[#102b29]"
          >
            Explore Jobs
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-20 text-center shadow-sm">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#d9eeea] border-t-[#309689]" />
              <p className="mt-4 text-sm font-medium text-gray-700">
                Loading your dashboard...
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Just a moment while we fetch your latest activity.
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-100 bg-white px-6 py-12 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl text-red-500">
                !
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                Couldn't load your dashboard
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-[#309689] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#267c72]"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Section Heading */}
              <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#309689]">
                    Overview
                  </p>
                  <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                    Your activity at a glance
                  </h2>
                </div>
                <p className="text-xs text-gray-500">
                  Stay updated on your job search
                </p>
              </div>

              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-gray-100 bg-white p-1 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                  <StatCard
                    title="Total Applications"
                    value={totalApplications}
                    label={`+${applicationsThisMonth} this month`}
                  />
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-1 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                  <StatCard
                    title="Applications Sent"
                    value={applicationsSent}
                    label="Active applications"
                  />
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-1 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                  <StatCard
                    title="Interviews"
                    value={interviews}
                    label="Interview applications"
                  />
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-1 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                  <StatCard
                    title="Offers"
                    value={offers}
                    label="Offers received"
                  />
                </div>
              </div>

              {/* Main Grid */}
              <div className="mt-9 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
                {/* Recent Applications */}
                <section className="min-w-0">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Recent Applications
                      </h2>
                      <p className="mt-1 text-xs text-gray-500">
                        Follow the progress of your latest applications.
                      </p>
                    </div>

                    <Link
                      to="/applications"
                      className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-[#309689] transition hover:bg-[#e9f5f2]"
                    >
                      View All <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {recentApplications.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf5f2] text-2xl text-[#309689]">
                        <span aria-hidden="true">⌕</span>
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-gray-900">
                        No applications yet
                      </h3>
                      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
                        Your job application activity will appear here once
                        you apply for a role.
                      </p>
                      <Link
                        to="/jobs"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#309689] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#267c72]"
                      >
                        Find Jobs <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div
                          key={application._id}
                          className="rounded-2xl border border-gray-100 bg-white p-1 shadow-sm transition duration-200 hover:border-[#c9e5df] hover:shadow-md"
                        >
                          <ApplicationCard
                            title={application.jobTitle}
                            company={application.company}
                            date={new Date(
                              application.createdAt
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                            status={application.status}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* Sidebar */}
                <aside className="space-y-5">
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-bold text-gray-900">
                        Quick Actions
                      </h2>
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf5f2] text-lg text-[#309689]">
                        <span aria-hidden="true">↗</span>
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Pick up where you left off.
                    </p>

                    <div className="mt-5 space-y-3">
                      <Link
                        to="/jobs"
                        className="flex w-full items-center justify-between rounded-xl bg-[#309689] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#267c72]"
                      >
                        <span>Find New Jobs</span>
                        <span aria-hidden="true">→</span>
                      </Link>

                      <Link
                        to="/saved-jobs"
                        className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-gray-700 transition hover:border-[#309689] hover:bg-[#f4faf8] hover:text-[#267c72]"
                      >
                        <span>Saved Jobs</span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                          {savedJobs.length}
                        </span>
                      </Link>

                      <Link
                        to="/applications"
                        className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-gray-700 transition hover:border-[#309689] hover:bg-[#f4faf8] hover:text-[#267c72]"
                      >
                        <span>My Applications</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Career Tip */}
                  <div className="relative overflow-hidden rounded-2xl border border-[#d7ebe5] bg-[#eaf5f2] p-5 sm:p-6">
                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/50" />
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl text-[#309689] shadow-sm">
                        <span aria-hidden="true">✦</span>
                      </div>

                      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#238779]">
                        Career Tip
                      </p>
                      <h3 className="mt-2 text-base font-bold leading-6 text-gray-900">
                        Keep your resume updated
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        An updated resume helps recruiters understand your
                        latest skills, projects, and experience.
                      </p>
                    </div>
                  </div>

                  {/* Small Summary */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <p className="text-xs font-medium text-gray-500">
                      Your job search
                    </p>
                    <div className="mt-2 flex items-end justify-between gap-3">
                      <p className="text-2xl font-bold text-gray-900">
                        {totalApplications}
                      </p>
                      <p className="text-right text-xs text-gray-500">
                        Total applications
                      </p>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#309689] transition-all"
                        style={{
                          width: `${
                            totalApplications === 0
                              ? 0
                              : Math.min(
                                  (applicationsSent / totalApplications) *
                                    100,
                                  100
                                )
                          }%`,
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {applicationsSent} applications currently marked as
                      applied
                    </p>
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

export default Dashboard;