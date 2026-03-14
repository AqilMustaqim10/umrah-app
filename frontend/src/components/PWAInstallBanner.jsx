import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import usePWAInstall from "../hooks/usePWAInstall";

const PWAInstallBanner = () => {
  const { isInstallable, isInstalled, triggerInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  if (!isInstallable || isInstalled || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm"
      >
        <div
          className="rounded-2xl p-4 shadow-2xl flex items-center gap-4"
          style={{
            background: "linear-gradient(135deg, #1B4332, #40916C)",
            border: "1px solid rgba(212, 160, 23, 0.3)",
          }}
        >
          {/* Icon */}
          <div className="text-4xl shrink-0">🕋</div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">
              Install Umrah Companion
            </p>
            <p className="text-green-200 text-xs mt-0.5">
              Add to home screen for quick access
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-1 shrink-0">
            <button
              onClick={triggerInstall}
              className="px-3 py-1.5 rounded-lg text-xs font-bold
                         transition-all active:scale-95"
              style={{
                backgroundColor: "#D4A017",
                color: "#1B4332",
              }}
            >
              Install
            </button>

            <button
              onClick={() => setDismissed(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium
                         text-green-200 hover:text-white transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallBanner;
