// eslint-disable-next-line
import { motion } from "framer-motion";

// A button that bounces slightly when tapped
const TapButton = ({
  children,
  onClick,
  className = "",
  style = {},
  disabled = false,
  type = "button",
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      style={style}
    >
      {children}
    </motion.button>
  );
};

export default TapButton;
