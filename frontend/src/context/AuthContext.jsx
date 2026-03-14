import { useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../hooks/useAuth";

// ─────────────────────────────────────────────────────────
// AuthProvider — wraps the whole app
// Provides auth state to every component
// ─────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("umrah_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("umrah_token");
  });

  const [loading, setLoading] = useState(false);

  // ── Login function ─────────────────────────────────────
  const login = async (email, password) => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const { user, token } = res.data;

      setUser(user);
      setToken(token);

      localStorage.setItem("umrah_token", token);
      localStorage.setItem("umrah_user", JSON.stringify(user));

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // ── Logout function ────────────────────────────────────
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("umrah_token");
    localStorage.removeItem("umrah_user");
  };

  // ── Update user data (for profile edits) ──────────────
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("umrah_user", JSON.stringify(updatedUser));
  };

  // ── Check if user is logged in ─────────────────────────
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
