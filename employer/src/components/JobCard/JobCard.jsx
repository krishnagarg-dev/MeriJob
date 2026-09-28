
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Pencil,
} from "lucide-react";

function JobCard({ job }) {
  const status = (job.status || "published").toLowerCase();

  const statusStyles = {
    published: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    active: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/10",
    draft: "bg-slate-100 text-slate-600 ring-slate-500/10",
    closed: "bg-slate-100 text-slate-600 ring-slate-500/10",
    rejected: "bg-red-50 text-red-700 ring-red-600/10",
  };

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-100">
            <BriefcaseBusiness size={22} />
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-base font-bold text-slate-900 transition group-hover:text-teal-700 sm:text-lg">
              {job.title || "Untitled Job"}
            </h3>

            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} className="shrink-0 text-slate-400" />
              <span>{job.location || "India"}</span>
            </p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize ring-1 ring-inset ${
            statusStyles[status] ||
            "bg-teal-50 text-teal-700 ring-teal-600/10"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {job.status || "published"}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium capitalize text-slate-600">
          <BriefcaseBusiness size={14} className="text-slate-400" />
          {job.employmentType || "full-time"}
        </span>

        <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium capitalize text-slate-600">
          <Clock3 size={14} className="text-slate-400" />
          {job.workMode || "onsite"}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          Manage this job posting
        </span>

        <Link
          to={`/employer/jobs/${job._id}/edit`}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
        >
          <Pencil size={14} />
          Edit Job
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  );
}

export default JobCard;