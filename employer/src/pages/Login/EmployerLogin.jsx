
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Users,
  LoaderCircle,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

function EmployerLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("employerToken");
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("employerUser") || "null");
    } catch {
      user = null;
    }

    if (token && user?.role === "employer") {
      navigate("/employer/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
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
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      if (data.user?.role !== "employer") {
        setError("This login is only for employers.");
        return;
      }

      login(data.token, data.user, rememberMe);
      navigate("/employer/dashboard", { replace: true });
    } catch (err) {
      console.error("Employer login error:", err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-teal-200/40 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan-100/70 blur-[110px]" />

        <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-2">
          {/* Left information panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex xl:p-14">
            <div className="pointer-events-none absolute -right-28 -top-20 h-80 w-80 rounded-full bg-teal-500/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[80px]" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20">
                <BriefcaseBusiness size={27} strokeWidth={2.2} />
              </div>

              <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
                Welcome to MeriJob
              </p>

              <h1 className="mt-4 max-w-md text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                Find the people who move your business forward.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 xl:text-base">
                Access your employer workspace to manage job listings, review
                applications and take the next step in your hiring process.
              </p>
            </div>

            <div className="relative mt-12 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                  <Users size={21} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Manage candidates
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Keep your applications organized.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                  <ShieldCheck size={21} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Your hiring workspace
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Access your employer tools in one place.
                  </p>
                </div>
              </div>

              <p className="pt-3 text-xs text-slate-500">
                MeriJob · Employer Portal
              </p>
            </div>
          </div>

          {/* Login form */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 lg:hidden">
                  <BriefcaseBusiness size={26} />
                </div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  Employer workspace
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Welcome back
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Sign in to continue managing your hiring process.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="employer-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="employer-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@company.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="employer-password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="employer-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 accent-teal-600 focus:ring-teal-500"
                    />
                    Remember me
                  </label>

                  <span
                    className="cursor-not-allowed text-sm font-medium text-slate-400"
                    title="Password recovery is not configured yet"
                  >
                    Forgot password?
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/15 transition hover:bg-teal-700 hover:shadow-teal-700/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in to employer portal
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs text-slate-400">New to MeriJob?</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <p className="text-center text-sm text-slate-600">
                Don&apos;t have an employer account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-teal-700 transition hover:text-teal-800 hover:underline"
                >
                  Create account
                </Link>
              </p>

              <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                By signing in, you access your MeriJob employer workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EmployerLogin;