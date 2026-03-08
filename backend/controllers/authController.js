import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// ─────────────────────────────────────────────────────────
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// ─────────────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ── Validate input ──────────────────────────────────
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
    }

    // ── Check if email already exists ───────────────────
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // ── Password strength validation ────────────────────
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // ── Create the user ─────────────────────────────────
    // Password will be auto-hashed by the pre('save') hook in User model
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    // ── Generate JWT token ───────────────────────────────
    const token = generateToken(user._id);

    // ── Send response ────────────────────────────────────
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ── Validate input ───────────────────────────────────
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email and password",
      });
    }

    // ── Find user by email (include password this time) ──
    // We use .select('+password') because password has select:false
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        // Note: we give the same message for both wrong email
        // and wrong password — for security reasons
      });
    }

    // ── Check if password matches ────────────────────────
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ── Generate JWT token ───────────────────────────────
    const token = generateToken(user._id);

    // ── Send response ─────────────────────────────────────
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
        umrahDate: user.umrahDate,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private (requires JWT)
// ─────────────────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    // req.user is set by the auth middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
        umrahDate: user.umrahDate,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
