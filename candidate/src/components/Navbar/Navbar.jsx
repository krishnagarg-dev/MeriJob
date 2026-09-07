import { Link, useNavigate } from "react-router-dom";

const EMPLOYER_URL = (import.meta.env.VITE_EMPLOYER_URL || "https://merijob-employer.vercel.app").replace(/\/$/, "");

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user") || "null"); } catch { user = null; }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 text-white">
          <img src="/merijob-logo.png" alt="MeriJob" className="h-9 w-9 object-contain" />
          <span className="text-lg font-semibold tracking-tight">MeriJob</span>
        </Link>
        <div className="hidden items-center gap-9 md:flex">
          <Link to="/" className="text-sm text-white transition hover:text-[#309689]">Home</Link>
          <Link to="/jobs" className="text-sm text-white transition hover:text-[#309689]">Jobs</Link>
          <Link to="/about" className="text-sm text-white transition hover:text-[#309689]">About Us</Link>
          <Link to="/contact" className="text-sm text-white transition hover:text-[#309689]">Contact Us</Link>
          {token && user?.role === "seeker" && <>
            <Link to="/dashboard" className="text-sm text-white transition hover:text-[#309689]">Dashboard</Link>
            <Link to="/applications" className="text-sm text-white transition hover:text-[#309689]">Applications</Link>
          </>}
        </div>
        <div className="hidden items-center gap-5 md:flex">
          <a href={EMPLOYER_URL} className="text-sm text-white transition hover:text-[#309689]">Hire Talent</a>
          {!token ? <>
            <Link to="/login" className="text-sm text-white transition hover:text-[#309689]">Login</Link>
            <Link to="/register" className="rounded-md bg-[#309689] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#277d74]">Register</Link>
          </> : <>
            <span className="text-sm text-white">Hi, {user?.name || "Job Seeker"}</span>
            <button onClick={handleLogout} className="rounded-md bg-[#309689] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#277d74]">Logout</button>
          </>}
        </div>
        <button type="button" className="text-white md:hidden" aria-label="Open menu"><span className="text-2xl">☰</span></button>
      </div>
    </nav>
  );
}
export default Navbar;
