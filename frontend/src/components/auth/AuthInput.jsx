import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AuthInput = ({
  label,
  type = "text",
  placeholder,
  error,
  icon,
  register,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-5">
      {/* Label */}
      {label && (
        <label
          className="block text-sm font-semibold mb-2"
          style={{ color: "#374151" }}
        >
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Left icon */}
        {icon && (
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2
                       text-lg pointer-events-none"
            style={{ color: "#40916C" }}
          >
            {icon}
          </div>
        )}

        {/* Input field */}
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full py-3 rounded-xl text-sm
                     transition-all duration-200 outline-none
                     focus:ring-2"
          style={{
            paddingLeft: icon ? "2.75rem" : "1rem",
            paddingRight: isPassword ? "3rem" : "1rem",
            backgroundColor: error ? "#FEF2F2" : "#F9FAFB",
            border: error ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
            color: "#1F2937",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = error ? "#EF4444" : "#40916C";
            e.target.style.backgroundColor = "#ffffff";
            e.target.style.boxShadow = error
              ? "0 0 0 3px rgba(239,68,68,0.1)"
              : "0 0 0 3px rgba(64,145,108,0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? "#EF4444" : "#E5E7EB";
            e.target.style.backgroundColor = error ? "#FEF2F2" : "#F9FAFB";
            e.target.style.boxShadow = "none";
          }}
          {...(register || {})}
          {...props}
        />

        {/* Show/hide password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2
                       text-sm transition-colors"
            style={{ color: "#9CA3AF" }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs flex items-center gap-1"
          style={{ color: "#EF4444" }}
        >
          ⚠️ {error}
        </motion.p>
      )}
    </div>
  );
};

export default AuthInput;
