
function Footer() {
  const employerUrl =
    import.meta.env.VITE_EMPLOYER_URL ||
    "https://merijob-employer.vercel.app";

  return (
    <footer className="border-t border-white/10 bg-[#101918] px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-3">
              <img
                src="/merijob-logo.png"
                alt="MeriJob"
                className="h-10 w-10 rounded-lg object-contain"
              />
              <span className="text-xl font-bold tracking-tight">
                Meri<span className="text-[#43b5a5]">Job</span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Find your dream job and connect with the right opportunities
              to build a successful career.
            </p>
          </div>

          {/* Employer Portal */}
          <div className="sm:justify-self-end">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Employer Portal
            </h3>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Discover talented professionals and find the right people
              for your team.
            </p>

            <a
              href={employerUrl}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#309689] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#267c72] hover:shadow-lg hover:shadow-[#309689]/20"
            >
              Hire Talent
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} MeriJob. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Developed with <span className="text-red-400">♥</span> by{" "}
            <span className="font-medium text-gray-300">Krishna Garg</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;