
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Globe,
  FileText,
  ArrowRight,
  LoaderCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { API } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "E-commerce",
  "Manufacturing",
  "Construction",
  "Hospitality",
  "Transportation",
  "Other",
];

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

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        throw new Error(data.message || "Unable to save company profile.");
      }

      localStorage.setItem("company", JSON.stringify(data.company));
      navigate("/employer/dashboard", { replace: true });
    } catch (err) {
      console.error("Company setup error:", err);
      setError(err.message || "Unable to save company profile.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="relative overflow-hidden px-5 py-12 sm:px-8 sm:py-16">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-teal-200/40 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan-100/70 blur-[110px]" />

        <div className="relative mx-auto max-w-5xl">
          {/* Page heading */}
          <div className="mb-10 text-center sm:mb-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/20">
              <Building2 size={29} />
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-teal-700 shadow-sm">
              <Sparkles size={14} />
              EMPLOYER ONBOARDING
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Set up your <span className="text-teal-600">company profile</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Help candidates get to know your organization. Add your company
              details to complete your employer account setup.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">
              <CheckCircle2 size={18} />
            </div>
            <div className="h-1 w-12 rounded-full bg-teal-500 sm:w-20" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white ring-4 ring-teal-100">
              2
            </div>
            <div className="h-1 w-12 rounded-full bg-slate-200 sm:w-20" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-400">
              3
            </div>
          </div>

          <div className="mb-8 flex justify-center gap-5 text-center text-xs font-medium sm:gap-12">
            <span className="text-teal-700">Account</span>
            <span className="text-teal-700">Company profile</span>
            <span className="text-slate-400">Dashboard</span>
          </div>

          {/* Form card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            <div className="flex items-start gap-4 border-b border-slate-100 p-5 sm:p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <BriefcaseBusiness size={23} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Company information
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Provide the details candidates will see when exploring your
                  job opportunities.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-8 lg:p-10">
              {error && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Company name */}
                <div className="sm:col-span-2">
                  <label htmlFor="company-name" className={labelClass}>
                    Company name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="company-name"
                      type="text"
                      value={companyName}
                      onChange={(event) => setCompanyName(event.target.value)}
                      placeholder="e.g. MeriJob Technologies"
                      className={`${inputClass} pl-11`}
                      autoComplete="organization"
                      required
                    />
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <label htmlFor="company-industry" className={labelClass}>
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="company-industry"
                    value={industry}
                    onChange={(event) => setIndustry(event.target.value)}
                    className={inputClass}
                    required
                  >
                    <option value="">Select industry</option>
                    {industries.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="company-location" className={labelClass}>
                    Company location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="company-location"
                      type="text"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="e.g. Noida, Uttar Pradesh"
                      className={`${inputClass} pl-11`}
                      autoComplete="address-level2"
                      required
                    />
                  </div>
                </div>

                {/* Website */}
                <div className="sm:col-span-2">
                  <label htmlFor="company-website" className={labelClass}>
                    Company website{" "}
                    <span className="font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <Globe
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="company-website"
                      type="url"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                      placeholder="https://yourcompany.com"
                      className={`${inputClass} pl-11`}
                      autoComplete="url"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Add your official website so candidates can learn more.
                  </p>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label htmlFor="company-description" className={labelClass}>
                    About your company{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText
                      size={18}
                      className="absolute left-4 top-4 text-slate-400"
                    />
                    <textarea
                      id="company-description"
                      value={description}
                      onChange={(event) =>
                        setDescription(event.target.value)
                      }
                      placeholder="Tell candidates about your company, culture, products, services and what makes your organization unique..."
                      rows={6}
                      className={`${inputClass} min-h-40 resize-y pl-11 leading-7`}
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    A clear description helps candidates understand your
                    organization and the opportunities you offer.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/15 transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-teal-700/20 focus:outline-none focus:ring-4 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Saving company profile...
                    </>
                  ) : (
                    <>
                      Save & Continue
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  You can update your company information later from your
                  employer dashboard.
                </p>
              </div>
            </form>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
            <ShieldCheck size={15} className="shrink-0 text-teal-600" />
            Your company information is submitted securely to MeriJob.
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EmployerSetup;