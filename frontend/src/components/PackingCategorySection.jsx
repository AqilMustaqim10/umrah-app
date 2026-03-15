import { useState } from "react";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";

// ── Single packing item ────────────────────────────────────
const PackingItem = ({ item, onToggle, index }) => {
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    if (toggling) return;
    setToggling(true);
    await onToggle(item.id);
    setToggling(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
    >
      <div
        className="flex items-start gap-3 px-4 py-3
                   cursor-pointer transition-all duration-150
                   active:scale-98 hover:bg-gray-50"
        style={{
          borderBottom: "1px solid #F9FAFB",
        }}
        onClick={handleToggle}
      >
        {/* Checkbox */}
        <div className="shrink-0 mt-0.5">
          <motion.div
            animate={{
              scale: toggling ? 0.8 : 1,
              backgroundColor: item.completed ? "#1B4332" : "#ffffff",
            }}
            transition={{ duration: 0.12 }}
            className="w-5 h-5 rounded flex items-center
                       justify-center border-2"
            style={{
              borderColor: item.completed ? "#1B4332" : "#D1D5DB",
              borderRadius: "6px",
            }}
          >
            <AnimatePresence>
              {item.completed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="text-white font-bold"
                  style={{ fontSize: "10px" }}
                >
                  ✓
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium transition-all"
            style={{
              color: item.completed ? "#9CA3AF" : "#1F2937",
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            {item.label}
          </p>
          {item.description && (
            <p
              className="text-xs mt-0.5 leading-relaxed"
              style={{ color: "#C4C4CC" }}
            >
              {item.description}
            </p>
          )}
        </div>

        {/* Packed badge */}
        <AnimatePresence>
          {item.completed && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="shrink-0 text-xs px-2 py-0.5
                         rounded-full font-medium"
              style={{
                backgroundColor: "#F0FDF4",
                color: "#1B4332",
              }}
            >
              packed ✓
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ── Category section with collapsible items ────────────────
const PackingCategorySection = ({ category, items, onToggle, delay = 0 }) => {
  const [collapsed, setCollapsed] = useState(false);

  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const allDone = completed === total && total > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-2xl overflow-hidden shadow-sm"
      style={{
        backgroundColor: "#ffffff",
        border: allDone
          ? "1.5px solid rgba(27,67,50,0.2)"
          : "1.5px solid #F3F4F6",
      }}
    >
      {/* ── Category header ─────────────────────────── */}
      <div
        className="px-4 py-3.5 cursor-pointer
                   flex items-center justify-between"
        style={{
          backgroundColor: allDone
            ? "rgba(27,67,50,0.04)"
            : category.lightColor,
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {/* Left — icon + name */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center
                       justify-center text-base"
            style={{ backgroundColor: category.lightColor }}
          >
            {category.icon}
          </div>
          <div>
            <p
              className="font-bold text-sm uppercase tracking-wide"
              style={{ color: category.color }}
            >
              {category.label}
            </p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>
              {completed} of {total} packed
            </p>
          </div>
        </div>

        {/* Right — progress + collapse toggle */}
        <div className="flex items-center gap-3">
          {/* Mini progress bar */}
          <div className="w-16">
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "#E5E7EB" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: category.color }}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <p
              className="text-xs font-bold mt-0.5 text-right"
              style={{ color: category.color }}
            >
              {percentage}%
            </p>
          </div>

          {/* Collapse arrow */}
          <motion.span
            animate={{ rotate: collapsed ? -90 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: "#9CA3AF", fontSize: "12px" }}
          >
            ▼
          </motion.span>
        </div>
      </div>

      {/* ── Items list ──────────────────────────────── */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {items.map((item, index) => (
              <PackingItem
                key={item.id}
                item={item}
                onToggle={onToggle}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PackingCategorySection;
