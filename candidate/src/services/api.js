const API = (import.meta.env.VITE_API_URL || "https://merijob-backend.onrender.com").replace(/\/$/, "");
export { API };

export async function api(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API}${endpoint}`, { ...options, headers });
  let data = {};
  try { data = await response.json(); } catch {}
  if (!response.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
export default API;
