import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Never return password in queries by default
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    country: {
      type: String,
      trim: true,
      default: "",
    },

    umrahDate: {
      type: Date,
      default: null,
    },

    avatar: {
      type: String,
      default: "",
    },

    // Password reset fields (used in Phase 4)
    resetPasswordToken: {
      type: String,
      default: undefined,
    },

    resetPasswordExpire: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  },
);

// ─── Hash password before saving ──────────────────────────
// This runs automatically every time a user is saved
userSchema.pre("save", async function (next) {
  // Only hash if password was changed (not on profile updates)
  if (!this.isModified("password")) {
    return next();
  }

  // Generate a salt (random string that makes each hash unique)
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// ─── Method to compare passwords at login ─────────────────
// We add this method to every User document
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
