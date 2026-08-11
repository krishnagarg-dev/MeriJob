function ApplicationCard({ title, company, date, status }) {
  const statusStyles = {
    Applied: "bg-blue-50 text-blue-600",
    Interview: "bg-yellow-50 text-yellow-600",
    Offer: "bg-green-50 text-green-600",
    Rejected: "bg-red-50 text-red-600",
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 md:flex-row md:items-center md:justify-between">

      <div>
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {company}
        </p>

        <p className="mt-2 text-[10px] text-gray-400">
          Applied on {date}
        </p>
      </div>

      <span
        className={`w-fit rounded-full px-3 py-1 text-[10px] font-medium ${
          statusStyles[status] || "bg-gray-50 text-gray-500"
        }`}
      >
        {status}
      </span>

    </div>
  );
}

export default ApplicationCard;
