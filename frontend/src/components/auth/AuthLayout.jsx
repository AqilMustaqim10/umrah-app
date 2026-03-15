// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center
                 justify-center px-4 py-12"
      style={{
        background: `
          radial-gradient(ellipse at top left,
            rgba(27, 67, 50, 0.12) 0%, transparent 60%),
          radial-gradient(ellipse at bottom right,
            rgba(64, 145, 108, 0.10) 0%, transparent 60%),
          #F8F5F0
        `,
      }}
    >
      {/* Logo + App name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-3">🕋</div>
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#1B4332" }}
        >
          Umrah Companion
        </h1>
        <p className="text-sm mt-1" style={{ color: "#40916C" }}>
          Your trusted Umrah preparation guide
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md rounded-3xl p-8 shadow-xl"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(27, 67, 50, 0.08)",
        }}
      >
        {/* Card header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold" style={{ color: "#1B4332" }}>
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-xs text-center"
        style={{ color: "#9CA3AF" }}
      >
        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
      </motion.p>
    </div>
  );
};

export default AuthLayout;
