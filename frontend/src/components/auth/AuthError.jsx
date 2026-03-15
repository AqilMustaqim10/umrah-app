// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const AuthError = ({ message }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="mb-5 p-4 rounded-xl flex items-start gap-3"
        style={{
          backgroundColor: "#FEF2F2",
          border: "1px solid #FECACA",
        }}
      >
        <span className="text-lg shrink-0">⚠️</span>
        <p className="text-sm" style={{ color: "#B91C1C" }}>
          {message}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthError;
