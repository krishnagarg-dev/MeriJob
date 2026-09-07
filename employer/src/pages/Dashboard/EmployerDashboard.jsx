import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

function EmployerDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", website: "", industry: "", location: "", companySize: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const load = async () => {
    if (!token || user?.role !== "employer") { navigate("/login"); return; }
    try {
      const [companyRes, jobsRes, appsRes] = await Promise.all([
        fetch(`${API}/api/company`, { headers }),
        fetch(`${API}/api/employer/jobs`, { headers }),
        fetch(`${API}/api/employer/applications`, { headers }),
      ]);
      const [companyData, jobsData, appsData] = await Promise.all([companyRes.json(), jobsRes.json(), appsRes.json()]);
      if (!companyRes.ok) throw new Error(companyData.message || "Unable to load company");
      setCompany(companyData.company);
      setJobs(jobsData.jobs || []);
      setApplications(appsData.applications || []);
      if (companyData.company) setForm(companyData.company);
    } catch (error) { setMessage(error.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const saveCompany = async (e) => {
    e.preventDefault(); setSaving(true); setMessage("");
    try {
      const response = await fetch(`${API}/api/company`, { method: "POST", headers, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Failed to save company");
      setCompany(data.company); setMessage("Company profile saved successfully.");
    } catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job posting?")) return;
    const response = await fetch(`${API}/api/employer/jobs/${id}`, { method: "DELETE", headers });
    const data = await response.json();
    if (data.success) setJobs((current) => current.filter((job) => job._id !== id));
  };

  return <>
    <Navbar />
    <section className="bg-black px-6 py-12 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm text-gray-400">Employer Portal</p><h1 className="mt-2 text-3xl font-bold">Hiring Dashboard</h1><p className="mt-2 text-sm text-gray-400">Manage your company, jobs and candidates from one place.</p></div></section>
    <section className="px-6 py-12"><div className="mx-auto max-w-6xl">
      {message && <div className="mb-6 rounded-md bg-[#ebf5f4] px-4 py-3 text-sm text-[#267d73]">{message}</div>}
      {loading ? <div className="py-20 text-center text-gray-500">Loading employer portal...</div> : <>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6"><p className="text-xs text-gray-500">Total Jobs</p><p className="mt-2 text-3xl font-bold">{jobs.length}</p></div>
          <div className="rounded-lg border border-gray-200 bg-white p-6"><p className="text-xs text-gray-500">Published</p><p className="mt-2 text-3xl font-bold">{jobs.filter(j => j.status === "published").length}</p></div>
          <div className="rounded-lg border border-gray-200 bg-white p-6"><p className="text-xs text-gray-500">Applications</p><p className="mt-2 text-3xl font-bold">{applications.length}</p></div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-bold">Your Job Posts</h2><p className="mt-1 text-xs text-gray-500">Create and manage opportunities on MeriJob.</p></div><Link to="/employer/jobs/new" className="rounded-md bg-[#309689] px-4 py-2.5 text-xs font-medium text-white">+ Post a Job</Link></div>
            <div className="space-y-4">
              {jobs.length === 0 ? <div className="rounded-lg border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">No jobs posted yet. Create your first hiring opportunity.</div> : jobs.map(job => <div key={job._id} className="rounded-lg border border-gray-200 bg-white p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold text-gray-900">{job.title}</h3><p className="mt-1 text-xs text-gray-500">{job.location || "India"} · {job.workMode} · {job.employmentType}</p></div><span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] capitalize text-gray-600">{job.status}</span></div><div className="mt-4 flex gap-2"><Link to={`/employer/jobs/${job._id}/edit`} className="rounded-md border px-3 py-2 text-xs">Edit</Link><button onClick={() => deleteJob(job._id)} className="rounded-md border px-3 py-2 text-xs text-red-600">Delete</button></div></div>)}
            </div>
          </div>
          <aside className="rounded-lg border border-gray-200 bg-white p-6"><h2 className="text-base font-bold">Company Profile</h2><form onSubmit={saveCompany} className="mt-5 space-y-4">{[["name","Company Name"],["website","Website"],["industry","Industry"],["location","Location"],["companySize","Company Size"]].map(([key,label]) => <div key={key}><label className="mb-1.5 block text-xs font-medium text-gray-700">{label}</label><input value={form[key] || ""} onChange={e => setForm({...form,[key]:e.target.value})} className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#309689]" /></div>)}<div><label className="mb-1.5 block text-xs font-medium text-gray-700">Description</label><textarea rows="4" value={form.description || ""} onChange={e => setForm({...form,description:e.target.value})} className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#309689]" /></div><button disabled={saving} className="w-full rounded-md bg-[#309689] py-3 text-xs font-medium text-white">{saving ? "Saving..." : "Save Company Profile"}</button></form>{company && <p className="mt-4 text-[11px] text-gray-500">Company status: <span className="font-medium capitalize">{company.status}</span></p>}</aside>
        </div>
      </>}
    </div></section><Footer /></>;
}
export default EmployerDashboard;
