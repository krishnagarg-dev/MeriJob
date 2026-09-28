
function BlogCard({ date, title, image }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-200 via-gray-300 to-gray-500">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-white/80">
            Blog Image
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-[#309689] px-4 py-1.5 text-xs font-semibold text-white shadow-md">
          News
        </span>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-[#309689]" />
          {date}
        </p>

        <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-7 text-gray-900 transition-colors duration-300 group-hover:text-[#309689]">
          {title}
        </h3>

        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#309689] transition-all duration-300 hover:gap-3"
        >
          Read More
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

export default BlogCard;