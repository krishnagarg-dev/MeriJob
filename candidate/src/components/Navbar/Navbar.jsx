
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EMPLOYER_URL = (
  import.meta.env.VITE_EMPLOYER_URL ||
  "https://merijob-employer.vercel.app"
).replace(/\/$/, "");

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const linkClass = (path) => {
    const isActive =
      path === "/"
        ? location.pathname === "/"
        : location.pathname === path ||
          location.pathname.startsWith(`${path}/`);

    return `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-white/10 text-white"
        : "text-gray-300 hover:bg-white/5 hover:text-white"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#102b29] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
        >
          <img
            src="/merijob-logo.png"
            alt="MeriJob"
            className="h-10 w-10 object-contain"
          />

          <span className="text-xl font-bold tracking-tight text-white">
            Meri<span className="text-[#55c2b2]">Job</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={linkClass(link.path)}
            >
              {link.name}
            </Link>
          ))}

          {token && user?.role === "seeker" && (
            <>
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>

              <Link
                to="/applications"
                className={linkClass("/applications")}
              >
                Applications
              </Link>
            </>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={EMPLOYER_URL}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            Hire Talent
          </a>

          <span className="h-6 w-px bg-white/15" />

          {!token ? (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-[#309689] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#267c72]"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="max-w-32 truncate text-sm text-gray-200">
                Hi, {user?.name || "Job Seeker"}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-[#309689] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#267c72]"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition hover:bg-white/10 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="text-2xl leading-none" aria-hidden="true">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-[#102b29] px-5 pb-5 pt-3 shadow-lg lg:hidden sm:px-8"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={linkClass(link.path)}
              >
                {link.name}
              </Link>
            ))}

            {token && user?.role === "seeker" && (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className={linkClass("/dashboard")}
                >
                  Dashboard
                </Link>

                <Link
                  to="/applications"
                  onClick={closeMenu}
                  className={linkClass("/applications")}
                >
                  Applications
                </Link>
              </>
            )}

            <a
              href={EMPLOYER_URL}
              onClick={closeMenu}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
            >
              Hire Talent
            </a>

            <div className="my-2 border-t border-white/10" />

            {!token ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-[#309689] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#267c72]"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="px-3 py-2 text-sm text-gray-300">
                  Signed in as{" "}
                  <span className="font-semibold text-white">
                    {user?.name || "Job Seeker"}
                  </span>
                </p>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-lg bg-[#309689] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#267c72]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;