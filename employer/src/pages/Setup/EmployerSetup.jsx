
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { API } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function EmployerSetup() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!companyName.trim()) {
      setError("Please enter your company name.");
      return;
    }

    if (!industry) {
      setError("Please select your industry.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter your company location.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a company description.");
      return;
    }

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/api/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: companyName.trim(),
          industry,
          location: location.trim(),
          website: website.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to save company profile."
        );
      }

      localStorage.setItem("company", JSON.stringify(data.company));
      navigate("/employer/dashboard");
    } catch (err) {
      console.error("Company setup error:", err);

      setError(
        err.message || "Unable to save company profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#309689] focus:ring-4 focus:ring-[#309689]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="min-h-screen bg-[#ebf5f4] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Page Header */}
          <div className="mb-10 text-center sm:mb-12">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#309689]/10 px-4 py-2 text-xs font-semibold tracking-wide text-[#267d73]">
              <span className="h-2 w-2 rounded-full bg-[#309689]" />
              EMPLOYER PROFILE
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Complete Your Company Profile
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Tell candidates about your company so they can learn
              more about your organization and opportunities.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_12px_45px_rgba(31,72,67,0.07)] sm:p-8 md:p-10">
            {/* Form Intro */}
            <div className="mb-8 border-b border-gray-100 pb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Company Information
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Add your company details to set up your employer
                account.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div>
                <label className={labelClass}>
                  Company Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                  className={inputClass}
                  required
                />
              </div>

              {/* Industry */}
              <div>
                <label className={labelClass}>
                  Industry <span className="text-red-500">*</span>
                </label>

                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Marketing">Marketing</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Construction">Construction</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Company Location */}
              <div>
                <label className={labelClass}>
                  Company Location <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Noida, Uttar Pradesh"
                  className={inputClass}
                  required
                />
              </div>

              {/* Company Website */}
              <div>
                <label className={labelClass}>
                  Company Website
                </label>

                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourcompany.com"
                  className={inputClass}
                />
              </div>

              {/* Company Description */}
              <div>
                <label className={labelClass}>
                  About Your Company{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell candidates about your company, culture, products, and what you do..."
                  rows={6}
                  className={`${inputClass} min-h-36 resize-y leading-6`}
                  required
                />

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  A good description helps candidates understand
                  your company better.
                </p>
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-100 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#309689] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#267d73] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#309689]/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    "Save & Continue"
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                  You can update your company information later
                  from your employer dashboard.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EmployerSetup;