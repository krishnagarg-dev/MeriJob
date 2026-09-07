import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSaveJob = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `${(import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "")}/api/saved-jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: String(job.id),
            jobTitle: job.title,
            company: job.company,
            location: job.location,
            redirectUrl: job.redirect_url,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 409) {
        setSaved(true);
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save job"
        );
      }

      setSaved(true);
    } catch (error) {
      console.error("Save job error:", error);
      setError("Unable to save job");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">

      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {job.title}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {job.company}
          </p>
        </div>

        <button
          onClick={handleSaveJob}
          disabled={saving || saved}
          title={saved ? "Job saved" : "Save job"}
          className={`text-xl transition ${saved
              ? "text-[#309689]"
              : "text-gray-400 hover:text-[#309689]"
            }`}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      {/* Details */}
      <div className="mt-5 flex flex-wrap gap-3 text-xs text-gray-500">
        <span>📍 {job.location}</span>
        <span>💼 {job.type}</span>
      </div>


      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {job.salary}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Salary
          </p>

          {error && (
            <p className="mt-1 text-xs text-red-500">
              {error}
            </p>
          )}
        </div>

        <Link
          to={`/job/${job.id}`}
          state={{ job }}
          className="rounded-md bg-[#309689] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#267d73]"
        >
          Job Details
        </Link>
      </div>

    </div>
  );
}

export default JobCard;



