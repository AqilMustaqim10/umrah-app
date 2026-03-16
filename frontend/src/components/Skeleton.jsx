//eslint-disable-next-line
import { motion } from "framer-motion";

// ── Base shimmer animation ─────────────────────────────────
const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear",
  },
};

// ── Base skeleton block ────────────────────────────────────
export const SkeletonBlock = ({
  width = "100%",
  height = "16px",
  borderRadius = "8px",
  className = "",
}) => (
  <motion.div
    {...shimmer}
    className={className}
    style={{
      width,
      height,
      borderRadius,
      background:
        "linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)",
      backgroundSize: "200% 100%",
    }}
  />
);

// ── Dashboard skeleton ─────────────────────────────────────
export const DashboardSkeleton = () => (
  <div className="space-y-5 pt-2">
    {/* Welcome text */}
    <div className="space-y-2">
      <SkeletonBlock width="40%" height="14px" />
      <SkeletonBlock width="65%" height="28px" borderRadius="10px" />
      <SkeletonBlock width="55%" height="14px" />
    </div>

    {/* Countdown card */}
    <SkeletonBlock height="88px" borderRadius="16px" />

    {/* Section label */}
    <SkeletonBlock width="30%" height="12px" />

    {/* Progress cards */}
    <SkeletonBlock height="100px" borderRadius="16px" />
    <SkeletonBlock height="100px" borderRadius="16px" />

    {/* Verse card */}
    <SkeletonBlock height="80px" borderRadius="16px" />

    {/* Quick actions */}
    <div className="space-y-2">
      <SkeletonBlock width="30%" height="12px" />
      <div className="grid grid-cols-3 gap-3">
        <SkeletonBlock height="88px" borderRadius="16px" />
        <SkeletonBlock height="88px" borderRadius="16px" />
        <SkeletonBlock height="88px" borderRadius="16px" />
      </div>
    </div>
  </div>
);

// ── Checklist skeleton ─────────────────────────────────────
export const ChecklistSkeleton = () => (
  <div className="space-y-5 pt-2">
    {/* Header */}
    <div className="space-y-2">
      <SkeletonBlock width="50%" height="28px" borderRadius="10px" />
      <SkeletonBlock width="70%" height="14px" />
    </div>

    {/* Progress card */}
    <SkeletonBlock height="100px" borderRadius="16px" />

    {/* Items */}
    {[...Array(6)].map((_, i) => (
      <SkeletonBlock key={i} height="72px" borderRadius="16px" />
    ))}
  </div>
);

// ── Packing skeleton ───────────────────────────────────────
export const PackingSkeleton = () => (
  <div className="space-y-5 pt-2">
    {/* Header */}
    <div className="space-y-2">
      <SkeletonBlock width="45%" height="28px" borderRadius="10px" />
      <SkeletonBlock width="65%" height="14px" />
    </div>

    {/* Progress card */}
    <SkeletonBlock height="100px" borderRadius="16px" />

    {/* Filter tabs */}
    <div className="flex gap-2">
      {[...Array(4)].map((_, i) => (
        <SkeletonBlock key={i} width="72px" height="36px" borderRadius="12px" />
      ))}
    </div>

    {/* Category sections */}
    {[...Array(3)].map((_, i) => (
      <SkeletonBlock key={i} height="120px" borderRadius="16px" />
    ))}
  </div>
);

// ── Profile skeleton ───────────────────────────────────────
export const ProfileSkeleton = () => (
  <div className="space-y-5 pt-2">
    {/* Avatar */}
    <div className="flex flex-col items-center gap-3 pt-4">
      <SkeletonBlock width="96px" height="96px" borderRadius="50%" />
      <SkeletonBlock width="140px" height="20px" borderRadius="10px" />
      <SkeletonBlock width="180px" height="14px" />
    </div>

    {/* Details card */}
    <SkeletonBlock height="240px" borderRadius="16px" />

    {/* Progress card */}
    <SkeletonBlock height="100px" borderRadius="16px" />

    {/* Buttons */}
    <SkeletonBlock height="56px" borderRadius="16px" />
    <SkeletonBlock height="56px" borderRadius="16px" />
  </div>
);
