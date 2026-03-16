// eslint-disable-next-line
import { motion } from "framer-motion";

const EmptyState = ({
  icon = "📭",
  title = "Nothing here yet",
  message = "",
  action = null,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center
                 py-16 px-6 text-center"
    >
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="text-6xl mb-4"
      >
        {icon}
      </motion.div>

      <p className="font-bold text-base mb-2" style={{ color: "#374151" }}>
        {title}
      </p>

      {message && (
        <p
          className="text-sm max-w-xs leading-relaxed mb-6"
          style={{ color: "#9CA3AF" }}
        >
          {message}
        </p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 rounded-xl text-sm
                     font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #1B4332, #40916C)",
          }}
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
