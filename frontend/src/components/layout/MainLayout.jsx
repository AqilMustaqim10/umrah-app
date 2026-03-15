import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F5F0" }}>
      <Navbar />

      {/* Page content */}
      <main className="max-w-2xl mx-auto px-4 py-6">{children}</main>

      {/* Bottom nav for mobile */}
      <BottomNav />
    </div>
  );
};

// ── Mobile bottom navigation bar ──────────────────────────
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const tabs = [
    { path: "/dashboard", icon: "🏠", label: "Home" },
    { path: "/umrah-checklist", icon: "🕋", label: "Umrah" },
    { path: "/packing-checklist", icon: "🎒", label: "Packing" },
    { path: "/profile", icon: "👤", label: "Profile" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(27,67,50,0.08)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className="flex flex-col items-center justify-center
                       gap-0.5 flex-1 py-2 rounded-xl transition-all"
            style={{
              color: isActive(tab.path) ? "#1B4332" : "#9CA3AF",
            }}
          >
            <span
              className="text-2xl transition-transform"
              style={{
                transform: isActive(tab.path) ? "scale(1.15)" : "scale(1)",
              }}
            >
              {tab.icon}
            </span>
            <span
              className="text-xs font-medium"
              style={{
                color: isActive(tab.path) ? "#1B4332" : "#9CA3AF",
                fontWeight: isActive(tab.path) ? 700 : 400,
              }}
            >
              {tab.label}
            </span>
            {isActive(tab.path) && (
              <div
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: "#1B4332" }}
              />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MainLayout;
