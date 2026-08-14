import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agree) {
      setError(
        "Please agree to the Terms & Conditions"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://merijob-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Registration failed"
        );
        return;
      }

      // Backend already returns a JWT token
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      <Navbar />

      <section className="flex min-h-[700px] items-center justify-center bg-[#ebf5f4] px-6 py-16">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">

          {/* Heading */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#309689] text-xl text-white">
              💼
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Create Your Account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Join MeriJob and find your dream job
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
            onSubmit={handleRegister}
            className="mt-8 space-y-5"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your full name"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
              />
            </div>

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
                placeholder="Create a password"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm your password"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-xs leading-5 text-gray-500">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) =>
                  setAgree(e.target.checked)
                }
                className="mt-1"
              />

              <span>
                I agree to the{" "}
                <span className="text-[#309689]">
                  Terms & Conditions
                </span>{" "}
                and Privacy Policy.
              </span>
            </label>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#309689] py-3 text-sm font-medium text-white transition hover:bg-[#267d73] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="mt-7 text-center text-xs text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#309689]"
            >
              Login
            </Link>
          </p>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Register;



