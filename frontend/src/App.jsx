import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import UmrahChecklist from "./pages/UmrahChecklist";
import PackingChecklist from "./pages/PackingChecklist";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Toast notifications — available everywhere */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1B4332",
              color: "#ffffff",
              borderRadius: "12px",
              padding: "12px 20px",
            },
            success: {
              iconTheme: {
                primary: "#D4A017",
                secondary: "#ffffff",
              },
            },
            error: {
              style: {
                background: "#7F1D1D",
                color: "#ffffff",
              },
            },
          }}
        />

        <Routes>
          {/* ── Public Routes ──────────────────────────── */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* ── Protected Routes ───────────────────────── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/umrah-checklist"
            element={
              <ProtectedRoute>
                <UmrahChecklist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/packing-checklist"
            element={
              <ProtectedRoute>
                <PackingChecklist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ── Default redirect ───────────────────────── */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* ── 404 catch-all ──────────────────────────── */}
          <Route
            path="*"
            element={
              <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: "#F8F5F0" }}
              >
                <div className="text-center">
                  <div className="text-8xl mb-4">🕋</div>
                  <h1
                    className="text-3xl font-bold mb-2"
                    style={{ color: "#1B4332" }}
                  >
                    Page Not Found
                  </h1>
                  <p style={{ color: "#40916C" }}>This page doesn't exist.</p>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
