import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

function EmployerLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("employerToken");
    let user = null;
    try { user = JSON.parse(localStorage.getItem("employerUser") || "null"); } catch {}
    if (token && user?.role === "employer") navigate("/employer/dashboard", { replace: true });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Login failed");
        return;
      }

      if (data.user?.role !== "employer") {
        setError("This login is only for employers");
        return;
      }

      login(data.token, data.user, rememberMe);

      navigate("/employer/dashboard", { replace: true });
    } catch (err) {
      console.error("Employer login error:", err);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="flex min-h-[650px] items-center justify-center bg-[#ebf5f4] px-6 py-16">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">

          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#309689] text-xl text-white">
              💼
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Employer Login
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your MeriJob hiring portal
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-gray-300"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-xs font-medium text-[#309689] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#309689] py-3 text-sm font-medium text-white transition hover:bg-[#267d73] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Employer Login"}
            </button>
          </form>

          {/* Register */}
          <p className="mt-7 text-center text-xs text-gray-500">
            Don't have an employer account?{" "}
            <Link
              to="/register"
              className="font-medium text-[#309689] hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EmployerLogin;