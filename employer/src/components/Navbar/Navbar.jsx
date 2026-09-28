
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, BriefcaseBusiness, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    navigate("/", { replace: true });
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: "/", label: "Home", public: true },
    { to: "/employer/dashboard", label: "Dashboard", auth: true },
    { to: "/employer/jobs", label: "My Jobs", auth: true },
    { to: "/employer/applications", label: "Applications", auth: true },
    { to: "/employer/jobs/new", label: "Post a Job", auth: true },
  ];

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-teal-50 text-teal-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
    }`;

  return (
    <header className="absolute left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/15 transition group-hover:bg-white/15">
            <img
              src="/merijob-logo.png"
              alt="MeriJob"
              className="h-8 w-8 object-contain"
            />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            Meri<span className="text-teal-400">Job</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks
            .filter((item) => item.public || (item.auth && isAuthenticated))
            .map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 border-r border-white/15 pr-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500/15 text-sm font-bold text-teal-300 ring-1 ring-teal-400/20">
                  {(user?.name || "E").charAt(0).toUpperCase()}
                </div>
                <div className="max-w-36">
                  <p className="text-xs text-slate-400">Welcome back</p>
                  <p className="truncate text-sm font-semibold text-white">
                    {user?.name || "Employer"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:text-teal-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-950/30 transition hover:-translate-y-0.5 hover:bg-teal-400"
              >
                <BriefcaseBusiness size={16} />
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
        >
          {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950 px-5 pb-5 pt-3 shadow-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks
              .filter((item) => item.public || (item.auth && isAuthenticated))
              .map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-teal-500/10 text-teal-300"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

            <div className="mt-3 border-t border-white/10 pt-4">
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500/15 font-bold text-teal-300">
                      {(user?.name || "E").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="truncate text-sm font-semibold text-white">
                        {user?.name || "Employer"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-red-400/20 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex-1 rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/5"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="flex-1 rounded-xl bg-teal-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-400"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;