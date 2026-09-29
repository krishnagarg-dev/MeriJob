
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

function JobCard({ job }) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const company =
    job.company?.display_name ||
    job.company ||
    "Company not available";

  const location =
    job.location?.display_name ||
    job.location ||
    "Location not available";

  const jobType =
    job.contract_time?.replace("_", " ") ||
    job.type ||
    "Full Time";

  // Format salary values according to the salary period.
  const formatAmount = (amount) =>
    Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const formatSalary = () => {
    // Use a supplied salary string if available.
    if (typeof job.salary === "string" && job.salary.trim()) {
      return job.salary;
    }

    const min = job.salary_min ?? job.salaryMin;
    const max = job.salary_max ?? job.salaryMax;
    const period = job.salaryPeriod || "year";

    if (min == null && max == null) {
      return "Salary not disclosed";
    }

    const formatValue = (amount) => {
      const value = Number(amount);

      if (!Number.isFinite(value) || value < 0) {
        return null;
      }

      if (period === "year") {
        return `₹${Number((value / 100000).toFixed(2))} LPA`;
      }

      if (period === "month") {
        return `₹${formatAmount(value)} / month`;
      }

      if (period === "hour") {
        return `₹${formatAmount(value)} / hour`;
      }

      return `₹${formatAmount(value)}`;
    };

    const formattedMin = min != null ? formatValue(min) : null;
    const formattedMax = max != null ? formatValue(max) : null;

    if (min != null && !formattedMin) {
      return "Salary not disclosed";
    }

    if (max != null && !formattedMax) {
      return "Salary not disclosed";
    }

    if (formattedMin && formattedMax) {
      if (period === "year") {
        const minLpa = Number((Number(min) / 100000).toFixed(2));
        const maxLpa = Number((Number(max) / 100000).toFixed(2));
        return `₹${minLpa}–${maxLpa} LPA`;
      }

      return `${formattedMin} – ${formattedMax}`;
    }

    return formattedMin || formattedMax || "Salary not disclosed";
  };

  const salary = formatSalary();

  const save = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await api("/api/saved-jobs", {
        method: "POST",
        body: JSON.stringify({
          jobId: String(job.id),
          jobTitle: job.title,
          company,
          location,
          redirectUrl: job.redirect_url || "",
        }),
      });

      setSaved(true);
    } catch (e) {
      if (e.message?.toLowerCase().includes("already")) {
        setSaved(true);
      } else {
        setError(e.message || "Unable to save job");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#309689]/30 hover:shadow-xl sm:p-6">
      {/* Job Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#309689]/10 bg-gradient-to-br from-[#eaf5f2] to-[#d5eee8] text-lg font-bold text-[#309689] transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm">
            {company.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 pt-0.5">
            <h3 className="line-clamp-2 text-base font-bold leading-6 text-gray-900 transition-colors duration-200 group-hover:text-[#267c72]">
              {job.title}
            </h3>

            <p className="mt-1 truncate text-sm font-medium text-gray-500">
              {company}
            </p>
          </div>
        </div>

        {/* Save Job */}
        <button
          type="button"
          onClick={save}
          disabled={saving || saved}
          aria-label={saved ? "Job saved" : "Save this job"}
          title={
            saved
              ? "Job saved"
              : saving
                ? "Saving job..."
                : "Save job"
          }
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xl transition-all duration-200 ${
            saved
              ? "border-[#c9e5df] bg-[#eaf5f2] text-[#309689]"
              : "border-gray-100 bg-gray-50 text-gray-400 hover:border-[#c9e5df] hover:bg-[#eaf5f2] hover:text-[#309689]"
          } disabled:cursor-not-allowed`}
        >
          {saving ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : saved ? (
            "♥"
          ) : (
            "♡"
          )}
        </button>
      </div>

      {/* Job Information */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 transition-colors group-hover:bg-[#f7fbfa]">
          <span aria-hidden="true">📍</span>
          <span className="max-w-[180px] truncate">{location}</span>
        </span>

        <span className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium capitalize text-gray-600 transition-colors group-hover:bg-[#f7fbfa]">
          <span aria-hidden="true">💼</span>
          {jobType}
        </span>
      </div>

      {/* Keeps card footers aligned */}
      <div className="flex-1" />

      {/* Salary and Action */}
      <div className="mt-6 flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
            Salary
          </p>

          <p className="mt-1 break-words text-sm font-bold text-gray-900 sm:text-base">
            {salary}
          </p>
        </div>

        <Link
          to={`/job/${job.id}`}
          state={{ job }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#309689] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#267c72] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#309689] focus:ring-offset-2"
        >
          Job Details
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Save Error */}
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </article>
  );
}

export default JobCard;