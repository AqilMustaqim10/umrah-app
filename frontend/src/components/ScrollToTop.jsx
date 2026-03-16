import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Automatically scrolls to top when navigating to a new page
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
