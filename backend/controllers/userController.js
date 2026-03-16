import User from "../models/User.js";

// ─────────────────────────────────────────────────────────
// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
// ─────────────────────────────────────────────────────────
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

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
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
// ─────────────────────────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, country, umrahDate } = req.body;

    // ── Validate name ────────────────────────────────────
    if (name !== undefined) {
      if (!name || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: "Name must be at least 2 characters",
        });
      }
      if (name.trim().length > 50) {
        return res.status(400).json({
          success: false,
          message: "Name cannot exceed 50 characters",
        });
      }
    }

    // ── Build update object ──────────────────────────────
    // Only include fields that were actually sent
    const updateFields = {};

    if (name !== undefined) {
      updateFields.name = name.trim();
    }
    if (phone !== undefined) {
      updateFields.phone = phone.trim();
    }
    if (country !== undefined) {
      updateFields.country = country.trim();
    }
    if (umrahDate !== undefined) {
      // Allow clearing the date by passing empty string
      updateFields.umrahDate = umrahDate ? new Date(umrahDate) : null;
    }

    // ── Update user ──────────────────────────────────────
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      {
        new: true, // Return updated document
        runValidators: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Change password
// @route   PUT /api/user/change-password
// @access  Private
// ─────────────────────────────────────────────────────────
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // ── Validate ─────────────────────────────────────────
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    // ── Get user with password ───────────────────────────
    const user = await User.findById(req.user._id).select("+password");

    // ── Check current password ───────────────────────────
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // ── Update password ──────────────────────────────────
    // pre('save') hook will hash it automatically
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
