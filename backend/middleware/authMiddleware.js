import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ─────────────────────────────────────────────────────────
// Protect middleware — verifies JWT token
// Add this to any route that requires login
// ─────────────────────────────────────────────────────────
const protect = async (req, res, next) => {
  try {
    let token;

    // ── Check for token in Authorization header ──────────
    // Frontend sends: Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ── No token found ───────────────────────────────────
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please log in.",
      });
    }

    // ── Verify the token ─────────────────────────────────
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id: 'userId', iat: ..., exp: ... }

    // ── Find the user from the token's ID ────────────────
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // ── Attach user to request object ────────────────────
    // Now any route after this can access req.user
    req.user = user;

    next(); // Continue to the actual route handler
  } catch (error) {
    // jwt.verify throws errors for expired or invalid tokens
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default protect;
