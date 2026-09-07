const API = (
  import.meta.env.VITE_API_URL || "https://merijob-backend.onrender.com"
).replace(/\/$/, "");

export { API };

export const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("employerToken");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API}${endpoint}`, {
    ...options,
    headers,
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.status = response.status;
    throw error;
  }

  return data;
};

export default API;
