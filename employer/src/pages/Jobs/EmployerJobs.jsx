import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../services/api";

function EmployerJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-black px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">Employer Portal</p>
          <h1 className="mt-2 text-3xl font-bold">Manage Jobs</h1>
          <p className="mt-2 text-sm text-gray-400">
            Create, edit and manage your job postings.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {error && (
            <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Your Job Posts</h2>
              <p className="mt-1 text-sm text-gray-500">
                These are only jobs owned by your employer account.
              </p>
            </div>

            <Link
              to="/employer/jobs/new"
              className="rounded-md bg-[#309689] px-5 py-3 text-sm font-medium text-white"
            >
              + Post a Job
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading jobs...
            </div>
          ) : jobs.length === 0 ? (
            <div className="rounded-lg border border-gray-200 p-12 text-center text-sm text-gray-500">
              No jobs posted yet. Create your first hiring opportunity.
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {job.location || "India"} {" - "} {job.workMode || "On-site"} {" - "} {job.employmentType || "Full Time"}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#ebf5f4] px-3 py-1 text-xs font-medium capitalize text-[#267d73]">
                      {job.status || "published"}
                    </span>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Link
                      to={`/employer/jobs/${job._id}/edit`}
                      className="rounded-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteJob(job._id)}
                      className="rounded-md border border-red-200 px-4 py-2 text-xs font-medium text-red-600"
                    >
                      Delete
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

export default EmployerJobs;
