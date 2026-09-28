
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Mail,
} from "lucide-react";

function Footer() {
  const employerLinks = [
    { label: "Dashboard", to: "/employer/dashboard" },
    { label: "My Jobs", to: "/employer/jobs" },
    { label: "Post a Job", to: "/employer/jobs/new" },
    { label: "Applications", to: "/employer/applications" },
  ];

  const hiringLinks = [
    { label: "Find Candidates", to: "/employer/dashboard" },
    { label: "Manage Jobs", to: "/employer/jobs" },
    { label: "Review Applications", to: "/employer/applications" },
    { label: "Build Your Team", to: "/employer/dashboard" },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-950 px-5 pb-6 pt-14 text-white sm:px-8 sm:pt-16">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <img
                  src="/merijob-logo.png"
                  alt="MeriJob"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Meri<span className="text-teal-400">Job</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Hire the right talent and grow your business with
              MeriJob's simple and powerful hiring platform.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-teal-400/15 bg-teal-400/5 px-3 py-2 text-xs font-medium text-teal-300">
              <BriefcaseBusiness size={14} />
              Your next great hire starts here
            </div>
          </div>

          {/* Employer */}
          <div>
            <h3 className="mb-5 text-sm font-bold text-white">
              Employer
            </h3>
            <ul className="space-y-3">
              {employerLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-teal-300"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hiring */}
          <div>
            <h3 className="mb-5 text-sm font-bold text-white">
              Hiring
            </h3>
            <ul className="space-y-3">
              {hiringLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-teal-300"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-sm font-bold text-white">
              Stay in the loop
            </h3>

            <p className="mb-5 text-sm leading-7 text-slate-400">
              Subscribe for hiring insights, talent updates and the
              latest MeriJob news.
            </p>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-white/[0.04] p-1.5 transition focus-within:border-teal-500/60"
            >
              <Mail
                size={17}
                className="ml-2 shrink-0 text-slate-500"
              />
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Your email address"
                className="min-w-0 flex-1 bg-transparent px-1 py-2 text-xs text-white outline-none placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-teal-500 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-teal-400"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">
              Stay updated with the latest from MeriJob.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>© 2026 MeriJob. All rights reserved.</p>
            <p className="mt-1.5">
              Developed by{" "}
              <span className="font-semibold text-slate-300">
                Krishna Garg
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              to="/"
              className="transition hover:text-teal-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="transition hover:text-teal-300"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;