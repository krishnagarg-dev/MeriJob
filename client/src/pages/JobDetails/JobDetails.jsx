import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/jobs/${id}`
        );

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch job");
        }

        setJob(data.job);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        setError("Unable to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

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
    job.location?.display_name || "Location not available";

  const company =
    job.company?.display_name || "Company not available";

  const jobType = job.contract_time
    ? job.contract_time.replace("_", " ")
    : "Not specified";

  const salary =
    job.salary_min && job.salary_max
      ? `₹${Math.round(job.salary_min / 100000)}L - ₹${Math.round(
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
                      {job.category?.label || "Job Opportunity"}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                      {job.title}
                    </h2>

                    <p className="mt-2 text-base text-gray-500">
                      {company}
                    </p>
                  </div>

                  <button className="h-fit rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:border-[#309689] hover:text-[#309689]">
                    ♡ Save Job
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
                  {job.description || "No description available."}
                </p>

              </div>

              {/* CATEGORY */}
              <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-900">
                  Job Information
                </h2>

                <div className="mt-5 space-y-3 text-sm text-gray-500">

                  <p>
                    <span className="font-medium text-gray-800">
                      Category:
                    </span>{" "}
                    {job.category?.label || "Not specified"}
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
                Take the next step in your career and apply for this
                opportunity.
              </p>

              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block w-full rounded-md bg-[#309689] py-3 text-center text-sm font-medium text-white hover:bg-[#267d73]"
              >
                Apply Now
              </a>

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
