// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AuthButton = ({
  children,
  loading = false,
  type = "submit",
  onClick,
  variant = "primary",
  fullWidth = true,
}) => {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={loading}
      whileTap={{ scale: loading ? 1 : 0.97 }}
      whileHover={{ scale: loading ? 1 : 1.01 }}
      className="py-3.5 px-6 rounded-xl font-semibold
                 text-sm transition-all duration-200
                 disabled:cursor-not-allowed"
      style={{
        width: fullWidth ? "100%" : "auto",
        background: loading
          ? "#9CA3AF"
          : isPrimary
            ? "linear-gradient(135deg, #1B4332, #40916C)"
            : "transparent",
        color: isPrimary ? "#ffffff" : "#1B4332",
        border: isPrimary ? "none" : "1.5px solid #1B4332",
        boxShadow:
          loading || !isPrimary ? "none" : "0 4px 14px rgba(27, 67, 50, 0.3)",
      }}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Please wait...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default AuthButton;
