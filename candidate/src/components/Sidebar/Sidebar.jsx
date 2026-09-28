
import { useState } from "react";

function Sidebar({ onApplyFilters }) {
  const initialFilters = {
    jobTitle: "",
    location: "",
    jobType: "",
    salary: 0,
  };

  const [f, setF] = useState(initialFilters);

  const set = (key, value) => {
    setF((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleClear = () => {
    setF(initialFilters);
    onApplyFilters(initialFilters);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onApplyFilters(f);
  };

  return (
    <aside className="h-fit w-full shrink-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:w-64">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf5f2] text-lg text-[#309689]">
            <span aria-hidden="true">☷</span>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900">
              Filter Jobs
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Find your right match
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="text-xs font-semibold text-[#309689] transition hover:text-[#267c72] hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="my-5 border-t border-gray-100" />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Job Title */}
        <div>
          <label
            htmlFor="filter-job-title"
            className="mb-2 block text-xs font-semibold text-gray-700"
          >
            Job Title
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              ⌕
            </span>

            <input
              id="filter-job-title"
              type="text"
              value={f.jobTitle}
              onChange={(event) => set("jobTitle", event.target.value)}
              placeholder="e.g. React Developer"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#309689] focus:bg-white focus:ring-2 focus:ring-[#309689]/10"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="filter-location"
            className="mb-2 block text-xs font-semibold text-gray-700"
          >
            Location
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              📍
            </span>

            <input
              id="filter-location"
              type="text"
              value={f.location}
              onChange={(event) => set("location", event.target.value)}
              placeholder="City or remote"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#309689] focus:bg-white focus:ring-2 focus:ring-[#309689]/10"
            />
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label
            htmlFor="filter-job-type"
            className="mb-2 block text-xs font-semibold text-gray-700"
          >
            Job Type
          </label>

          <select
            id="filter-job-type"
            value={f.jobType}
            onChange={(event) => set("jobType", event.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-xs text-gray-700 outline-none transition focus:border-[#309689] focus:bg-white focus:ring-2 focus:ring-[#309689]/10"
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-1">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#309689] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#267c72] focus:outline-none focus:ring-2 focus:ring-[#309689] focus:ring-offset-2"
          >
            Apply Filters
            <span aria-hidden="true">→</span>
          </button>

          <p className="text-center text-[11px] leading-5 text-gray-400">
            Refine your search to explore relevant opportunities.
          </p>
        </div>
      </form>
    </aside>
  );
}

export default Sidebar;