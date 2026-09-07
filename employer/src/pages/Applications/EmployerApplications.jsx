import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../services/api";

function EmployerApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await api("/api/employer/applications");

        if (active) {
          setApplications(data.applications || []);
        }
      } catch (err) {
        console.error("Employer applications error:", err);

        if (err.status === 401 || err.status === 403) {
          navigate("/login", { replace: true });
          return;
        }

        if (active) {
          setError(err.message || "Unable to load applications");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadApplications();

    return () => {
      active = false;
    };
  }, [navigate]);

  const updateStatus = async (id, status) => {
    try {
      setError("");

      const data = await api(`/api/employer/applications/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setApplications((current) =>
        current.map((application) =>
          application._id === id
            ? {
                ...application,
                status: data.application?.status || status,
              }
            : application
        )
      );
    } catch (err) {
      console.error("Update application error:", err);

      if (err.status === 401 || err.status === 403) {
        navigate("/login", { replace: true });
        return;
      }

      setError(err.message || "Unable to update application");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-black px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">Employer Portal</p>
          <h1 className="mt-2 text-3xl font-bold">Applications</h1>
          <p className="mt-2 text-sm text-gray-400">
            Review candidates and manage their hiring status.
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

          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="rounded-lg border border-gray-200 p-12 text-center text-sm text-gray-500">
              No candidates have applied yet.
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="rounded-lg border border-gray-200 bg-white p-5"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {application.user?.name || "Candidate"}
                      </h2>
                      <p className="mt-1 text-xs text-gray-500">
                        {application.user?.email || "Email unavailable"} {" - "} Applied for {application.jobTitle || "Job"}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        {application.createdAt
                          ? new Date(application.createdAt).toLocaleDateString("en-IN")
                          : "Date unavailable"}
                      </p>
                    </div>

                    <select
                      value={application.status || "applied"}
                      onChange={(event) =>
                        updateStatus(application._id, event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-xs"
                    >
                      <option value="applied">Applied</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interview">Interview</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>
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

export default EmployerApplications;
