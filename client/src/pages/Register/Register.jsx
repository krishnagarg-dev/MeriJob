import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Register() {
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

          {/* Form */}
          <form className="mt-8 space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
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
                placeholder="Confirm your password"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-xs leading-5 text-gray-500">
              <input type="checkbox" className="mt-1" />

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
              className="w-full rounded-md bg-[#309689] py-3 text-sm font-medium text-white transition hover:bg-[#267d73]"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <p className="mt-7 text-center text-xs text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-[#309689]"
            >
              Login
            </a>
          </p>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Register;
