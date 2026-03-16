import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PWAInstallBanner from "./components/PWAInstallBanner";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import UmrahChecklist from "./pages/UmrahChecklist";
import PackingChecklist from "./pages/PackingChecklist";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// ── Animated routes wrapper ────────────────────────────────
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ── Public Routes ────────────────────────────── */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ── Protected Routes ─────────────────────────── */}
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

        {/* ── Redirects ────────────────────────────────── */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ── 404 ─────────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

// ── Main App ───────────────────────────────────────────────
function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Show splash screen for 2 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Scroll to top on navigation */}
        <ScrollToTop />

        {/* Toast notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1B4332",
              color: "#ffffff",
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow: "0 8px 24px rgba(27,67,50,0.25)",
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

        {/* Splash screen */}
        <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>

        {/* PWA Install Banner */}
        <PWAInstallBanner />

        {/* Animated page routes */}
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
