import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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
      select: false,
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
    timestamps: true,
  },
);

// ─── Hash password before saving ──────────────────────────
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ─── Compare entered password with hashed password ────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ─── Generate password reset token ────────────────────────
userSchema.methods.getResetPasswordToken = function () {
  // Step 1: Generate a random token (this goes in the email link)
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Step 2: Hash the token before saving to DB
  // (so even if DB is breached, tokens can't be used)
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Step 3: Set expiry — 10 minutes from now
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  // Step 4: Return the UNHASHED token (this goes in the email)
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
