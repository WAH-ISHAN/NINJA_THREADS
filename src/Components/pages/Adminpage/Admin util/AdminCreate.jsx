import React, { useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiMail,
  FiUser,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";

export default function AdminCreateProfile() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const getPasswordStrength = (pw) => {
    if (!pw) return { score: 0, label: "Weak", color: "bg-rose-500" };
    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSymbol = /[^A-Za-z0-9]/.test(pw);
    const len = pw.length;

    let score = 0;
    score += hasLower ? 1 : 0;
    score += hasUpper ? 1 : 0;
    score += hasNumber ? 1 : 0;
    score += hasSymbol ? 1 : 0;
    if (len >= 12) score += 2;
    else if (len >= 8) score += 1;

    let label = "Weak";
    let color = "bg-rose-500";
    if (score >= 3 && score <= 4) {
      label = "Good";
      color = "bg-sky-500";
    }
    if (score === 5) {
      label = "Strong";
      color = "bg-emerald-500";
    }
    if (score >= 6) {
      label = "Very strong";
      color = "bg-emerald-500";
    }

    const percent = Math.min(100, Math.round((score / 6) * 100));
    return { score, label, color, percent };
  };

  const pwStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const emailValid = useMemo(
    () => validateEmail(formData.email),
    [formData.email]
  );
  const passwordsMatch =
    formData.password.length > 0 &&
    formData.password === formData.confirmPassword;
  const passwordValid =
    formData.password.length >= 8 && pwStrength.score >= 3;

  const canSubmit =
    emailValid &&
    passwordValid &&
    passwordsMatch &&
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.phone.trim() &&
    !loading;

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const generateStrongPassword = (length = 14) => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}<>?,.";
    const all = upper + lower + numbers + symbols;

    let pw = "";
    // ensure variety
    pw += upper[Math.floor(Math.random() * upper.length)];
    pw += lower[Math.floor(Math.random() * lower.length)];
    pw += numbers[Math.floor(Math.random() * numbers.length)];
    pw += symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = 4; i < length; i++) {
      pw += all[Math.floor(Math.random() * all.length)];
    }
    // simple shuffle
    pw = pw
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    setFormData((s) => ({ ...s, password: pw, confirmPassword: pw }));
    navigator.clipboard?.writeText(pw).catch(() => {});
    toast.success("Strong password generated and copied");
  };

  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("You must be logged in");
      return;
    }
    if (!canSubmit) {
      toast.error("Please fix validation errors");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      };

      const res = await axios.post(
        `${apiUrl}/api/user/createAdmin`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res?.data?.message || "Admin created");
      clearForm();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create admin profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Create Admin Profile</h2>
          <p className="text-gray-400 text-sm">
            Add a new administrator with secure credentials
          </p>
        </div>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-sm">
          <FiShield /> Admin
        </span>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-6 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <Field
            icon={FiMail}
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            required
            invalid={formData.email !== "" && !emailValid}
            helper={formData.email !== "" && !emailValid ? "Enter a valid email" : undefined}
          />

          {/* Phone */}
          <Field
            icon={FiPhone}
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 555 123 4567"
            required
          />

          {/* First Name */}
          <Field
            icon={FiUser}
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          {/* Last Name */}
          <Field
            icon={FiUser}
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300 flex items-center gap-2">
                <FiLock /> Password
              </label>
              <button
                type="button"
                onClick={() => generateStrongPassword()}
                className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
              >
                Generate strong
              </button>
            </div>
            <div className={`flex items-center gap-2`}>
              <input
                type={showPw ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-3 py-2 rounded-xl bg-black/30 border outline-none focus:border-white/20 ${
                  formData.password && !passwordValid ? "border-rose-500/40" : "border-white/10"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
                title={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Strength bar */}
            <div className="space-y-1">
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-2 ${pwStrength.color}`}
                  style={{ width: `${pwStrength.percent || 0}%` }}
                />
              </div>
              <div className="text-xs text-gray-400">
                {formData.password ? `Strength: ${pwStrength.label}` : "Use at least 8 characters with a mix of types"}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <FiLock /> Confirm Password
            </label>
            <div className="flex items-center gap-2">
              <input
                type={showPw2 ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-3 py-2 rounded-xl bg-black/30 border outline-none focus:border-white/20 ${
                  formData.confirmPassword && !passwordsMatch ? "border-rose-500/40" : "border-white/10"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPw2((s) => !s)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
                title={showPw2 ? "Hide password" : "Show password"}
              >
                {showPw2 ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {formData.confirmPassword && !passwordsMatch && (
              <div className="text-xs text-rose-300">Passwords do not match</div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={clearForm}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
            disabled={loading}
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading && <FiRefreshCw className="animate-spin" />}
            Create Admin
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ icon: Icon, label, helper, invalid, className = "", ...inputProps }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-300 flex items-center gap-2">
        {Icon && <Icon />} {label}
      </label>
      <input
        {...inputProps}
        className={`w-full px-3 py-2 rounded-xl bg-black/30 border outline-none focus:border-white/20 ${
          invalid ? "border-rose-500/40" : "border-white/10"
        } ${className}`}
      />
      {helper && <div className="text-xs text-rose-300">{helper}</div>}
    </div>
  );
}