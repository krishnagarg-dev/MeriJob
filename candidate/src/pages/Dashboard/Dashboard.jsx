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

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      const storedUser = JSON.parse(localStorage.getItem("user") || "null");

      if (!token || storedUser?.role !== "seeker") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("rememberMe");
        navigate("/login", { replace: true });
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [applicationsResponse, savedJobsResponse] =
          await Promise.all([
            fetch(
              `${(import.meta.env.VITE_API_URL || "https://merijob-backend.onrender.com").replace(/\/$/, "")}/api/applications`,
              { headers }
            ),
            fetch(
              `${(import.meta.env.VITE_API_URL || "https://merijob-backend.onrender.com").replace(/\/$/, "")}/api/saved-jobs`,
              { headers }
            ),
          ]);

        const applicationsData =
          await applicationsResponse.json();

        const savedJobsData =
          await savedJobsResponse.json();

        if (
          !applicationsResponse.ok ||
          !applicationsData.success
        ) {
          throw new Error(
            applicationsData.message ||
              "Failed to fetch applications"
          );
        }

        if (
          !savedJobsResponse.ok ||
          !savedJobsData.success
        ) {
          throw new Error(
            savedJobsData.message ||
              "Failed to fetch saved jobs"
          );
        }

        setApplications(
          applicationsData.applications || []
        );

        setSavedJobs(
          savedJobsData.savedJobs || []
        );
      } catch (error) {
        console.error(
          "Dashboard data error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  /* STATS */

  const totalApplications = applications.length;

  const applicationsSent = applications.filter(
    (application) =>
      application.status === "applied"
  ).length;

  const interviews = applications.filter(
    (application) =>
      application.status === "interview"
  ).length;

  const offers = applications.filter(
    (application) =>
      application.status === "offer"
  ).length;

  /* RECENT APPLICATIONS */

  const recentApplications =
    [...applications]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 4);

  /* THIS MONTH */

  const currentDate = new Date();

  const applicationsThisMonth =
    applications.filter((application) => {
      const date = new Date(
        application.createdAt
      );

      return (
        date.getMonth() ===
          currentDate.getMonth() &&
        date.getFullYear() ===
          currentDate.getFullYear()
      );
    }).length;

  return (
    <main className="bg-[#f8faf9]">
      <Navbar />

      {/* HEADER */}
      <section className="bg-black px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">
            Welcome back!
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Your Dashboard
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          {/* LOADING */}
          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading dashboard...
            </div>
          ) : (
            <>
              {/* STATS */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <StatCard
                  title="Total Applications"
                  value={totalApplications}
                  label={`+${applicationsThisMonth} this month`}
                />

                <StatCard
                  title="Applications Sent"
                  value={applicationsSent}
                  label="Active applications"
                />

                <StatCard
                  title="Interviews"
                  value={interviews}
                  label="Interview applications"
                />

                <StatCard
                  title="Offers"
                  value={offers}
                  label="Offers received"
                />

              </div>

              {/* MAIN GRID */}
              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">

                {/* APPLICATIONS */}
                <div>

                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Recent Applications
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">
                        Track your latest job applications.
                      </p>
                    </div>

                    <Link
                      to="/applications"
                      className="text-xs font-medium text-[#309689]"
                    >
                      View All →
                    </Link>
                  </div>

                  <div className="space-y-4">

                    {recentApplications.length === 0 ? (
                      <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
                        <p className="text-sm text-gray-500">
                          No applications yet.
                        </p>

                        <Link
                          to="/jobs"
                          className="mt-4 inline-block rounded-md bg-[#309689] px-5 py-2.5 text-xs font-medium text-white"
                        >
                          Find Jobs
                        </Link>
                      </div>
                    ) : (
                      recentApplications.map(
                        (application) => (
                          <ApplicationCard
                            key={application._id}
                            title={
                              application.jobTitle
                            }
                            company={
                              application.company
                            }
                            date={new Date(
                              application.createdAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                            status={
                              application.status
                            }
                          />
                        )
                      )
                    )}

                  </div>

                </div>

                {/* QUICK ACTIONS */}
                <aside>

                  <div className="rounded-lg border border-gray-200 bg-white p-6">

                    <h2 className="text-base font-bold text-gray-900">
                      Quick Actions
                    </h2>

                    <div className="mt-5 space-y-3">

                      <Link
                        to="/jobs"
                        className="block w-full rounded-md bg-[#309689] px-4 py-3 text-center text-xs font-medium text-white"
                      >
                        Find New Jobs
                      </Link>

                      <Link
                        to="/saved-jobs"
                        className="block w-full rounded-md border border-gray-200 px-4 py-3 text-center text-xs font-medium text-gray-700"
                      >
                        View Saved Jobs ({savedJobs.length})
                      </Link>

                      <Link
                        to="/applications"
                        className="block w-full rounded-md border border-gray-200 px-4 py-3 text-center text-xs font-medium text-gray-700"
                      >
                        View Applications
                      </Link>

                    </div>

                  </div>

                  {/* TIP */}
                  <div className="mt-5 rounded-lg bg-[#ebf5f4] p-6">

                    <p className="text-xs font-medium text-[#309689]">
                      Career Tip
                    </p>

                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      Keep your resume updated
                    </p>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      An updated resume can help you
                      stand out to recruiters and
                      increase your chances of getting
                      interviews.
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



