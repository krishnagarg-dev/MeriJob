import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const routeLocation = useLocation();

  const [job, setJob] = useState(routeLocation.state?.job || null);
const [loading, setLoading] = useState(!routeLocation.state?.job);
  const [error, setError] = useState("");

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const [applying, setApplying] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");

  useEffect(() => {
  if (routeLocation.state?.job) {
    setJob(routeLocation.state.job);
    setLoading(false);
  }
}, [routeLocation.state]);

  const handleSaveJob = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setSaving(true);

      const location =
        job.location?.display_name ||
        "Location not available";

      const company =
        job.company?.display_name ||
        "Company not available";

      const response = await fetch(
        "http://localhost:5000/api/saved-jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: String(job.id),
            jobTitle: job.title,
            company,
            location,
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
    } finally {
      setSaving(false);
    }
  };

  const handleApply = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setApplying(true);
      setApplicationMessage("");

      const location =
        job.location?.display_name ||
        "Location not available";

      const company =
        job.company?.display_name ||
        "Company not available";

      const response = await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: String(job.id),
            jobTitle: job.title,
            company,
            location,
            redirectUrl: job.redirect_url,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 409) {
        setApplicationMessage("You have already applied for this job.");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save application"
        );
      }

      setApplicationMessage(
        "Application saved! Redirecting..."
      );

      setTimeout(() => {
        window.location.href = job.redirect_url;
      }, 800);
    } catch (error) {
      console.error("Apply job error:", error);

      setApplicationMessage(
        "Unable to save application. Please try again."
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[600px] items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading job details...
          </p>
        </div>

        <Footer />
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[600px] items-center justify-center">
          <p className="text-sm text-red-500">
            {error || "Job not found"}
          </p>
        </div>

        <Footer />
      </>
    );
  }

  const location =
    job.location?.display_name ||
    "Location not available";

  const company =
    job.company?.display_name ||
    "Company not available";

  const jobType = job.contract_time
    ? job.contract_time.replace("_", " ")
    : "Not specified";

  const salary =
    job.salary_min && job.salary_max
      ? `₹${Math.round(
        job.salary_min / 100000
      )}L - ₹${Math.round(
        job.salary_max / 100000
      )}L`
      : "Salary not disclosed";

  return (
    <main className="bg-white">
      <Navbar />

      {/* HEADER */}
      <section className="bg-black px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">
          Job Details
        </h1>

        <p className="mt-3 text-sm text-gray-400">
          Explore this opportunity and apply today
        </p>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

            {/* MAIN CONTENT */}
            <div>

              {/* JOB HEADER */}
              <div className="rounded-lg border border-gray-200 p-8">

                <div className="flex flex-col justify-between gap-5 md:flex-row">

                  <div>
                    <p className="text-sm text-[#309689]">
                      {job.category?.label ||
                        "Job Opportunity"}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                      {job.title}
                    </h2>

                    <p className="mt-2 text-base text-gray-500">
                      {company}
                    </p>
                  </div>

                  {/* SAVE */}
                  <button
                    onClick={handleSaveJob}
                    disabled={saving || saved}
                    className={`h-fit rounded-md border px-4 py-2 text-sm transition ${saved
                        ? "border-[#309689] text-[#309689]"
                        : "border-gray-200 text-gray-600 hover:border-[#309689] hover:text-[#309689]"
                      }`}
                  >
                    {saved ? "♥ Saved" : "♡ Save Job"}
                  </button>

                </div>

                {/* META */}
                <div className="mt-8 flex flex-wrap gap-6 border-t border-gray-100 pt-6 text-sm text-gray-500">

                  <span>
                    📍 {location}
                  </span>

                  <span>
                    💼 {jobType}
                  </span>

                  <span>
                    💰 {salary}
                  </span>

                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="mt-8">

                <h2 className="text-2xl font-bold text-gray-900">
                  Job Description
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-500">
                  {job.description ||
                    "No description available."}
                </p>

              </div>

              {/* JOB INFORMATION */}
              <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-900">
                  Job Information
                </h2>

                <div className="mt-5 space-y-3 text-sm text-gray-500">

                  <p>
                    <span className="font-medium text-gray-800">
                      Category:
                    </span>{" "}
                    {job.category?.label ||
                      "Not specified"}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Company:
                    </span>{" "}
                    {company}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Location:
                    </span>{" "}
                    {location}
                  </p>

                </div>

              </div>

            </div>

            {/* SIDEBAR */}
            <aside className="h-fit rounded-lg bg-[#ebf5f4] p-6">

              <h3 className="text-lg font-bold text-gray-900">
                Apply For This Job
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Take the next step in your career and
                apply for this opportunity.
              </p>

              {/* APPLY */}
              <button
                onClick={handleApply}
                disabled={applying}
                className="mt-6 block w-full rounded-md bg-[#309689] py-3 text-center text-sm font-medium text-white hover:bg-[#267d73] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {applying
                  ? "Applying..."
                  : "Apply Now"}
              </button>

              {/* APPLICATION MESSAGE */}
              {applicationMessage && (
                <p className="mt-3 text-center text-xs text-[#309689]">
                  {applicationMessage}
                </p>
              )}

              {/* JOB OVERVIEW */}
              <div className="mt-8 border-t border-gray-200 pt-6">

                <h4 className="text-sm font-semibold text-gray-900">
                  Job Overview
                </h4>

                <div className="mt-5 space-y-5 text-sm">

                  <div>
                    <p className="text-xs text-gray-400">
                      Job Type
                    </p>

                    <p className="mt-1 font-medium capitalize text-gray-800">
                      {jobType}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Location
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {location}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Salary
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {salary}
                    </p>
                  </div>

                </div>

              </div>

              {/* ADZUNA */}
              <p className="mt-8 border-t border-gray-200 pt-5 text-center text-[10px] text-gray-400">
                Job listing provided by Adzuna
              </p>

            </aside>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default JobDetails;