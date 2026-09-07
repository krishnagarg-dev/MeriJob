import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { API } from "../../services/api";

const demoJobs = [
  { _id: "demo-1", title: "Frontend Developer", location: "Noida", workMode: "Hybrid", employmentType: "Full Time", status: "published" },
  { _id: "demo-2", title: "React.js Developer", location: "Delhi", workMode: "Remote", employmentType: "Full Time", status: "published" },
];

function EmployerJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!token || user?.role !== "employer") { navigate("/login", { replace: true }); return; }
    try {
      const response = await fetch(`${API}/api/employer/jobs`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load jobs");
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.message || "Unable to load jobs");
      setJobs([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadJobs(); }, []);

  const deleteJob = async (id) => {
    if (String(id).startsWith("demo-")) { setJobs((current) => current.filter((job) => job._id !== id)); return; }
    if (!window.confirm("Delete this job posting?")) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API}/api/employer/jobs/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to delete job");
      setJobs((current) => current.filter((job) => job._id !== id));
    } catch (err) { setError(err.message); }
  };

  return <>
    <Navbar />
    <main className="min-h-screen bg-white">
      <section className="bg-black px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl"><p className="text-sm text-gray-400">Employer Portal</p><h1 className="mt-2 text-3xl font-bold">Manage Jobs</h1><p className="mt-2 text-sm text-gray-400">Create, edit and manage your job postings.</p></div>
      </section>
      <section className="px-6 py-12"><div className="mx-auto max-w-6xl">
        {error && <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
        <div className="mb-8 flex items-center justify-between gap-4"><div><h2 className="text-xl font-bold text-gray-900">Your Job Posts</h2><p className="mt-1 text-sm text-gray-500">Manage all your hiring opportunities.</p></div><Link to="/employer/jobs/new" className="rounded-md bg-[#309689] px-5 py-3 text-sm font-medium text-white hover:bg-[#277d74]">+ Post a Job</Link></div>
        {loading ? <div className="py-20 text-center text-gray-500">Loading jobs...</div> : jobs.length === 0 ? <div className="rounded-lg border border-gray-200 p-12 text-center text-sm text-gray-500">No jobs posted yet. Create your first hiring opportunity.</div> : <div className="space-y-4">{jobs.map((job) => <div key={job._id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h3 className="text-lg font-semibold text-gray-900">{job.title}</h3><p className="mt-2 text-sm text-gray-500">{job.location || "India"} · {job.workMode || "On-site"} · {job.employmentType || "Full Time"}</p></div><span className="rounded-full bg-[#ebf5f4] px-3 py-1 text-xs font-medium capitalize text-[#267d73]">{job.status || "pending"}</span></div><div className="mt-5 flex gap-3"><Link to={`/employer/jobs/${job._id}/edit`} className="rounded-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">Edit</Link><button onClick={() => deleteJob(job._id)} className="rounded-md border border-red-200 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50">Delete</button></div></div>)}</div>}
      </div></section>
    </main>
    <Footer />
  </>;
}
export default EmployerJobs;
