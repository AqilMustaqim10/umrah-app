import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthError from "../components/auth/AuthError";

const ForgotPassword = () => {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentTo, setSentTo] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);

    try {
      await API.post("/auth/forgot-password", {
        email: data.email,
      });

      setSentTo(data.email);
      setEmailSent(true);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──────────────────────────────────────
  if (emailSent) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent you a reset link"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          {/* Animated envelope */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-5, 5, -5] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="text-7xl mb-6"
          >
            📬
          </motion.div>

          <p
            className="text-sm leading-relaxed mb-2"
            style={{ color: "#374151" }}
          >
            We sent a password reset link to:
          </p>
          <p
            className="font-bold text-base mb-6 break-all"
            style={{ color: "#1B4332" }}
          >
            {sentTo}
          </p>

          {/* Instructions */}
          <div
            className="rounded-xl p-4 mb-6 text-left"
            style={{
              backgroundColor: "#F0FDF4",
              border: "1px solid #BBF7D0",
            }}
          >
            <p
              className="text-xs font-semibold mb-2"
              style={{ color: "#15803D" }}
            >
              Next steps:
            </p>
            {[
              "1. Open your email inbox",
              "2. Look for email from Umrah Companion",
              '3. Click "Reset My Password" button',
              "4. Create your new password",
            ].map((step) => (
              <p
                key={step}
                className="text-xs mb-1"
                style={{ color: "#166534" }}
              >
                {step}
              </p>
            ))}
          </div>

          <p className="text-xs mb-6" style={{ color: "#9CA3AF" }}>
            ⏰ The link expires in 10 minutes. Didn't receive it? Check your
            spam folder.
          </p>

          {/* Resend button */}
          <button
            onClick={() => setEmailSent(false)}
            className="text-sm font-semibold transition-colors"
            style={{ color: "#40916C" }}
          >
            ← Try a different email
          </button>
        </motion.div>
      </AuthLayout>
    );
  }

  // ── Default form state ─────────────────────────────────
  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <AuthError message={serverError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon="✉️"
          error={errors.email?.message}
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address",
            },
          })}
        />

        <AuthButton loading={loading}>Send Reset Link →</AuthButton>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="text-sm font-medium transition-colors"
          style={{ color: "#40916C" }}
        >
          ← Back to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
