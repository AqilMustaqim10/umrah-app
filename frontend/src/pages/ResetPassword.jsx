import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import API from "../api/axios";
import useAuth from "../hooks/useAuth";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthError from "../components/auth/AuthError";

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels = [
    { score: 0, label: "", color: "" },
    { score: 1, label: "Very Weak", color: "#EF4444" },
    { score: 2, label: "Weak", color: "#F97316" },
    { score: 3, label: "Fair", color: "#EAB308" },
    { score: 4, label: "Strong", color: "#22C55E" },
    { score: 5, label: "Very Strong", color: "#16A34A" },
  ];
  return levels[score] || levels[0];
};

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const strength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);

    try {
      const response = await API.put(`/auth/reset-password/${token}`, {
        password: data.password,
      });

      const { token: jwtToken, user } = response.data;

      login(user, jwtToken);

      toast.success("Password reset successfully! Welcome back 🕋");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Invalid or expired link. Please request a new one.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a strong new password for your account"
    >
      <AuthError message={serverError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* New Password */}
        <div>
          <AuthInput
            label="New Password"
            type="password"
            placeholder="Minimum 6 characters"
            icon="🔒"
            error={errors.password?.message}
            register={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {/* Strength bar */}
          {password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="-mt-3 mb-5"
            >
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "#E5E7EB" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(strength.score / 5) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: strength.color }}
                />
              </div>
              <p
                className="text-xs mt-1 font-medium"
                style={{ color: strength.color }}
              >
                {strength.label}
              </p>
            </motion.div>
          )}
        </div>

        {/* Confirm Password */}
        <AuthInput
          label="Confirm New Password"
          type="password"
          placeholder="Re-enter your new password"
          icon="🔒"
          error={errors.confirmPassword?.message}
          register={register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />

        <AuthButton loading={loading}>Reset Password →</AuthButton>
      </form>

      {/* Error fallback link */}
      {serverError && (
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold"
            style={{ color: "#40916C" }}
          >
            Request a new reset link →
          </Link>
        </div>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
