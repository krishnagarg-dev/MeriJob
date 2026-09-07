const API =
  import.meta.env.VITE_API_URL ||
  "https://merijob-backend.onrender.com";

export { API };

export const api = async (endpoint, options = {}) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("employerToken");

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
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export default API;