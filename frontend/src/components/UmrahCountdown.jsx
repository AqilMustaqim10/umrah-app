// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UmrahCountdown = ({ delay = 0 }) => {
  const { user } = useAuth();

  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!user?.umrahDate) return null;
    const today = new Date();
    const umrahDate = new Date(user.umrahDate);
    const diff = umrahDate - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const days = getDaysRemaining();

  // No date set
  if (days === null) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
      >
        <Link to="/profile">
          <div
            className="rounded-2xl p-5 flex items-center
                       justify-between shadow-sm hover:shadow-md
                       transition-shadow"
            style={{
              background: "linear-gradient(135deg, #1B4332 0%, #40916C 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <div>
                <p className="text-white font-semibold text-sm">
                  Set Your Umrah Date
                </p>
                <p className="text-green-200 text-xs mt-0.5">
                  Tap to add in your profile
                </p>
              </div>
            </div>
            <span className="text-white text-lg">→</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Date has passed
  if (days < 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
      >
        <div
          className="rounded-2xl p-5 flex items-center gap-3 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #D4A017 0%, #F59E0B 100%)",
          }}
        >
          <span className="text-3xl">🤲</span>
          <div>
            <p className="text-white font-bold text-sm">
              May Allah Accept Your Umrah
            </p>
            <p className="text-yellow-100 text-xs mt-0.5">
              Ameen! Taqabbalallahu minna wa minkum
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Countdown active
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div
        className="rounded-2xl p-5 shadow-sm"
        style={{
          background: "linear-gradient(135deg, #1B4332 0%, #40916C 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📅</span>
            <div>
              <p className="text-green-200 text-xs font-medium">
                Days Until Your Umrah
              </p>
              <p className="text-white font-bold text-lg mt-0.5">
                {days === 0
                  ? "Today is the day! 🕋"
                  : `${days} day${days !== 1 ? "s" : ""} to go`}
              </p>
            </div>
          </div>

          {/* Big day number */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center
                       justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <span className="text-white font-black text-2xl">
              {days > 99 ? "99+" : days}
            </span>
          </div>
        </div>

        {/* Progress bar toward date */}
        <div className="mt-4">
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#D4A017" }}
              initial={{ width: 0 }}
              animate={{
                width: `${Math.max(5, 100 - (days / 365) * 100)}%`,
              }}
              transition={{ duration: 1, delay: delay + 0.3 }}
            />
          </div>
          <p className="text-green-200 text-xs mt-1.5">
            Keep preparing! You're getting closer 🤲
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default UmrahCountdown;
