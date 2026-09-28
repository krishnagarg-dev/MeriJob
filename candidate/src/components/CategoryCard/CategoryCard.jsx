
function CategoryCard({ icon, name, jobs }) {
  return (
    <div className="group flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-5 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#309689]/30 hover:shadow-xl">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ebf5f4] text-2xl text-[#309689] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#309689] group-hover:text-white">
        {icon}
      </div>

      <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-[#309689]">
        {name}
      </h3>

      <p className="mt-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500 transition-colors group-hover:bg-[#ebf5f4] group-hover:text-[#309689]">
        {jobs} jobs
      </p>
    </div>
  );
}

export default CategoryCard;