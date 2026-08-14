function StatCard({ title, value, label }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <p className="text-xs text-gray-500">
        {title}
      </p>

      <p className="mt-3 text-2xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#309689]">
        {label}
      </p>
    </div>
  );
}

export default StatCard;




