import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Login() {
  return (
    <main className="bg-white">
      <Navbar />

      <section className="flex min-h-[650px] items-center justify-center bg-[#ebf5f4] px-6 py-16">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">

          {/* Heading */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#309689] text-xl text-white">
              💼
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your MeriJob account
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-5">

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

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-xs font-medium text-gray-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-[#309689]"
                >
                  Forgot Password?
                </button>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-gray-500">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-[#309689] py-3 text-sm font-medium text-white transition hover:bg-[#267d73]"
            >
              Login
            </button>

          </form>

          {/* Register */}
          <p className="mt-7 text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-[#309689]"
            >
              Register
            </a>
          </p>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Login;
