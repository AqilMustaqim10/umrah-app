// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProgressCard = ({
  title,
  icon,
  completed,
  total,
  path,
  delay = 0,
  color = "#1B4332",
  lightColor = "#F0FDF4",
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <Link to={path} className="block">
        <div
          className="rounded-2xl p-5 shadow-sm
                     transition-shadow hover:shadow-md"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(27,67,50,0.07)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center
                           justify-center text-xl"
                style={{ backgroundColor: lightColor }}
              >
                {icon}
              </div>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "#1F2937" }}
                >
                  {title}
                </p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>
                  {completed} of {total} completed
                </p>
              </div>
            </div>

            {/* Percentage badge */}
            <div
              className="px-3 py-1 rounded-full text-sm font-bold"
              style={{
                backgroundColor: lightColor,
                color: color,
              }}
            >
              {percentage}%
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "#F3F4F6" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color}, ${color}CC)`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{
                duration: 0.8,
                delay: delay + 0.2,
                ease: "easeOut",
              }}
            />
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs" style={{ color: "#9CA3AF" }}>
              {total - completed} tasks remaining
            </p>
            <p className="text-xs font-semibold" style={{ color: color }}>
              View all →
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProgressCard;
