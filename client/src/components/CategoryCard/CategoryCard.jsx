function CategoryCard({ icon, name, jobs }) {
  return (
    <div className="flex min-h-[150px] flex-col items-center justify-center rounded-lg bg-white px-4 text-center transition hover:-translate-y-1 hover:shadow-md">
      
      <div className="mb-4 text-2xl text-[#309689]">
        {icon}
      </div>

      <h3 className="text-sm font-semibold text-gray-900">
        {name}
      </h3>

      <p className="mt-2 rounded-full bg-[#ebf5f4] px-3 py-1 text-[10px] text-[#309689]">
        {jobs} jobs
      </p>

    </div>
  );
}

export default CategoryCard;
