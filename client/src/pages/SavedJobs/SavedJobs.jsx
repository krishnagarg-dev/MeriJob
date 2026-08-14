import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function SavedJobs() {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://merijob-backend.onrender.com/api/saved-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch saved jobs"
          );
        }

        setSavedJobs(data.savedJobs);
      } catch (error) {
        console.error("Fetch saved jobs error:", error);

        setError("Unable to load saved jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [navigate]);

  const handleRemove = async (jobId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://merijob-backend.onrender.com/api/saved-jobs/${jobId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to remove saved job"
        );
      }

      setSavedJobs((currentJobs) =>
        currentJobs.filter((job) => job.jobId !== jobId)
      );
    } catch (error) {
      console.error("Remove saved job error:", error);

      alert("Unable to remove saved job.");
    }
  };

  return (
    <main className="bg-[#f8faf9]">
      <Navbar />

      {/* HEADER */}
      <section className="bg-black px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">
            Your favourite opportunities
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Saved Jobs
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Your Saved Jobs
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Jobs you've saved for later.
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="py-20 text-center text-gray-500">
              Loading saved jobs...
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
            savedJobs.length === 0 && (
              <div className="rounded-lg border border-gray-200 bg-white py-20 text-center">
                <p className="text-gray-500">
                  You haven't saved any jobs yet.
                </p>

                <Link
                  to="/jobs"
                  className="mt-5 inline-block rounded-md bg-[#309689] px-5 py-2.5 text-xs font-medium text-white"
                >
                  Browse Jobs
                </Link>
              </div>
            )}

          {/* SAVED JOBS */}
          {!loading &&
            !error &&
            savedJobs.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                {savedJobs.map((job) => (
                  <div
                    key={job._id}
                    className="rounded-lg border border-gray-200 bg-white p-6"
                  >

                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {job.jobTitle}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                          {job.company || "Company not available"}
                        </p>
                      </div>

                      <span className="text-xl text-[#309689]">
                        â™¥
                      </span>
                    </div>

                    {/* Details */}
                    <div className="mt-5 space-y-2 text-xs text-gray-500">
                      <p>
                        ðŸ“ {job.location || "Location not available"}
                      </p>

                      <p>
                        ðŸ’¼ Full Time
                      </p>

                      <p>
                        ðŸ’° Salary not disclosed
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">

                      <Link
                        to={`/job/${job.jobId}`}
                        state={{
                          job: {
                            id: job.jobId,
                            title: job.jobTitle,
                            company: {
                              display_name: job.company,
                            },
                            location: {
                              display_name: job.location,
                            },
                            redirect_url: job.redirectUrl,
                          },
                        }}
                        className="flex-1 rounded-md bg-[#309689] py-2.5 text-center text-xs font-medium text-white transition hover:bg-[#267d73]"
                      >
                        View Job
                      </Link>

                      <button
                        onClick={() =>
                          handleRemove(job.jobId)
                        }
                        className="rounded-md border border-gray-200 px-4 py-2.5 text-xs text-gray-500 transition hover:border-red-300 hover:text-red-500"
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            )}

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default SavedJobs;



