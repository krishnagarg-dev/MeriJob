function BlogCard({ date, title, image }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white">
      
      {/* Image */}
      <div className="relative h-56 overflow-hidden rounded-lg bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/70">
            Blog Image
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-[#309689] px-3 py-1 text-[10px] font-medium text-white">
          News
        </span>
      </div>

      {/* Content */}
      <div className="pt-5">
        <p className="text-xs text-gray-400">
          {date}
        </p>

        <h3 className="mt-2 text-base font-semibold leading-6 text-gray-900">
          {title}
        </h3>

        <button className="mt-4 text-xs font-medium text-[#309689]">
          Read more â†’
        </button>
      </div>

    </article>
  );
}

export default BlogCard;




