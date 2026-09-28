
function StatCard({ title, value, label }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#309689]/20 hover:shadow-lg sm:p-6">
      {/* Decorative Accent */}
      <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#eaf5f2]/70 transition-all duration-300 group-hover:h-24 group-hover:w-24" />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf5f2] text-[#309689] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#309689] group-hover:text-white">
            <span className="h-2.5 w-2.5 rounded-full bg-current" />
          </span>
        </div>

        <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-[#267c72]">
          {value}
        </p>

        <p className="mt-2 text-xs font-medium leading-5 text-gray-500">
          {label}
        </p>
      </div>
    </div>
  );
}

export default StatCard;