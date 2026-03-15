import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import API from "../api/axios";
import MainLayout from "../components/layout/MainLayout";
import ProgressCard from "../components/ProgressCard";
import UmrahCountdown from "../components/UmrahCountdown";
import QuickActions from "../components/QuickActions";

// ── Greeting based on time of day ─────────────────────────
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

// ── Islamic greeting ───────────────────────────────────────
const getIslamicGreeting = () => {
  const greetings = ["As-salamu alaykum", "Marhaban", "Ahlan wa sahlan"];
  return greetings[Math.floor(Math.random() * greetings.length)];
};

const Dashboard = () => {
  const { user } = useAuth();
  const [umrahProgress, setUmrahProgress] = useState({
    completed: 0,
    total: 10,
  });
  const [packingProgress, setPackingProgress] = useState({
    completed: 0,
    total: 40,
  });
  const [loadingProgress, setLoadingProgress] = useState(true);

  // ── Fetch checklist progress ───────────────────────────
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
        // Progress API not built yet — use defaults
        // This is fine, we'll build it in Phase 9 & 10
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, []);

  return (
    <MainLayout>
      {/* ── Page content ────────────────────────────── */}
      <div
        className="space-y-5"
        style={{ paddingBottom: "5rem" }} // space for bottom nav
      >
        {/* ── Welcome header ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-2"
        >
          <p className="text-sm font-medium" style={{ color: "#40916C" }}>
            {getIslamicGreeting()} 👋
          </p>
          <h1
            className="text-2xl font-bold mt-0.5"
            style={{ color: "#1B4332" }}
          >
            {getGreeting()}, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
            Here's your Umrah preparation overview
          </p>
        </motion.div>

        {/* ── Countdown card ─────────────────────────── */}
        <UmrahCountdown delay={0.1} />

        {/* ── Progress section title ─────────────────── */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-semibold"
          style={{ color: "#6B7280" }}
        >
          YOUR PROGRESS
        </motion.h3>

        {/* ── Progress cards ──────────────────────────── */}
        {loadingProgress ? (
          // Loading skeletons
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-28 rounded-2xl animate-pulse"
                style={{ backgroundColor: "#E5E7EB" }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <ProgressCard
              title="Umrah Steps"
              icon="🕋"
              completed={umrahProgress.completed}
              total={umrahProgress.total}
              path="/umrah-checklist"
              delay={0.25}
              color="#1B4332"
              lightColor="#F0FDF4"
            />
            <ProgressCard
              title="Packing List"
              icon="🎒"
              completed={packingProgress.completed}
              total={packingProgress.total}
              path="/packing-checklist"
              delay={0.35}
              color="#92400E"
              lightColor="#FFF8E7"
            />
          </div>
        )}

        {/* ── Motivational banner ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg,#FFF8E7,#FFFBF0)",
            border: "1px solid rgba(212,160,23,0.2)",
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">🤲</span>
            <div>
              <p
                className="text-sm font-bold mb-1"
                style={{ color: "#92400E" }}
              >
                Daily Reminder
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#78350F" }}
              >
                "And complete the Hajj and Umrah for Allah."{" "}
                <span className="font-semibold">— Al-Baqarah 2:196</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Quick actions ───────────────────────────── */}
        <QuickActions delay={0.5} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
