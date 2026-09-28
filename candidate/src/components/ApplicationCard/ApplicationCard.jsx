
function ApplicationCard({ title, company, date, status }) {
  const statusStyles = {
    applied: "bg-blue-50 text-blue-700 ring-blue-100",
    interview: "bg-amber-50 text-amber-700 ring-amber-100",
    offer: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    rejected: "bg-red-50 text-red-700 ring-red-100",
  };

  const normalizedStatus = status?.toLowerCase() || "applied";

  return (
    <article className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#309689]/30 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-4">
        {/* Company and Application Details */}
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#309689]/10 bg-gradient-to-br from-[#eaf5f2] to-[#d5eee8] text-lg font-bold text-[#309689] transition-transform duration-300 group-hover:scale-105">
            {company?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div className="min-w-0 pt-0.5">
            <h3 className="truncate text-sm font-bold text-gray-900 transition-colors duration-200 group-hover:text-[#267c72] sm:text-base">
              {title}
            </h3>

            <p className="mt-1 truncate text-sm font-medium text-gray-500">
              {company}
            </p>

            <p className="mt-3 flex items-center gap-2 text-xs text-gray-400">
              <span aria-hidden="true" className="text-sm">◷</span>
              <span>Applied on {date}</span>
            </p>
          </div>
        </div>

        {/* Application Status */}
        <span
          className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold capitalize ring-1 ring-inset sm:text-xs ${
            statusStyles[normalizedStatus] ||
            "bg-gray-100 text-gray-600 ring-gray-200"
          }`}
        >
          {status || "Applied"}
        </span>
      </div>

      <div className="mt-5 h-px bg-gray-100 transition-colors duration-300 group-hover:bg-[#309689]/15" />
    </article>
  );
}

export default ApplicationCard;