
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { API } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function EmployerRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: "employer",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Registration failed.");
      }

      if (data.token) {
        login(data.token, data.user, false);
        navigate("/setup", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error("Employer registration error:", err);
      setError(err.message || "Unable to register. Please try again.");
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
                Build your team
              </p>

              <h1 className="mt-4 max-w-md text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                Your next great hire starts here.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 xl:text-base">
                Create your employer account on MeriJob and take the first step
                toward connecting with candidates for your opportunities.
              </p>
            </div>

            <div className="relative mt-12 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                  <Users size={21} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Organize your hiring
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Manage job posts and candidate applications.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                  <ShieldCheck size={21} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Get started with MeriJob
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Set up your employer profile after registration.
                  </p>
                </div>
              </div>

              <p className="pt-3 text-xs text-slate-500">
                MeriJob · Employer Portal
              </p>
            </div>
          </div>

          {/* Registration form */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-14">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 lg:hidden">
                  <BriefcaseBusiness size={26} />
                </div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  Employer registration
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Create account
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Register your employer account to start hiring with MeriJob.
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

              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label
                    htmlFor="employer-name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="employer-name"
                      type="text"
                      value={form.name}
                      onChange={(event) => set("name", event.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="employer-register-email"
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
                      id="employer-register-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => set("email", event.target.value)}
                      placeholder="name@company.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="employer-register-password"
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
                      id="employer-register-password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(event) => set("password", event.target.value)}
                      placeholder="Minimum 6 characters"
                      autoComplete="new-password"
                      minLength={6}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
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

                <div>
                  <label
                    htmlFor="employer-confirm-password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="employer-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(event) =>
                        set("confirmPassword", event.target.value)
                      }
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((current) => !current)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/15 transition hover:bg-teal-700 hover:shadow-teal-700/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create employer account
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-teal-700 transition hover:text-teal-800 hover:underline"
                >
                  Sign in
                </Link>
              </p>

              <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                By creating an account, you can continue to set up your
                employer profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EmployerRegister;