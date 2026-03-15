import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", label: "Home", icon: "🏠" },
    { path: "/umrah-checklist", label: "Umrah", icon: "🕋" },
    { path: "/packing-checklist", label: "Packing", icon: "🎒" },
    { path: "/profile", label: "Profile", icon: "👤" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── Desktop / Mobile Top Navbar ───────────────── */}
      <nav
        className="sticky top-0 z-40 w-full"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(27,67,50,0.08)",
          boxShadow: "0 1px 12px rgba(27,67,50,0.06)",
        }}
      >
        <div
          className="max-w-2xl mx-auto px-4 h-16
                        flex items-center justify-between"
        >
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🕋</span>
            <span
              className="font-bold text-base hidden sm:block"
              style={{ color: "#1B4332" }}
            >
              Umrah Companion
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-xl text-sm
                           font-medium transition-all duration-200"
                style={{
                  backgroundColor: isActive(link.path)
                    ? "rgba(27,67,50,0.08)"
                    : "transparent",
                  color: isActive(link.path) ? "#1B4332" : "#6B7280",
                }}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>

          {/* Right side — user + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center
                           justify-center text-sm font-bold text-white"
                style={{ backgroundColor: "#1B4332" }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span
                className="text-sm font-medium hidden md:block"
                style={{ color: "#374151" }}
              >
                {user?.name?.split(" ")[0]}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5
                         px-3 py-1.5 rounded-xl text-xs font-semibold
                         transition-all duration-200 hover:opacity-80"
              style={{
                backgroundColor: "rgba(27,67,50,0.08)",
                color: "#1B4332",
              }}
            >
              Logout
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden w-9 h-9 flex flex-col items-center
                         justify-center gap-1.5 rounded-xl"
              style={{ backgroundColor: "rgba(27,67,50,0.08)" }}
            >
              <span
                className="w-4 h-0.5 rounded transition-all"
                style={{ backgroundColor: "#1B4332" }}
              />
              <span
                className="w-4 h-0.5 rounded transition-all"
                style={{ backgroundColor: "#1B4332" }}
              />
              <span
                className="w-4 h-0.5 rounded transition-all"
                style={{ backgroundColor: "#1B4332" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Dropdown Menu ───────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden fixed top-16 left-0 right-0 z-30
                       mx-4 mt-2 rounded-2xl overflow-hidden shadow-xl"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(27,67,50,0.1)",
            }}
          >
            {/* User info */}
            <div
              className="flex items-center gap-3 px-4 py-4"
              style={{
                background: "linear-gradient(135deg,#1B4332,#40916C)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center
                           justify-center text-base font-bold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{user?.name}</p>
                <p className="text-green-200 text-xs">{user?.email}</p>
              </div>
            </div>

            {/* Nav links */}
            <div className="p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3
                             rounded-xl mb-1 transition-all"
                  style={{
                    backgroundColor: isActive(link.path)
                      ? "rgba(27,67,50,0.08)"
                      : "transparent",
                    color: isActive(link.path) ? "#1B4332" : "#374151",
                    fontWeight: isActive(link.path) ? 600 : 400,
                  }}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="text-sm">{link.label}</span>
                  {isActive(link.path) && (
                    <span
                      className="ml-auto text-xs"
                      style={{ color: "#40916C" }}
                    >
                      ●
                    </span>
                  )}
                </Link>
              ))}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3
                           rounded-xl mt-1 transition-all"
                style={{
                  backgroundColor: "#FEF2F2",
                  color: "#B91C1C",
                }}
              >
                <span className="text-xl">🚪</span>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="sm:hidden fixed inset-0 z-20"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
