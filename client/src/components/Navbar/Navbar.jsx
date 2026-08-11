import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#309689]">
            <span className="text-sm">💼</span>
          </div>

          <span className="text-lg font-semibold tracking-tight">
            MeriJob
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          <Link
            to="/"
            className="text-sm text-white transition hover:text-[#309689]"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="text-sm text-white transition hover:text-[#309689]"
          >
            Jobs
          </Link>

          <Link
            to="/about"
            className="text-sm text-white transition hover:text-[#309689]"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="text-sm text-white transition hover:text-[#309689]"
          >
            Contact Us
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="hidden items-center gap-5 md:flex">
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
        </div>

        {/* Mobile menu button */}
        <button className="text-white md:hidden">
          <span className="text-2xl">☰</span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
