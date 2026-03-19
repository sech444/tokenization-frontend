
// src/components/auth/EmailLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { InlineSpinner } from "../common/LoadingSpinner";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertTriangle } from "lucide-react";
import { Link } from 'react-router-dom';

const EmailLogin = ({ onError, clearError }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: "" }));
    clearError?.();
  };

  const determineRedirectTarget = (user) => {
    if (!user || !user.role) return "/dashboard";
    return user.role.toLowerCase() === "admin" ? "/admin" : "/dashboard";
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setFormErrors({});
    clearError?.();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await login(formData.email, formData.password);
      if (!res?.success) throw new Error(res?.error || "Login failed");
      const redirect = determineRedirectTarget(res.user);
      navigate(redirect, { replace: true });
    } catch (error) {
      onError?.(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleEmailLogin}>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                formErrors.email ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-blue-500 focus:border-transparent"
              }`}
              placeholder="Enter your email"
              disabled={loading}
              autoComplete="email"
            />
          </div>
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {formErrors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                formErrors.password ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-blue-500 focus:border-transparent"
              }`}
              placeholder="Enter your password"
              disabled={loading}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {formErrors.password}
            </p>
          )}
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
            disabled={loading}
          >
            Forgot your password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <InlineSpinner size="sm" color="white" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <ArrowRight className="w-4 h-4" />
              <span>Sign in with Email</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EmailLogin;