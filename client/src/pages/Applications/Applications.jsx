import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All Status");

  const statusStyles = {
    applied: "bg-blue-50 text-blue-600",
    interview: "bg-yellow-50 text-yellow-600",
    offer: "bg-green-50 text-green-600",
    rejected: "bg-red-50 text-red-600",
  };

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://merijob-backend.onrender.com/api/applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch applications"
          );
        }

        setApplications(data.applications);
      } catch (error) {
        console.error(
          "Fetch applications error:",
          error
        );

        setError(
          "Unable to load applications. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  const filteredApplications =
    filter === "All Status"
      ? applications
      : applications.filter(
          (application) =>
            application.status ===
            filter.toLowerCase()
        );

  return (
    <main className="bg-[#f8faf9]">
      <Navbar />

      {/* HEADER */}
      <section className="bg-black px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">
            Track your progress
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            My Applications
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          {/* TOP */}
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                All Applications
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Keep track of every job you've applied for.
              </p>
            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="w-fit rounded-md border border-gray-200 bg-white px-4 py-2 text-xs text-gray-600 outline-none"
            >
              <option>All Status</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="py-20 text-center text-gray-500">
              Loading applications...
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="py-20 text-center text-red-500">
              {error}
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            filteredApplications.length === 0 && (
              <div className="rounded-lg border border-gray-200 bg-white py-20 text-center">
                <p className="text-sm text-gray-500">
                  {applications.length === 0
                    ? "You haven't applied for any jobs yet."
                    : "No applications found for this status."}
                </p>

                <Link
                  to="/jobs"
                  className="mt-5 inline-block rounded-md bg-[#309689] px-5 py-2.5 text-xs font-medium text-white"
                >
                  Find Jobs
                </Link>
              </div>
            )}

          {/* APPLICATIONS */}
          {!loading &&
            !error &&
            filteredApplications.length > 0 && (
              <div className="space-y-4">

                {filteredApplications.map(
                  (application) => (
                    <div
                      key={application._id}
                      className="rounded-lg border border-gray-200 bg-white p-5"
                    >
                      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        {/* Job */}
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            {application.jobTitle}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            {application.company ||
                              "Company not available"}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
                            <span>
                              ðŸ“{" "}
                              {application.location ||
                                "Location not available"}
                            </span>

                            <span>
                              Applied on{" "}
                              {new Date(
                                application.createdAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Status + Action */}
                        <div className="flex items-center gap-4">

                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-medium ${
                              statusStyles[
                                application.status
                              ] ||
                              "bg-gray-50 text-gray-600"
                            }`}
                          >
                            {application.status
                              .charAt(0)
                              .toUpperCase() +
                              application.status.slice(1)}
                          </span>

                          <a
                            href={
                              application.redirectUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md border border-gray-200 px-4 py-2 text-xs text-gray-600 transition hover:border-[#309689] hover:text-[#309689]"
                          >
                            View Details
                          </a>

                        </div>

                      </div>
                    </div>
                  )
                )}

              </div>
            )}

          {/* INFO */}
          <div className="mt-8 rounded-lg bg-[#ebf5f4] p-6 text-center">
            <p className="text-sm font-semibold text-gray-900">
              Looking for more opportunities?
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Explore new jobs and start building your career.
            </p>

            <Link
              to="/jobs"
              className="mt-4 inline-block rounded-md bg-[#309689] px-5 py-2.5 text-xs font-medium text-white"
            >
              Find Jobs
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Applications;



