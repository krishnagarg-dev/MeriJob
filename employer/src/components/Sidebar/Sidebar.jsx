import { useState } from "react";

function Sidebar({ onApplyFilters }) {
    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [salary, setSalary] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        onApplyFilters({
            jobTitle,
            location,
            jobType,
            salary,
        });
    };

    return (
        <aside className="w-full lg:w-64">

            <form onSubmit={handleSubmit}>

                {/* Search */}
                <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Search by Job Title
                    </h3>

                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Job title or company"
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#309689]"
                    />
                </div>

                {/* Location */}
                <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Location
                    </h3>

                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-500 outline-none"
                    >
                        <option value="">Choose city</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Noida">Noida</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>
                </div>

                {/* Category */}
                <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Category
                    </h3>

                    <div className="space-y-2">
                        {[
                            "Technology",
                            "Telecommunications",
                            "Hotels & Tourism",
                            "Education",
                            "Financial Services",
                        ].map((category) => (
                            <label
                                key={category}
                                className="flex cursor-pointer items-center gap-2 text-xs text-gray-600"
                            >
                                <input type="checkbox" />
                                {category}
                            </label>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="mt-3 text-xs font-medium text-[#309689]"
                    >
                        Show More
                    </button>
                </div>

                {/* Job Type */}
                <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Job Type
                    </h3>

                    <div className="space-y-2">
                        {[
                            { label: "Full Time", value: "full_time" },
                            { label: "Part Time", value: "part_time" },
                            { label: "Contract", value: "contract" },
                        ].map((type) => (
                            <label
                                key={type.value}
                                className="flex items-center gap-2 text-xs text-gray-600"
                            >
                                <input
                                    type="radio"
                                    name="jobType"
                                    value={type.value}
                                    checked={jobType === type.value}
                                    onChange={(e) => setJobType(e.target.value)}
                                />

                                {type.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Experience Level
                    </h3>

                    <div className="space-y-2">
                        {[
                            "No experience",
                            "Entry Level",
                            "Intermediate",
                            "Expert",
                        ].map((level) => (
                            <label
                                key={level}
                                className="flex items-center gap-2 text-xs text-gray-600"
                            >
                                <input type="checkbox" />
                                {level}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Salary */}
                <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Salary
                    </h3>

                    <input
                        type="range"
                        min="0"
                        max="5000000"
                        step="50000"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full accent-[#309689]"
                    />

                    <div className="mt-2 flex justify-between text-[10px] text-gray-500">
                        <span>â‚¹0</span>
                        <span>
                            â‚¹{(salary / 100000).toFixed(1)}L
                        </span>
                    </div>
                </div>

                {/* Apply */}
                <button
                    type="submit"
                    className="mt-7 w-full rounded-md bg-[#309689] py-2.5 text-xs font-medium text-white transition hover:bg-[#267d73]"
                >
                    Apply Filters
                </button>

            </form>

        </aside>
    );
}

export default Sidebar;




