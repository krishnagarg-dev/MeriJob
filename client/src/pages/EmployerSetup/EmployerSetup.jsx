import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function EmployerSetup() {
  const navigate = useNavigate();

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

    try {
      setLoading(true);

      /*
       * Backend integration will be connected in the next step.
       * For now, save the company profile locally so the flow works.
       */
      const company = {
        companyName: companyName.trim(),
        industry,
        location: location.trim(),
        website: website.trim(),
        description: description.trim(),
      };

      localStorage.setItem("company", JSON.stringify(company));

      navigate("/employer/dashboard");
    } catch (err) {
      console.error("Company setup error:", err);
      setError("Unable to save company profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      <Navbar />

      <section className="min-h-[750px] bg-[#ebf5f4] px-6 py-16">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <div className="text-center">
            <img
              src="/merijob-logo.png"
              alt="MeriJob"
              className="mx-auto h-14 w-auto object-contain"
            />

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Complete Your Company Profile
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Tell candidates about your company so they can learn more
              about your organization and opportunities.
            </p>
          </div>

          {/* Form */}
          <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm md:p-10">

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Company Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company Name *
                </label>

                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Industry *
                </label>

                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
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

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company Location *
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Noida, Uttar Pradesh"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
                />
              </div>

              {/* Website */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company Website
                </label>

                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  About Your Company *
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell candidates about your company, culture, products, and what you do..."
                  rows={6}
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
                />

                <p className="mt-2 text-xs text-gray-400">
                  A good description helps candidates understand your
                  company better.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#309689] py-3.5 text-sm font-semibold text-white transition hover:bg-[#267d73] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save & Continue"}
              </button>

            </form>
          </div>

          <p className="mt-5 text-center text-xs text-gray-400">
            You can update your company information later from your
            employer dashboard.
          </p>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EmployerSetup;