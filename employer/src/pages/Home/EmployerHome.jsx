
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Users,
  Building2,
  CheckCircle2,
  UserPlus,
  FileText,
  Search,
  Sparkles,
  ShieldCheck,
  ChartNoAxesCombined,
  ChevronRight,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Publish Job Openings",
    description:
      "Create detailed job listings with role requirements, skills, salary, location and experience.",
    tag: "Job Management",
  },
  {
    icon: Users,
    title: "Manage Applications",
    description:
      "Keep candidate applications organized and review applicants throughout your hiring process.",
    tag: "Candidate Tracking",
  },
  {
    icon: Building2,
    title: "Build Your Company Profile",
    description:
      "Showcase your organization with company details, industry, location and website information.",
    tag: "Company Branding",
  },
];

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Register as an employer and set up your company profile to get started.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Post Your Jobs",
    description:
      "Add job details, responsibilities, required skills and other important information.",
  },
  {
    number: "03",
    icon: Search,
    title: "Review Applications",
    description:
      "Explore candidate applications and manage your recruitment process in one place.",
  },
];

function EmployerHome() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950 px-5 pb-24 pt-36 text-white sm:px-8 sm:pb-28 sm:pt-40 lg:pb-32 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-teal-500/15 blur-[110px]" />
          <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-xs font-semibold tracking-wide text-teal-300 sm:text-sm">
              <Sparkles size={15} />
              <span>Your Hiring Journey Starts Here</span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Find the people
              <span className="mt-2 block bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                who move you
                <br className="hidden sm:block" /> forward.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg lg:mx-0">
              Bring your hiring process together. Publish opportunities,
              organize applications and manage your company's recruitment
              journey with MeriJob.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-teal-950/30 transition hover:-translate-y-0.5 hover:bg-teal-400"
              >
                Start Hiring
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Employer Login
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-400 sm:text-sm lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-400" />
                Organized hiring
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-400" />
                Company-focused
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-400" />
                Simple workflow
              </span>
            </div>
          </div>

          {/* Decorative dashboard preview */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2rem] bg-teal-400/10 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5">
              <div className="rounded-2xl border border-white/10 bg-slate-900/95 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Employer workspace
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">
                      Hiring Overview
                    </h2>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                    <ChartNoAxesCombined size={21} />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Job postings
                      </span>
                      <BriefcaseBusiness
                        size={16}
                        className="text-teal-300"
                      />
                    </div>
                    <p className="mt-3 text-2xl font-bold text-white">Jobs</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Manage open roles
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Applications
                      </span>
                      <Users size={16} className="text-cyan-300" />
                    </div>
                    <p className="mt-3 text-2xl font-bold text-white">
                      Candidates
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Review applicants
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Recruitment workflow
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Keep your hiring activities organized
                      </p>
                    </div>
                    <span className="rounded-lg bg-teal-400/10 px-2.5 py-1 text-[10px] font-semibold text-teal-300">
                      Workspace
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      { icon: Building2, label: "Company profile" },
                      { icon: FileText, label: "Publish a job opening" },
                      { icon: Users, label: "Review applications" },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-400/10 text-teal-300">
                            <Icon size={16} />
                          </div>
                          <span className="flex-1 text-xs font-medium text-slate-300 sm:text-sm">
                            {item.label}
                          </span>
                          <CheckCircle2
                            size={16}
                            className={
                              index === 0
                                ? "text-teal-300"
                                : "text-slate-600"
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/95 p-3 shadow-xl sm:flex md:-left-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  One hiring workspace
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Jobs and applications
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-teal-700">
              <Sparkles size={14} />
              Made for employers
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Everything you need to
              <span className="text-teal-600"> hire with clarity.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
              From setting up your company to managing candidate applications,
              keep essential hiring activities in one organized workspace.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-8"
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-teal-50/70 transition-colors group-hover:bg-teal-100/70" />
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-500 group-hover:text-white">
                      <Icon size={25} strokeWidth={1.8} />
                    </div>
                    <p className="mt-7 text-xs font-bold uppercase tracking-wider text-teal-700">
                      {feature.tag}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-700 transition group-hover:text-teal-700">
                      Built for your workflow
                      <ChevronRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
              Simple process
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Your hiring journey,
              <br className="hidden sm:block" /> step by step.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
              Get your employer workspace ready and organize your recruitment
              process in a few clear steps.
            </p>
          </div>

          <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden border-t-2 border-dashed border-teal-200 md:block" />

            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-100 bg-white text-teal-700 shadow-lg shadow-teal-900/5">
                    <Icon size={25} strokeWidth={1.8} />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white ring-4 ring-slate-50">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-center shadow-2xl shadow-slate-900/10 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-32 h-72 w-72 rounded-full bg-teal-500/20 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-36 -right-16 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/10 text-teal-300">
              <BriefcaseBusiness size={25} />
            </div>
            <h2 className="mt-7 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to build your team?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Set up your employer account, create your company profile and
              start organizing your hiring process with MeriJob.
            </p>
            <Link
              to="/register"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-teal-400"
            >
              Create Employer Account
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EmployerHome;