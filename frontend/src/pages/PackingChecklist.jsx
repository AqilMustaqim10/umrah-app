import { useState, useEffect, useMemo } from "react";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import API from "../api/axios";
import MainLayout from "../components/layout/MainLayout";
import PackingCategorySection from "../components/PackingCategorySection";
import { CATEGORIES, CATEGORY_ORDER } from "../utils/packingCategories";

const PackingChecklist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  // ── Fetch checklist ──────────────────────────────────────
  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const res = await API.get("/checklist/packing");
        setItems(res.data.items);
      } catch {
        toast.error("Failed to load packing list");
      } finally {
        setLoading(false);
      }
    };
    fetchChecklist();
  }, []);

  // ── Toggle item ──────────────────────────────────────────
  const handleToggle = async (itemId) => {
    // Optimistic update
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );

    try {
      await API.patch(`/checklist/packing/${itemId}`);
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

  // ── Group items by category ──────────────────────────────
  const groupedItems = useMemo(() => {
    const groups = {};
    CATEGORY_ORDER.forEach((cat) => {
      groups[cat] = items.filter((item) => item.category === cat);
    });
    return groups;
  }, [items]);

  // ── Filter tabs ──────────────────────────────────────────
  const filterTabs = [
    { id: "all", label: "All", icon: "📦" },
    ...CATEGORY_ORDER.map((cat) => ({
      id: cat,
      label: CATEGORIES[cat].label,
      icon: CATEGORIES[cat].icon,
    })),
  ];

  // ── Categories to display based on filter ───────────────
  const visibleCategories =
    activeFilter === "all" ? CATEGORY_ORDER : [activeFilter];

  // ── Overall progress ─────────────────────────────────────
  const totalCompleted = items.filter((i) => i.completed).length;
  const totalItems = items.length;
  const overallPercentage =
    totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;
  const allDone = totalCompleted === totalItems && totalItems > 0;

  return (
    <MainLayout>
      <div className="space-y-5" style={{ paddingBottom: "6rem" }}>
        {/* ── Header ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold" style={{ color: "#1B4332" }}>
            🎒 Packing List
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
            Everything you need for your Umrah journey
          </p>
        </motion.div>

        {/* ── Overall progress card ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #92400E 0%, #D97706 100%)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-medium" style={{ color: "#FDE68A" }}>
                OVERALL PROGRESS
              </p>
              <p className="font-bold text-2xl mt-0.5 text-white">
                {overallPercentage}% Packed
              </p>
            </div>

            <div
              className="w-16 h-16 rounded-2xl flex flex-col
                         items-center justify-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
              }}
            >
              <span
                className="font-black text-xl leading-none
                           text-white"
              >
                {totalCompleted}
              </span>
              <span className="text-xs" style={{ color: "#FDE68A" }}>
                of {totalItems}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#FDE68A" }}
              initial={{ width: 0 }}
              animate={{ width: `${overallPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <p className="text-xs mt-2" style={{ color: "#FDE68A" }}>
            {allDone
              ? "🎉 All packed! You are ready for Umrah!"
              : `${totalItems - totalCompleted} item${
                  totalItems - totalCompleted !== 1 ? "s" : ""
                } left to pack`}
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
              <div className="text-4xl mb-2">✈️</div>
              <p className="font-bold text-base" style={{ color: "#92400E" }}>
                You're All Packed!
              </p>
              <p className="text-sm mt-1" style={{ color: "#78350F" }}>
                May Allah make your journey easy. Safe travels!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Category filter tabs ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;

              // Count items in this category
              const count =
                tab.id === "all"
                  ? items.length
                  : items.filter((i) => i.category === tab.id).length;

              const doneCount =
                tab.id === "all"
                  ? totalCompleted
                  : items.filter((i) => i.category === tab.id && i.completed)
                      .length;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0 flex items-center gap-1.5
                             px-3 py-2 rounded-xl text-xs font-semibold
                             transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? "#1B4332" : "#ffffff",
                    color: isActive ? "#ffffff" : "#6B7280",
                    border: isActive ? "none" : "1.5px solid #E5E7EB",
                    boxShadow: isActive
                      ? "0 2px 8px rgba(27,67,50,0.25)"
                      : "none",
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs
                               font-bold"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.2)"
                        : "#F3F4F6",
                      color: isActive ? "#ffffff" : "#6B7280",
                    }}
                  >
                    {doneCount}/{count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Checklist sections ───────────────────────── */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl animate-pulse"
                style={{ backgroundColor: "#E5E7EB" }}
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {visibleCategories.map((catId, index) => {
                const category = CATEGORIES[catId];
                const catItems = groupedItems[catId] || [];

                if (catItems.length === 0) return null;

                return (
                  <PackingCategorySection
                    key={catId}
                    category={category}
                    items={catItems}
                    onToggle={handleToggle}
                    delay={index * 0.08}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Tips card ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-4"
          style={{
            backgroundColor: "#F0F9FF",
            border: "1px solid #BAE6FD",
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p
                className="text-sm font-bold mb-1"
                style={{ color: "#0369A1" }}
              >
                Packing Tips
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#075985" }}
              >
                Pack ihram garments on top for easy access. Keep documents in a
                waterproof pouch. Unscented products only during Ihram. Bring
                extra medications for the full trip duration.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default PackingChecklist;
