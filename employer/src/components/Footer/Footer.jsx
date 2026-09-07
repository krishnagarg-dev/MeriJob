import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-black px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/merijob-logo.png"
                alt="MeriJob"
                className="h-9 w-9 object-contain"
              />

              <span className="text-lg font-semibold">
                MeriJob
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
              Hire the right talent and grow your business with
              MeriJob's simple and powerful hiring platform.
            </p>
          </div>

          {/* Employer */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Employer
            </h3>

            <div className="space-y-3 text-sm text-gray-400">
              <Link to="/employer/dashboard" className="block hover:text-white">Dashboard</Link>
              <Link to="/employer/jobs" className="block hover:text-white">My Jobs</Link>
              <Link to="/employer/jobs/new" className="block hover:text-white">Post a Job</Link>
              <Link to="/employer/applications" className="block hover:text-white">Applications</Link>
            </div>
          </div>

          {/* Hiring */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Hiring
            </h3>

            <div className="space-y-3 text-sm text-gray-400">
              <p>Find Candidates</p>
              <p>Manage Jobs</p>
              <p>Review Applications</p>
              <p>Build Your Team</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Newsletter
            </h3>

            <p className="mb-4 text-sm leading-6 text-gray-400">
              Subscribe for hiring insights, talent updates and
              the latest MeriJob news.
            </p>

            <div className="flex overflow-hidden rounded-md border border-gray-700">
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-xs text-white outline-none placeholder:text-gray-500"
              />

              <button
                type="button"
                className="bg-[#309689] px-4 text-xs font-medium text-white"
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-gray-800 pt-6 text-xs text-gray-500 md:flex-row">
          <div>
            <p>
              © 2026 MeriJob. All rights reserved.
            </p>

            <p className="mt-1">
              Developed by Krishna Garg
            </p>
          </div>

          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;