function SearchBar() {
  return (
    <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-2 rounded-md bg-white p-2 md:flex-row">

      <input
        type="text"
        placeholder="Job Title or Company"
        className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none"
      />

      <select className="flex-1 border-l px-4 py-3 text-sm text-gray-500 outline-none">
        <option>Selected Location</option>
        <option>New York</option>
        <option>Los Angeles</option>
      </select>

      <select className="flex-1 border-l px-4 py-3 text-sm text-gray-500 outline-none">
        <option>Select Category</option>
        <option>Technology</option>
        <option>Finance</option>
        <option>Design</option>
      </select>

      <button className="rounded-md bg-[#309689] px-6 py-3 text-sm font-medium text-white">
        Search Job
      </button>

    </div>
  );
}

export default SearchBar;




