import { Link } from "react-router-dom";

function JobCard({ job }) {
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

        <button className="text-gray-400 transition hover:text-[#309689]">
          ♡
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
        </div>

        <Link
          to={`/job/${job.id}`}
          className="rounded-md bg-[#309689] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#267d73]"
        >
          Job Details
        </Link>
      </div>

    </div>
  );
}

export default JobCard;
