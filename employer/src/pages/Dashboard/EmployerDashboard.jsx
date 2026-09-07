import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { API } from "../../services/api";

function EmployerSetup() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    industry: "",
    location: "",
    website: "",
    description: "",
    companySize: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!form.name.trim()) {
      setError("Please enter your company name.");
      return;
    }

    if (!form.industry) {
      setError("Please select your industry.");
      return;
    }

    if (!form.location.trim()) {
      setError("Please enter your company location.");
      return;
    }

    if (!form.description.trim()) {
      setError("Please enter a company description.");
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
          name: form.name.trim(),
          industry: form.industry,
          location: form.location.trim(),
          website: form.website.trim(),
          description: form.description.trim(),
          companySize: form.companySize.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to save company profile.");
      }

      // Keep company available locally for UI convenience
      localStorage.setItem("company", JSON.stringify(data.company));

      navigate("/employer/dashboard");
    } catch (err) {
      console.error("Company setup error:", err);
      setError(err.message || "Unable to save company profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="min-h-[750px] bg-[#ebf5f4] px-6 py-16">
        <div className="mx-auto max-w-3xl">

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#309689] text-2xl text-white">
              💼
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Complete Your Company Profile
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Tell candidates about your company so they can learn more about
              your organization and opportunities.
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm md:p-10">

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company Name *
                </label>

                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Industry *
                </label>

                <select
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  required
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

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company Location *
                </label>

                <input
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Noida, Uttar Pradesh"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company Website
                </label>

                <input
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company Size
                </label>

                <select
                  name="companySize"
                  value={form.companySize}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  About Your Company *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell candidates about your company, culture, products, and what you do..."
                  rows={6}
                  required
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#309689] focus:ring-1 focus:ring-[#309689]"
                />

                <p className="mt-2 text-xs text-gray-400">
                  A good description helps candidates understand your company
                  better.
                </p>
              </div>

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
            You can update your company information later from your employer
            dashboard.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EmployerSetup;