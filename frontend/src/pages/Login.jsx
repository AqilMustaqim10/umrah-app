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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      // Save to context + localStorage
      login(user, token);

      toast.success(`Welcome back, ${user.name}! 🕋`);
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
      title="Welcome Back"
      subtitle="Sign in to continue your Umrah preparation"
    >
      {/* Server error */}
      <AuthError message={serverError} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

        {/* Password */}
        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
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

        {/* Forgot password link */}
        <div className="text-right -mt-2 mb-6">
          <Link
            to="/forgot-password"
            className="text-sm font-medium transition-colors"
            style={{ color: "#40916C" }}
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit button */}
        <AuthButton loading={loading}>Sign In →</AuthButton>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px" style={{ backgroundColor: "#E5E7EB" }} />
        <span className="text-xs" style={{ color: "#9CA3AF" }}>
          OR
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "#E5E7EB" }} />
      </div>

      {/* Register link */}
      <p className="text-center text-sm" style={{ color: "#6B7280" }}>
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold transition-colors"
          style={{ color: "#1B4332" }}
        >
          Create one free →
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
