
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  RefreshCw,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
  UserRound,
  Mail,
  CheckCircle2,
  Clock3,
  XCircle,
  UserCheck,
  Filter,
  LoaderCircle,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../services/api";

const statusOptions = [
  { value: "applied", label: "Applied" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview" },
  { value: "selected", label: "Selected" },
  { value: "rejected", label: "Rejected" },
];

const statusStyles = {
  applied: "bg-blue-50 text-blue-700 ring-blue-600/10",
  shortlisted: "bg-violet-50 text-violet-700 ring-violet-600/10",
  interview: "bg-amber-50 text-amber-700 ring-amber-600/10",
  selected: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  rejected: "bg-red-50 text-red-700 ring-red-600/10",
};

const statusIcons = {
  applied: Clock3,
  shortlisted: UserCheck,
  interview: CalendarDays,
  selected: CheckCircle2,
  rejected: XCircle,
};

function EmployerApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api("/api/employer/applications");
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Employer applications error:", err);

      if (err.status === 401 || err.status === 403) {
        navigate("/login", { replace: true });
        return;
      }

      setError(err.message || "Unable to load applications");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await api("/api/employer/applications");

        if (active) {
          setApplications(data.applications || []);
        }
      } catch (err) {
        console.error("Employer applications error:", err);

        if (err.status === 401 || err.status === 403) {
          navigate("/login", { replace: true });
          return;
        }

        if (active) {
          setError(err.message || "Unable to load applications");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [navigate]);

  const updateStatus = async (id, status) => {
    try {
      setError("");
      setUpdatingId(id);

      const data = await api(`/api/employer/applications/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setApplications((current) =>
        current.map((application) =>
          application._id === id
            ? {
                ...application,
                status: data.application?.status || status,
              }
            : application
        )
      );
    } catch (err) {
      console.error("Update application error:", err);

      if (err.status === 401 || err.status === 403) {
        navigate("/login", { replace: true });
        return;
      }

      setError(err.message || "Unable to update application");
    } finally {
      setUpdatingId(null);
    }
  };

  const counts = useMemo(() => {
    const result = {
      total: applications.length,
      applied: 0,
      shortlisted: 0,
      interview: 0,
      selected: 0,
      rejected: 0,
    };

    applications.forEach((application) => {
      const status = (application.status || "applied").toLowerCase();
      if (Object.prototype.hasOwnProperty.call(result, status)) {
        result[status] += 1;
      }
    });

    return result;
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const status = (application.status || "applied").toLowerCase();
      const name = application.user?.name || "Candidate";
      const email = application.user?.email || "";
      const jobTitle = application.jobTitle || "Job";

      const matchesSearch = [name, email, jobTitle]
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesStatus =
        statusFilter === "all" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const summaryCards = [
    {
      label: "Total Applications",
      value: counts.total,
      icon: Users,
      color: "bg-teal-50 text-teal-700",
    },
    {
      label: "Shortlisted",
      value: counts.shortlisted,
      icon: UserCheck,
      color: "bg-violet-50 text-violet-700",
    },
    {
      label: "Interviews",
      value: counts.interview,
      icon: CalendarDays,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Selected",
      value: counts.selected,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-teal-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 text-xs font-semibold text-teal-300">
              <Users size={14} />
              Employer Workspace
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Candidate <span className="text-teal-400">Applications</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Review applicants, track their progress and manage your hiring
              pipeline from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={loadApplications}
            disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-300/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh Applications
          </button>
        </div>
      </section>

      <section className="px-5 py-9 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Summary */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {card.label}
                      </p>
                      <p className="mt-2 text-3xl font-bold tabular-nums text-slate-900">
                        {loading ? "—" : card.value}
                      </p>
                    </div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}
                    >
                      <Icon size={22} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Applications panel */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-5 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  All Applicants
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review candidate details and update application status.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search candidates..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 sm:w-60"
                  />
                </div>

                <div className="relative">
                  <Filter
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 sm:w-48"
                  >
                    <option value="all">All statuses</option>
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="mx-5 mt-5 flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 sm:mx-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>{error}</span>
                <button
                  type="button"
                  onClick={loadApplications}
                  className="shrink-0 font-semibold underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            )}

            {loading ? (
              <div className="space-y-4 p-5 sm:p-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-xl border border-slate-100 p-5"
                  >
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-100" />
                      <div className="flex-1">
                        <div className="h-4 w-1/3 rounded bg-slate-100" />
                        <div className="mt-3 h-3 w-2/3 rounded bg-slate-100" />
                        <div className="mt-5 h-8 w-32 rounded-lg bg-slate-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="px-5 py-16 text-center sm:px-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  {search || statusFilter !== "all" ? (
                    <Search size={27} />
                  ) : (
                    <Users size={27} />
                  )}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {search || statusFilter !== "all"
                    ? "No matching applications"
                    : "No applications yet"}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {search || statusFilter !== "all"
                    ? "Try changing your search term or status filter."
                    : "When candidates apply to your jobs, their applications will appear here."}
                </p>
                {(search || statusFilter !== "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("all");
                    }}
                    className="mt-6 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredApplications.map((application) => {
                  const status = (
                    application.status || "applied"
                  ).toLowerCase();
                  const StatusIcon = statusIcons[status] || Clock3;
                  const statusClass =
                    statusStyles[status] ||
                    "bg-slate-100 text-slate-600 ring-slate-500/10";
                  const candidateName =
                    application.user?.name || "Candidate";
                  const initials = candidateName
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase();

                  return (
                    <article
                      key={application._id}
                      className="p-5 transition hover:bg-slate-50/70 sm:p-6"
                    >
                      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex min-w-0 gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700 ring-1 ring-teal-100">
                            {initials || <UserRound size={20} />}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="break-words text-base font-bold text-slate-900 sm:text-lg">
                                {candidateName}
                              </h3>
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ring-inset ${statusClass}`}
                              >
                                <StatusIcon size={13} />
                                {status}
                              </span>
                            </div>

                            <div className="mt-2 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                              <span className="inline-flex min-w-0 items-center gap-1.5">
                                <Mail
                                  size={14}
                                  className="shrink-0 text-slate-400"
                                />
                                <span className="break-all">
                                  {application.user?.email ||
                                    "Email unavailable"}
                                </span>
                              </span>

                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays
                                  size={14}
                                  className="shrink-0 text-slate-400"
                                />
                                {application.createdAt
                                  ? new Date(
                                      application.createdAt
                                    ).toLocaleDateString("en-IN", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "Date unavailable"}
                              </span>
                            </div>

                            <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                              <BriefcaseBusiness
                                size={14}
                                className="shrink-0 text-teal-700"
                              />
                              <span className="truncate">
                                Applied for: {application.jobTitle || "Job"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center xl:justify-end">
                          <label
                            htmlFor={`status-${application._id}`}
                            className="text-xs font-semibold text-slate-500"
                          >
                            Update status
                          </label>
                          <div className="relative">
                            <select
                              id={`status-${application._id}`}
                              value={status}
                              disabled={updatingId === application._id}
                              onChange={(event) =>
                                updateStatus(
                                  application._id,
                                  event.target.value
                                )
                              }
                              className="w-full min-w-44 appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-9 text-sm font-semibold text-slate-700 outline-none transition hover:border-teal-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                            >
                              {statusOptions.map((option) => (
                                <option
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </option>
                              ))}
                              {!statusOptions.some(
                                (option) => option.value === status
                              ) && <option value={status}>{status}</option>}
                            </select>
                            {updatingId === application._id ? (
                              <LoaderCircle
                                size={15}
                                className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-teal-600"
                              />
                            ) : (
                              <ArrowUpRight
                                size={15}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-45 text-slate-400"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {!loading && filteredApplications.length > 0 && (
              <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3.5 sm:px-6">
                <p className="text-xs font-medium text-slate-500">
                  Showing{" "}
                  <span className="font-bold text-slate-700">
                    {filteredApplications.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-700">
                    {applications.length}
                  </span>{" "}
                  applications
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EmployerApplications;