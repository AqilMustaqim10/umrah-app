import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

// ── Password strength checker ──────────────────────────────
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

const Register = () => {
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
      const response = await API.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      login(user, token);

      toast.success(`Account created! Welcome, ${user.name}! 🕋`);
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your Umrah preparation journey today"
    >
      <AuthError message={serverError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Full Name */}
        <AuthInput
          label="Full Name"
          type="text"
          placeholder="Ahmad Abdullah"
          icon="👤"
          error={errors.name?.message}
          register={register("name", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Name cannot exceed 50 characters",
            },
          })}
        />

        {/* Email */}
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

        {/* Password with strength meter */}
        <div>
          <AuthInput
            label="Password"
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

          {/* Password strength bar */}
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
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          icon="🔒"
          error={errors.confirmPassword?.message}
          register={register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />

        {/* Terms notice */}
        <p
          className="text-xs text-center mb-6 leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          By creating an account, you agree to use this app for your Umrah
          preparation. May Allah accept your Umrah. 🤲
        </p>

        <AuthButton loading={loading}>Create Account →</AuthButton>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px" style={{ backgroundColor: "#E5E7EB" }} />
        <span className="text-xs" style={{ color: "#9CA3AF" }}>
          OR
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "#E5E7EB" }} />
      </div>

      <p className="text-center text-sm" style={{ color: "#6B7280" }}>
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold transition-colors"
          style={{ color: "#1B4332" }}
        >
          Sign in →
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
