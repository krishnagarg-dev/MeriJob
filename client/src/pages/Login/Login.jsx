import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
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

      const response = await fetch(
        "https://merijob-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      <Navbar />

      <section className="flex min-h-[650px] items-center justify-center bg-[#ebf5f4] px-6 py-16">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">

          {/* Heading */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#309689] text-xl text-white">
              ðŸ’¼
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your MeriJob account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >
            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
              />
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 text-xs text-gray-500">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />
              Remember me
            </label>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#309689] py-3 text-sm font-medium text-white transition hover:bg-[#267d73] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register */}
          <p className="mt-7 text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-[#309689]"
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

export default Login;



