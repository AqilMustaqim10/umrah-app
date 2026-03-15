// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const actions = [
  {
    path: "/umrah-checklist",
    icon: "🕋",
    label: "Umrah\nChecklist",
    bg: "#F0FDF4",
    color: "#1B4332",
  },
  {
    path: "/packing-checklist",
    icon: "🎒",
    label: "Packing\nList",
    bg: "#FFF8E7",
    color: "#92400E",
  },
  {
    path: "/profile",
    icon: "👤",
    label: "My\nProfile",
    bg: "#EFF6FF",
    color: "#1E40AF",
  },
];

const QuickActions = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <h3 className="text-sm font-semibold mb-3" style={{ color: "#6B7280" }}>
        QUICK ACCESS
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, i) => (
          <motion.div
            key={action.path}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: delay + i * 0.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={action.path}>
              <div
                className="rounded-2xl p-4 flex flex-col
                           items-center justify-center gap-2
                           shadow-sm hover:shadow-md transition-all
                           aspect-square"
                style={{
                  backgroundColor: action.bg,
                  border: `1px solid ${action.color}15`,
                }}
              >
                <span className="text-3xl">{action.icon}</span>
                <span
                  className="text-xs font-semibold text-center
                             leading-tight whitespace-pre-line"
                  style={{ color: action.color }}
                >
                  {action.label}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
