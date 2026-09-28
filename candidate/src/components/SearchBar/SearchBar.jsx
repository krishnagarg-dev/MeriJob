
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState({
    keyword: "",
    location: "",
    category: "",
  });

  const handleChange = (key, value) => {
    setSearch((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(search);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-black/5 sm:p-4 md:flex-row md:items-center"
    >
      {/* Keyword */}
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#309689]/20">
        <span className="text-lg text-[#309689]" aria-hidden="true">
          ⌕
        </span>
        <input
          type="text"
          value={search.keyword}
          onChange={(event) =>
            handleChange("keyword", event.target.value)
          }
          placeholder="Job title or company"
          aria-label="Job title or company"
          className="w-full min-w-0 bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Location */}
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#309689]/20 md:border-l md:border-gray-200">
        <span className="text-base" aria-hidden="true">
          📍
        </span>
        <select
          value={search.location}
          onChange={(event) =>
            handleChange("location", event.target.value)
          }
          aria-label="Select location"
          className="w-full min-w-0 appearance-none bg-transparent py-3.5 text-sm text-gray-600 outline-none"
        >
          <option value="">All Locations</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
      </div>

      {/* Category */}
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#309689]/20 md:border-l md:border-gray-200">
        <span className="text-base" aria-hidden="true">
          ▦
        </span>
        <select
          value={search.category}
          onChange={(event) =>
            handleChange("category", event.target.value)
          }
          aria-label="Select category"
          className="w-full min-w-0 appearance-none bg-transparent py-3.5 text-sm text-gray-600 outline-none"
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Design">Design</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#309689] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#267c72] focus:outline-none focus:ring-2 focus:ring-[#309689] focus:ring-offset-2"
      >
        <span>Search Jobs</span>
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

export default SearchBar;