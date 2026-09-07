import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { API } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function EmployerRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const submit = async (e) => {
    e.preventDefault(); setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), password: form.password, role: "employer" }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Registration failed");
      if (data.token) { login(data.token, data.user, false); navigate("/setup"); } else navigate("/login");
    } catch (err) { setError(err.message || "Unable to register"); } finally { setLoading(false); }
  };
  return <><Navbar /><main className="min-h-screen bg-[#ebf5f4] px-6 py-28"><div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-sm"><div className="text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#309689] text-xl text-white">💼</div><h1 className="mt-5 text-2xl font-bold">Create Employer Account</h1><p className="mt-2 text-sm text-gray-500">Join MeriJob and start hiring talent.</p></div>{error&&<div className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}<form onSubmit={submit} className="mt-8 space-y-5"><Field label="Full Name" value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Your name" required/><Field label="Email Address" type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="you@company.com" required/><Field label="Password" type="password" value={form.password} onChange={e=>set("password",e.target.value)} placeholder="Minimum 6 characters" required/><Field label="Confirm Password" type="password" value={form.confirmPassword} onChange={e=>set("confirmPassword",e.target.value)} placeholder="Repeat password" required/><button disabled={loading} className="w-full rounded-md bg-[#309689] py-3 text-sm font-medium text-white hover:bg-[#267d73] disabled:opacity-60">{loading?"Creating account...":"Create Employer Account"}</button></form><p className="mt-7 text-center text-xs text-gray-500">Already have an account? <Link to="/login" className="font-medium text-[#309689]">Login</Link></p></div></main><Footer /></>;
}
function Field({ label, ...props }) { return <div><label className="mb-2 block text-xs font-medium text-gray-700">{label}</label><input {...props} className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689] focus:ring-1 focus:ring-[#309689]" /></div>; }
export default EmployerRegister;
