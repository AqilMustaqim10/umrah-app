import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import API from "../api/axios";
import useAuth from "../hooks/useAuth";
import MainLayout from "../components/layout/MainLayout";

// ── Format date for display ────────────────────────────────
const formatDate = (dateString) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// ── Format date for input[type=date] ──────────────────────
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
};

// ── Avatar component ───────────────────────────────────────
const Avatar = ({ name, size = "lg" }) => {
  const initial = name?.charAt(0).toUpperCase() || "?";
  const sizes = {
    lg: "w-24 h-24 text-3xl",
    sm: "w-10 h-10 text-base",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center
                 justify-center font-black text-white shadow-lg`}
      style={{
        background: "linear-gradient(135deg, #1B4332, #40916C)",
      }}
    >
      {initial}
    </div>
  );
};

// ── Info row component ─────────────────────────────────────
const InfoRow = ({ icon, label, value, placeholder }) => (
  <div
    className="flex items-center gap-3 py-3"
    style={{ borderBottom: "1px solid #F3F4F6" }}
  >
    <span className="text-lg w-6 text-center shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium" style={{ color: "#9CA3AF" }}>
        {label}
      </p>
      <p
        className="text-sm font-semibold mt-0.5 truncate"
        style={{ color: value ? "#1F2937" : "#D1D5DB" }}
      >
        {value || placeholder}
      </p>
    </div>
  </div>
);

// ── Progress mini bar ──────────────────────────────────────
const MiniProgress = ({ label, icon, completed, total, color }) => {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{icon}</span>
          <span className="text-xs font-semibold" style={{ color: "#374151" }}>
            {label}
          </span>
        </div>
        <span className="text-xs font-bold" style={{ color }}>
          {completed}/{total} · {pct}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "#F3F4F6" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Main Profile Page
// ─────────────────────────────────────────────────────────
const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const [umrahProgress, setUmrahProgress] = useState({
    completed: 0,
    total: 10,
  });
  const [packingProgress, setPackingProgress] = useState({
    completed: 0,
    total: 40,
  });

  // ── Profile form ───────────────────────────────────────
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm();

  // ── Password form ──────────────────────────────────────
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    watch,
    formState: { errors: passwordErrors },
  } = useForm();

  const newPassword = watch("newPassword", "");

  // ── Fetch progress on mount ────────────────────────────
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const [umrahRes, packingRes] = await Promise.all([
          API.get("/checklist/umrah/progress"),
          API.get("/checklist/packing/progress"),
        ]);
        if (umrahRes.data?.progress) {
          setUmrahProgress(umrahRes.data.progress);
        }
        if (packingRes.data?.progress) {
          setPackingProgress(packingRes.data.progress);
        }
      } catch {
        // Silently fail — progress is non-critical
      }
    };
    fetchProgress();
  }, []);

  // ── Pre-fill form when editing starts ─────────────────
  const startEditing = () => {
    resetProfile({
      name: user?.name || "",
      phone: user?.phone || "",
      country: user?.country || "",
      umrahDate: formatDateForInput(user?.umrahDate),
    });
    setIsEditing(true);
  };

  // ── Save profile ───────────────────────────────────────
  const onProfileSubmit = async (data) => {
    setSavingProfile(true);
    try {
      const res = await API.put("/user/profile", {
        name: data.name,
        phone: data.phone,
        country: data.country,
        umrahDate: data.umrahDate || "",
      });

      updateUser(res.data.user);
      setIsEditing(false);
      toast.success("Profile updated successfully! ✅");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  // ── Change password ────────────────────────────────────
  const onPasswordSubmit = async (data) => {
    setChangingPassword(true);
    try {
      await API.put("/user/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      resetPassword();
      setShowPasswordSection(false);
      toast.success("Password changed successfully! 🔐");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  // ── Logout ─────────────────────────────────────────────
  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  // ── Input style helper ─────────────────────────────────
  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "10px 14px",
    borderRadius: "12px",
    border: hasError ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
    backgroundColor: hasError ? "#FEF2F2" : "#F9FAFB",
    color: "#1F2937",
    fontSize: "14px",
    outline: "none",
  });

  return (
    <MainLayout>
      <div className="space-y-5" style={{ paddingBottom: "6rem" }}>
        {/* ── Profile hero ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center pt-4 pb-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar name={user?.name} size="lg" />
          </motion.div>

          <h1 className="text-xl font-bold mt-4" style={{ color: "#1B4332" }}>
            {user?.name}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
            {user?.email}
          </p>
          <p
            className="text-xs mt-1 px-3 py-1 rounded-full"
            style={{
              backgroundColor: "#F0FDF4",
              color: "#40916C",
            }}
          >
            Member since{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-MY", {
                  month: "long",
                  year: "numeric",
                })
              : "recently"}
          </p>
        </motion.div>

        {/* ── Account details card ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden shadow-sm"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(27,67,50,0.07)",
          }}
        >
          {/* Card header */}
          <div
            className="flex items-center justify-between
                       px-5 py-4"
            style={{ borderBottom: "1px solid #F3F4F6" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">📋</span>
              <span className="font-bold text-sm" style={{ color: "#1B4332" }}>
                Account Details
              </span>
            </div>

            {!isEditing && (
              <button
                onClick={startEditing}
                className="flex items-center gap-1.5 px-3 py-1.5
                           rounded-xl text-xs font-semibold
                           transition-all"
                style={{
                  backgroundColor: "#F0FDF4",
                  color: "#1B4332",
                }}
              >
                ✏️ Edit
              </button>
            )}
          </div>

          {/* ── View mode ─────────────────────────────── */}
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div
                key="view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-5 py-2"
              >
                <InfoRow
                  icon="👤"
                  label="Full Name"
                  value={user?.name}
                  placeholder="Not set"
                />
                <InfoRow
                  icon="✉️"
                  label="Email"
                  value={user?.email}
                  placeholder="Not set"
                />
                <InfoRow
                  icon="📱"
                  label="Phone"
                  value={user?.phone}
                  placeholder="Tap Edit to add"
                />
                <InfoRow
                  icon="🌍"
                  label="Country"
                  value={user?.country}
                  placeholder="Tap Edit to add"
                />
                <InfoRow
                  icon="📅"
                  label="Umrah Date"
                  value={formatDate(user?.umrahDate)}
                  placeholder="Tap Edit to set"
                />
              </motion.div>
            ) : (
              // ── Edit mode ────────────────────────────
              <motion.div
                key="edit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5"
              >
                <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
                  {/* Name */}
                  <div className="mb-4">
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#374151" }}
                    >
                      Full Name
                    </label>
                    <input
                      style={inputStyle(profileErrors.name)}
                      placeholder="Your full name"
                      {...registerProfile("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name too short",
                        },
                      })}
                    />
                    {profileErrors.name && (
                      <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                        ⚠️ {profileErrors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#374151" }}
                    >
                      Phone Number
                    </label>
                    <input
                      style={inputStyle(false)}
                      placeholder="+60123456789"
                      {...registerProfile("phone")}
                    />
                  </div>

                  {/* Country */}
                  <div className="mb-4">
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#374151" }}
                    >
                      Country
                    </label>
                    <input
                      style={inputStyle(false)}
                      placeholder="Malaysia"
                      {...registerProfile("country")}
                    />
                  </div>

                  {/* Umrah Date */}
                  <div className="mb-6">
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#374151" }}
                    >
                      📅 Umrah Date (optional)
                    </label>
                    <input
                      type="date"
                      style={inputStyle(false)}
                      {...registerProfile("umrahDate")}
                    />
                    <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
                      This shows the countdown on your Dashboard
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-3 rounded-xl text-sm
                                 font-semibold border transition-all"
                      style={{
                        borderColor: "#E5E7EB",
                        color: "#6B7280",
                        backgroundColor: "transparent",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="flex-1 py-3 rounded-xl text-sm
                                 font-semibold text-white transition-all"
                      style={{
                        background: savingProfile
                          ? "#9CA3AF"
                          : "linear-gradient(135deg,#1B4332,#40916C)",
                      }}
                    >
                      {savingProfile ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Progress card ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-5 shadow-sm"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(27,67,50,0.07)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📊</span>
            <span className="font-bold text-sm" style={{ color: "#1B4332" }}>
              My Progress
            </span>
          </div>

          <MiniProgress
            label="Umrah Steps"
            icon="🕋"
            completed={umrahProgress.completed}
            total={umrahProgress.total}
            color="#1B4332"
          />
          <MiniProgress
            label="Packing List"
            icon="🎒"
            completed={packingProgress.completed}
            total={packingProgress.total}
            color="#92400E"
          />
        </motion.div>

        {/* ── Change password section ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl overflow-hidden shadow-sm"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(27,67,50,0.07)",
          }}
        >
          {/* Toggle header */}
          <button
            onClick={() => {
              setShowPasswordSection(!showPasswordSection);
              resetPassword();
            }}
            className="w-full flex items-center justify-between
                       px-5 py-4 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🔐</span>
              <span className="font-bold text-sm" style={{ color: "#1B4332" }}>
                Change Password
              </span>
            </div>
            <motion.span
              animate={{ rotate: showPasswordSection ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ color: "#9CA3AF" }}
            >
              ▼
            </motion.span>
          </button>

          {/* Password form */}
          <AnimatePresence>
            {showPasswordSection && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="px-5 pb-5"
                  style={{ borderTop: "1px solid #F3F4F6" }}
                >
                  <form
                    onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                    className="pt-4 space-y-4"
                  >
                    {/* Current password */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: "#374151" }}
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        style={inputStyle(passwordErrors.currentPassword)}
                        placeholder="Enter current password"
                        {...registerPassword("currentPassword", {
                          required: "Current password is required",
                        })}
                      />
                      {passwordErrors.currentPassword && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#EF4444" }}
                        >
                          ⚠️ {passwordErrors.currentPassword.message}
                        </p>
                      )}
                    </div>

                    {/* New password */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: "#374151" }}
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        style={inputStyle(passwordErrors.newPassword)}
                        placeholder="Minimum 6 characters"
                        {...registerPassword("newPassword", {
                          required: "New password is required",
                          minLength: {
                            value: 6,
                            message: "At least 6 characters",
                          },
                        })}
                      />
                      {passwordErrors.newPassword && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#EF4444" }}
                        >
                          ⚠️ {passwordErrors.newPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Confirm new password */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: "#374151" }}
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        style={inputStyle(passwordErrors.confirmPassword)}
                        placeholder="Re-enter new password"
                        {...registerPassword("confirmPassword", {
                          required: "Please confirm password",
                          validate: (value) =>
                            value === newPassword || "Passwords do not match",
                        })}
                      />
                      {passwordErrors.confirmPassword && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#EF4444" }}
                        >
                          ⚠️ {passwordErrors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={changingPassword}
                      className="w-full py-3 rounded-xl text-sm
                                 font-semibold text-white transition-all"
                      style={{
                        background: changingPassword
                          ? "#9CA3AF"
                          : "linear-gradient(135deg,#1B4332,#40916C)",
                      }}
                    >
                      {changingPassword ? "Changing..." : "Change Password"}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── App info card ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-5 text-center"
          style={{
            background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)",
            border: "1px solid rgba(27,67,50,0.1)",
          }}
        >
          <div className="text-4xl mb-2">🕋</div>
          <p className="font-bold text-sm" style={{ color: "#1B4332" }}>
            Umrah Companion
          </p>
          <p className="text-xs mt-1" style={{ color: "#40916C" }}>
            May Allah accept your Umrah. Ameen 🤲
          </p>
          <p className="text-xs mt-2" style={{ color: "#9CA3AF" }}>
            Version 1.0.0
          </p>
        </motion.div>

        {/* ── Logout button ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleLogout}
            className="w-full py-4 rounded-2xl font-bold text-sm
                       transition-all flex items-center
                       justify-center gap-2"
            style={{
              backgroundColor: "#FEF2F2",
              color: "#B91C1C",
              border: "1.5px solid #FECACA",
            }}
          >
            🚪 Sign Out
          </button>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Profile;
