
function ApplicationCard({ title, company, date, status }) {
  const statusStyles = {
    Applied: "bg-blue-50 text-blue-700 ring-blue-600/10",
    Interview: "bg-amber-50 text-amber-700 ring-amber-600/10",
    Offer: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    Rejected: "bg-red-50 text-red-700 ring-red-600/10",
  };

  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="7" width="18" height="14" rx="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>

        <div className="min-w-0">
          <h3 className="break-words text-base font-bold text-slate-900 transition group-hover:text-teal-700">
            {title || "Untitled Position"}
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-600">
            {company || "Company not specified"}
          </p>

          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Applied on {date || "Date unavailable"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:shrink-0 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
        <span className="text-xs font-medium text-slate-400 sm:hidden">
          Application status
        </span>

        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset ${
            statusStyles[status] || "bg-slate-50 text-slate-600 ring-slate-500/10"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status || "Unknown"}
        </span>
      </div>
    </article>
  );
}

export default ApplicationCard;