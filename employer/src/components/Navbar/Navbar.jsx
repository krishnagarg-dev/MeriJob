import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || localStorage.getItem("employerToken");
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user") || localStorage.getItem("employerUser") || "null"); } catch { user = null; }

  const handleLogout = () => {
    localStorage.removeItem("employerToken");
    localStorage.removeItem("employerUser");
    localStorage.removeItem("employerRememberMe");

    navigate("/login");
  };

  return (
    <nav className="absolute left-0 top-0 z-50 w-full bg-black/90">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 text-white">
          <img
            src="/merijob-logo.png"
            alt="MeriJob"
            className="h-9 w-9 object-contain"
          />

          <span className="text-lg font-semibold tracking-tight">
            MeriJob
          </span>
        </Link>

        {/* Employer Navigation */}
        <div className="hidden items-center gap-9 md:flex">

          <Link
            to="/dashboard"
            className="text-sm text-white transition hover:text-[#309689]"
          >
            Dashboard
          </Link>

          <Link
            to="/jobs"
            className="text-sm text-white transition hover:text-[#309689]"
          >
            My Jobs
          </Link>

          <Link
            to="/applications"
            className="text-sm text-white transition hover:text-[#309689]"
          >
            Applications
          </Link>

          <Link
            to="/post-job"
            className="text-sm text-white transition hover:text-[#309689]"
          >
            Post a Job
          </Link>

        </div>

        {/* Employer Account */}
        <div className="hidden items-center gap-5 md:flex">

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-sm text-white transition hover:text-[#309689]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-md bg-[#309689] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#277d74]"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-white">
                Hi, {user?.name || "Employer"}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-md bg-[#309689] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#277d74]"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile */}
        <button
          type="button"
          className="text-white md:hidden"
          aria-label="Open menu"
        >
          <span className="text-2xl">☰</span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;