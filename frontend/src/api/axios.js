import axios from "axios";

// Base URL points to our Express backend
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request Interceptor ────────────────────────────────────
// Automatically attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("umrah_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor ───────────────────────────────────
// Handle token expiry globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is expired or invalid, log out the user
    if (error.response?.status === 401) {
      localStorage.removeItem("umrah_token");
      localStorage.removeItem("umrah_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default API;
