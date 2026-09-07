import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="absolute left-0 top-0 z-50 w-full bg-black/90">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 text-white">
          <img src="/merijob-logo.png" alt="MeriJob" className="h-9 w-9 object-contain" />
          <span className="text-lg font-semibold tracking-tight">MeriJob</span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          <Link to="/" className="text-sm text-white hover:text-[#309689]">Home</Link>
          {isAuthenticated && <Link to="/employer/dashboard" className="text-sm text-white hover:text-[#309689]">Dashboard</Link>}
          {isAuthenticated && <Link to="/employer/jobs" className="text-sm text-white hover:text-[#309689]">My Jobs</Link>}
          {isAuthenticated && <Link to="/employer/applications" className="text-sm text-white hover:text-[#309689]">Applications</Link>}
          {isAuthenticated && <Link to="/employer/jobs/new" className="text-sm text-white hover:text-[#309689]">Post a Job</Link>}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-white">Hi, {user?.name || "Employer"}</span>
              <button onClick={handleLogout} className="rounded-md bg-[#309689] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#277d74]">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-white hover:text-[#309689]">Login</Link>
              <Link to="/register" className="rounded-md bg-[#309689] px-5 py-2.5 text-sm font-medium text-white">Register</Link>
            </>
          )}
        </div>

        <button type="button" className="text-white md:hidden" aria-label="Open menu"><span className="text-2xl">☰</span></button>
      </div>
    </nav>
  );
}

export default Navbar;
