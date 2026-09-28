
import { TrendingUp } from "lucide-react";

function StatCard({ title, value, label }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg sm:p-6">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-teal-50 opacity-70 transition duration-300 group-hover:scale-125" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-100">
            <TrendingUp size={19} />
          </div>
        </div>

        <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
          {value ?? "—"}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          <p className="text-xs font-medium text-teal-700">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;