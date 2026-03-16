// eslint-disable-next-line
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center
                 justify-center px-6 text-center"
      style={{ backgroundColor: "#F8F5F0" }}
    >
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-8xl mb-6"
      >
        🕌
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black mb-3"
        style={{ color: "#1B4332" }}
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg font-semibold mb-2"
        style={{ color: "#374151" }}
      >
        Page Not Found
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm mb-8 max-w-xs leading-relaxed"
        style={{ color: "#9CA3AF" }}
      >
        This page doesn't exist. Let's get you back on the right path for your
        Umrah journey.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/dashboard"
          className="px-8 py-3.5 rounded-2xl font-bold
                     text-sm text-white inline-block"
          style={{
            background: "linear-gradient(135deg, #1B4332, #40916C)",
            boxShadow: "0 4px 14px rgba(27,67,50,0.3)",
          }}
        >
          🕋 Go to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
