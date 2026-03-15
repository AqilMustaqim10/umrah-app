import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import API from "../api/axios";
import MainLayout from "../components/layout/MainLayout";

// ── Single checklist item component ───────────────────────
const ChecklistItem = ({ item, onToggle, index }) => {
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    if (toggling) return;
    setToggling(true);
    await onToggle(item.id);
    setToggling(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <div
        className="flex items-start gap-4 p-4 rounded-2xl
                   transition-all duration-200 cursor-pointer
                   active:scale-98"
        style={{
          backgroundColor: item.completed ? "rgba(27,67,50,0.05)" : "#ffffff",
          border: item.completed
            ? "1.5px solid rgba(27,67,50,0.15)"
            : "1.5px solid #F3F4F6",
        }}
        onClick={handleToggle}
      >
        {/* Checkbox */}
        <div className="shrink-0 mt-0.5">
          <motion.div
            animate={{
              scale: toggling ? 0.85 : 1,
              backgroundColor: item.completed ? "#1B4332" : "#ffffff",
            }}
            transition={{ duration: 0.15 }}
            className="w-6 h-6 rounded-full border-2 flex items-center
                       justify-center"
            style={{
              borderColor: item.completed ? "#1B4332" : "#D1D5DB",
            }}
          >
            <AnimatePresence>
              {item.completed && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-white text-xs font-bold"
                >
                  ✓
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-sm transition-all"
            style={{
              color: item.completed ? "#6B7280" : "#1F2937",
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            {item.label}
          </p>
          {item.description && (
            <p
              className="text-xs mt-0.5 leading-relaxed"
              style={{ color: "#9CA3AF" }}
            >
              {item.description}
            </p>
          )}
        </div>

        {/* Step number badge */}
        <div
          className="shrink-0 w-7 h-7 rounded-full flex
                     items-center justify-center text-xs font-bold"
          style={{
            backgroundColor: item.completed ? "#1B4332" : "#F3F4F6",
            color: item.completed ? "#ffffff" : "#9CA3AF",
          }}
        >
          {item.completed ? "✓" : index + 1}
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Umrah Checklist Page ──────────────────────────────
const UmrahChecklist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  // ── Fetch checklist ──────────────────────────────────────
  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const res = await API.get("/checklist/umrah");
        setItems(res.data.items);
      } catch {
        toast.error("Failed to load checklist");
      } finally {
        setLoading(false);
      }
    };
    fetchChecklist();
  }, []);

  // ── Toggle item ──────────────────────────────────────────
  const handleToggle = async (itemId) => {
    // Optimistic update — update UI immediately
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );

    try {
      await API.patch(`/checklist/umrah/${itemId}`);
    } catch {
      // Revert on error
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item,
        ),
      );
      toast.error("Failed to save. Please try again.");
    }
  };

  // ── Reset checklist ──────────────────────────────────────
  const handleReset = async () => {
    if (
      !window.confirm("Reset all Umrah checklist items? This cannot be undone.")
    )
      return;

    setResetting(true);
    try {
      const res = await API.delete("/checklist/umrah/reset");
      setItems(res.data.items);
      toast.success("Checklist reset successfully");
    } catch {
      toast.error("Failed to reset checklist");
    } finally {
      setResetting(false);
    }
  };

  // ── Progress calculation ─────────────────────────────────
  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // ── All done check ───────────────────────────────────────
  const allDone = completed === total && total > 0;

  return (
    <MainLayout>
      <div className="space-y-5" style={{ paddingBottom: "5rem" }}>
        {/* ── Header ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold" style={{ color: "#1B4332" }}>
            🕋 Umrah Steps
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
            Follow each step in order for your Umrah
          </p>
        </motion.div>

        {/* ── Progress summary card ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #1B4332 0%, #40916C 100%)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-green-200 text-xs font-medium">
                OVERALL PROGRESS
              </p>
              <p className="text-white font-bold text-2xl mt-0.5">
                {percentage}% Complete
              </p>
            </div>
            <div
              className="w-16 h-16 rounded-2xl flex flex-col
                         items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <span className="text-white font-black text-xl leading-none">
                {completed}
              </span>
              <span className="text-green-200 text-xs">of {total}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#D4A017" }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <p className="text-green-200 text-xs mt-2">
            {total - completed === 0
              ? "🎉 All steps completed! May Allah accept your Umrah."
              : `${total - completed} step${
                  total - completed !== 1 ? "s" : ""
                } remaining`}
          </p>
        </motion.div>

        {/* ── All done celebration ─────────────────────── */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl p-5 text-center"
              style={{
                background: "linear-gradient(135deg, #FFF8E7, #FFFBF0)",
                border: "1px solid rgba(212,160,23,0.3)",
              }}
            >
              <div className="text-4xl mb-2">🤲</div>
              <p className="font-bold text-base" style={{ color: "#92400E" }}>
                Taqabbalallahu Minna Wa Minkum
              </p>
              <p className="text-sm mt-1" style={{ color: "#78350F" }}>
                May Allah accept your Umrah. Ameen!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Checklist items ──────────────────────────── */}
        {loading ? (
          // Loading skeletons
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-2xl animate-pulse"
                style={{ backgroundColor: "#E5E7EB" }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <ChecklistItem
                key={item.id}
                item={item}
                onToggle={handleToggle}
                index={index}
              />
            ))}
          </div>
        )}

        {/* ── Reset button ─────────────────────────────── */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-2 pb-4"
          >
            <button
              onClick={handleReset}
              disabled={resetting}
              className="w-full py-3 rounded-xl text-sm font-medium
                         transition-all border"
              style={{
                backgroundColor: "transparent",
                borderColor: "#E5E7EB",
                color: "#9CA3AF",
              }}
            >
              {resetting ? "Resetting..." : "↺ Reset Checklist"}
            </button>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default UmrahChecklist;
