
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  Code2,
  Wallet,
  Users,
  CalendarDays,
  FileText,
  Building2,
  CheckCircle2,
  LoaderCircle,
  Info,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const initial = {
  title: "",
  description: "",
  skills: "",
  location: "",
  workMode: "onsite",
  employmentType: "full-time",
  experience: "",
  salaryMin: "",
  salaryMax: "",
  salaryPeriod: "year",
  openings: 1,
  deadline: "",
  status: "pending",
};

function PostJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(Boolean(id));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (!id) {
      setFetching(false);
      return;
    }

    let active = true;

    const loadJob = async () => {
      try {
        setFetching(true);
        setError("");

        const data = await api("/api/employer/jobs");
        const job = (data.jobs || []).find((item) => item._id === id);

        if (!active) return;

        if (!job) {
          setError("Job not found");
          return;
        }

        setForm({
          ...initial,
          ...job,
          skills: (job.skills || []).join(", "),
          deadline: job.deadline ? job.deadline.slice(0, 10) : "",
          salaryMin: job.salaryMin ?? "",
          salaryMax: job.salaryMax ?? "",
        });
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load job");
        }
      } finally {
        if (active) setFetching(false);
      }
    };

    loadJob();

    return () => {
      active = false;
    };
  }, [id, token, navigate]);

  const set = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (
      form.salaryMin !== "" &&
      form.salaryMax !== "" &&
      Number(form.salaryMin) > Number(form.salaryMax)
    ) {
      setError("Minimum salary cannot be greater than maximum salary.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        location: form.location.trim(),
        workMode: form.workMode,
        employmentType: form.employmentType,
        experience: form.experience.trim(),
        salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
        salaryPeriod: form.salaryPeriod,
        openings: Number(form.openings) || 1,
        deadline: form.deadline || null,
        status: "published",
      };

      await api(`/api/employer/jobs${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.message || "Unable to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-14 pt-32 text-white sm:px-8 sm:pb-16 sm:pt-36">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            to="/employer/jobs"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-teal-300"
          >
            <ArrowLeft size={16} />
            Back to My Jobs
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
              <BriefcaseBusiness size={23} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                Employer Workspace
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {id ? "Edit Job" : "Post a New Job"}
              </h1>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            {id
              ? "Update your job details and keep your hiring opportunity up to date."
              : "Share a new opportunity with candidates by providing clear role and application details."}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-5 py-9 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-5xl">
          {fetching ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <LoaderCircle size={30} className="animate-spin text-teal-600" />
              <p className="mt-4 text-sm font-medium text-slate-600">
                Loading job details...
              </p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-100 px-5 py-6 sm:px-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <FileText size={19} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Job Information
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Add the key details candidates need to understand this role.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-9 px-5 py-7 sm:px-8 sm:py-8">
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
                  >
                    <Info size={18} className="mt-0.5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                {/* Basic details */}
                <div>
                  <SectionHeading
                    icon={BriefcaseBusiness}
                    title="Basic Details"
                    description="Start with the job title and where the role is based."
                  />

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <Field
                      label="Job Title"
                      required
                      placeholder="e.g. Frontend Developer"
                      value={form.title}
                      onChange={(value) => set("title", value)}
                    />
                    <Field
                      label="Location"
                      placeholder="e.g. Noida, Uttar Pradesh"
                      value={form.location}
                      onChange={(value) => set("location", value)}
                      icon={MapPin}
                    />
                    <Field
                      label="Experience"
                      placeholder="e.g. 0-2 years"
                      value={form.experience}
                      onChange={(value) => set("experience", value)}
                    />
                    <Field
                      label="Number of Openings"
                      type="number"
                      min="1"
                      required
                      value={form.openings}
                      onChange={(value) => set("openings", value)}
                    />
                  </div>
                </div>

                <Divider />

                {/* Employment details */}
                <div>
                  <SectionHeading
                    icon={Building2}
                    title="Employment Details"
                    description="Specify the working arrangement and employment type."
                  />

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <Select
                      label="Work Mode"
                      value={form.workMode}
                      onChange={(value) => set("workMode", value)}
                      options={[
                        ["onsite", "On-site"],
                        ["hybrid", "Hybrid"],
                        ["remote", "Remote"],
                      ]}
                    />
                    <Select
                      label="Employment Type"
                      value={form.employmentType}
                      onChange={(value) => set("employmentType", value)}
                      options={[
                        ["full-time", "Full-time"],
                        ["part-time", "Part-time"],
                        ["contract", "Contract"],
                        ["internship", "Internship"],
                        ["freelance", "Freelance"],
                      ]}
                    />
                  </div>
                </div>

                <Divider />

                {/* Skills */}
                <div>
                  <SectionHeading
                    icon={Code2}
                    title="Required Skills"
                    description="Add the skills and technologies relevant to this position."
                  />

                  <div className="mt-5">
                    <Field
                      label="Skills"
                      placeholder="React, Node.js, MongoDB"
                      value={form.skills}
                      onChange={(value) => set("skills", value)}
                      hint="Separate multiple skills with commas."
                    />
                  </div>
                </div>

                <Divider />

                {/* Salary */}
                <div>
                  <SectionHeading
                    icon={Wallet}
                    title="Salary Range"
                    description="Enter the compensation range for this opportunity."
                  />

                  <div className="mt-5 grid gap-5 md:grid-cols-3">
                    <Field
                      label="Minimum Salary (₹)"
                      type="number"
                      min="0"
                      placeholder="e.g. 300000"
                      value={form.salaryMin}
                      onChange={(value) => set("salaryMin", value)}
                    />
                    <Field
                      label="Maximum Salary (₹)"
                      type="number"
                      min="0"
                      placeholder="e.g. 600000"
                      value={form.salaryMax}
                      onChange={(value) => set("salaryMax", value)}
                    />
                    <Select
                      label="Salary Period"
                      value={form.salaryPeriod}
                      onChange={(value) => set("salaryPeriod", value)}
                      options={[
                        ["year", "Per year"],
                        ["month", "Per month"],
                        ["hour", "Per hour"],
                      ]}
                    />
                  </div>
                </div>

                <Divider />

                {/* Description and deadline */}
                <div>
                  <SectionHeading
                    icon={FileText}
                    title="Description & Deadline"
                    description="Explain the role and set the last date for applications."
                  />

                  <div className="mt-5 space-y-5">
                    <div>
                      <label
                        htmlFor="job-description"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Job Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="job-description"
                        required
                        rows={8}
                        value={form.description}
                        onChange={(event) =>
                          set("description", event.target.value)
                        }
                        placeholder="Describe the role, responsibilities, qualifications and requirements..."
                        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                      />
                      <p className="mt-2 text-xs text-slate-400">
                        Include responsibilities, required qualifications and
                        any other relevant information.
                      </p>
                    </div>

                    <div className="max-w-md">
                      <Field
                        label="Application Deadline"
                        type="date"
                        value={form.deadline}
                        onChange={(value) => set("deadline", value)}
                        icon={CalendarDays}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/80 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <p className="text-xs leading-5 text-slate-500">
                  Fields marked <span className="text-red-500">*</span> are
                  required.
                </p>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigate("/employer/dashboard")}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle size={17} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={17} />
                        {id ? "Update Job" : "Publish Job"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SectionHeading({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <Icon size={19} />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
  icon: Icon,
  ...props
}) {
  const id = props.id || `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
        {props.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}
        <input
          {...props}
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 ${
            Icon ? "pl-10" : ""
          }`}
        />
      </div>
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  const id = `select-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-slate-100" />;
}

export default PostJob;