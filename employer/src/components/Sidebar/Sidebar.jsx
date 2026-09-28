
import { useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

function Sidebar({ onApplyFilters }) {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState(0);
  const [categories, setCategories] = useState([]);
  const [experience, setExperience] = useState([]);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const categoryOptions = [
    "Technology",
    "Telecommunications",
    "Hotels & Tourism",
    "Education",
    "Financial Services",
  ];

  const experienceOptions = [
    "No experience",
    "Entry Level",
    "Intermediate",
    "Expert",
  ];

  const jobTypes = [
    { label: "Full Time", value: "full_time" },
    { label: "Part Time", value: "part_time" },
    { label: "Contract", value: "contract" },
  ];

  const toggleOption = (value, current, setter) => {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onApplyFilters({
      jobTitle,
      location,
      jobType,
      salary: Number(salary),
      categories,
      experience,
    });
  };

  const handleReset = () => {
    setJobTitle("");
    setLocation("");
    setJobType("");
    setSalary(0);
    setCategories([]);
    setExperience([]);

    onApplyFilters({
      jobTitle: "",
      location: "",
      jobType: "",
      salary: 0,
      categories: [],
      experience: [],
    });
  };

  const visibleCategories = showMoreCategories
    ? categoryOptions
    : categoryOptions.slice(0, 3);

  return (
    <aside className="w-full lg:w-72 lg:shrink-0">
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <SlidersHorizontal size={17} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Filters
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Refine your job search
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-teal-700"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>

        <div className="space-y-6 p-5">
          {/* Job title */}
          <section>
            <label
              htmlFor="filter-job-title"
              className="mb-3 block text-sm font-semibold text-slate-800"
            >
              Search by Job Title
            </label>
            <div className="relative">
              <BriefcaseBusiness
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="filter-job-title"
                type="text"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="Job title or company"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
            </div>
          </section>

          {/* Location */}
          <section>
            <label
              htmlFor="filter-location"
              className="mb-3 block text-sm font-semibold text-slate-800"
            >
              Location
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                id="filter-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              >
                <option value="">Choose city</option>
                <option value="Delhi">Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Category */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Category
            </h3>
            <div className="space-y-3">
              {visibleCategories.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 transition hover:text-teal-700"
                >
                  <input
                    type="checkbox"
                    checked={categories.includes(category)}
                    onChange={() =>
                      toggleOption(category, categories, setCategories)
                    }
                    className="h-4 w-4 rounded border-slate-300 accent-teal-600 focus:ring-teal-500"
                  />
                  {category}
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowMoreCategories((current) => !current)}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 transition hover:text-teal-800"
            >
              {showMoreCategories ? "Show Less" : "Show More"}
              <ChevronDown
                size={14}
                className={`transition ${showMoreCategories ? "rotate-180" : ""}`}
              />
            </button>
          </section>

          <div className="border-t border-slate-100" />

          {/* Job type */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Job Type
            </h3>
            <div className="space-y-3">
              {jobTypes.map((type) => (
                <label
                  key={type.value}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 transition hover:text-teal-700"
                >
                  <input
                    type="radio"
                    name="jobType"
                    value={type.value}
                    checked={jobType === type.value}
                    onChange={(event) => setJobType(event.target.value)}
                    className="h-4 w-4 border-slate-300 accent-teal-600 focus:ring-teal-500"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Experience */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Experience Level
            </h3>
            <div className="space-y-3">
              {experienceOptions.map((level) => (
                <label
                  key={level}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 transition hover:text-teal-700"
                >
                  <input
                    type="checkbox"
                    checked={experience.includes(level)}
                    onChange={() =>
                      toggleOption(level, experience, setExperience)
                    }
                    className="h-4 w-4 rounded border-slate-300 accent-teal-600 focus:ring-teal-500"
                  />
                  {level}
                </label>
              ))}
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Salary */}
          <section>
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-800">
                Minimum Salary
              </h3>
              <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
                {salary === 0
                  ? "Any"
                  : `₹${(Number(salary) / 100000).toFixed(1)}L`}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="5000000"
              step="50000"
              value={salary}
              onChange={(event) => setSalary(Number(event.target.value))}
              aria-label="Minimum salary"
              className="w-full cursor-pointer accent-teal-600"
            />

            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
              <span>₹0</span>
              <span>₹50L</span>
            </div>
          </section>

          {/* Apply */}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white shadow-sm shadow-teal-900/10 transition hover:-translate-y-0.5 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
          >
            <SlidersHorizontal size={16} />
            Apply Filters
          </button>
        </div>
      </form>
    </aside>
  );
}

export default Sidebar;