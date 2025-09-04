import React, { useEffect, useMemo, useState } from "react";
import {
  FiMail,
  FiUser,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const API_BASE = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/user`;

export default function Profile() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
  });

  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProfile() {
      setLoading(true);
      setError("");
      setSuccessMsg("");

      try {
        const res = await fetch(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${getToken()}` },
          signal: controller.signal,
        });

        if (!res.ok) {
          let message = "Failed to fetch profile";
          try {
            const errData = await res.json();
            message = errData?.message || message;
          } catch {}
          throw new Error(message);
        }

        const data = await res.json();
        const user = data?.user || {};
        const payload = {
          email: user.email || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phone: user.phone || "",
          password: "",
        };

        setFormData(payload);
        setInitial(payload);

        // Keep localStorage user in sync if present
        try {
          const current = JSON.parse(localStorage.getItem("user") || "{}");
          localStorage.setItem("user", JSON.stringify({ ...current, ...user }));
        } catch {}
      } catch (err) {
        setError(err.message || "Error loading profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
    return () => controller.abort();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (successMsg) setSuccessMsg("");
  }

  const dirty = useMemo(() => {
    if (!initial) return false;
    const changedCore =
      initial.firstName !== formData.firstName ||
      initial.lastName !== formData.lastName ||
      initial.phone !== formData.phone;
    const hasPassword = formData.password.trim() !== "";
    return changedCore || hasPassword;
  }, [initial, formData]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!dirty || saving) return;

    setError("");
    setSuccessMsg("");
    setSaving(true);

    const updatePayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    };
    if (formData.password.trim() !== "") {
      updatePayload.password = formData.password;
    }

    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatePayload),
      });

      if (!res.ok) {
        let message = "Failed to update profile";
        try {
          const errData = await res.json();
          message = errData?.message || message;
        } catch {}
        throw new Error(message);
      }

      const updatedCore = {
        ...initial,
        firstName: updatePayload.firstName,
        lastName: updatePayload.lastName,
        phone: updatePayload.phone,
        password: "",
      };
      setInitial(updatedCore);
      setFormData((prev) => ({ ...updatedCore }));

      // Sync localStorage user
      try {
        const current = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...current, ...updatedCore })
        );
      } catch {}

      setSuccessMsg("Profile updated successfully");
    } catch (err) {
      setError(err.message || "Error updating profile");
    } finally {
      setSaving(false);
    }
  }

  const resetChanges = () => {
    if (initial) setFormData({ ...initial, password: "" });
    setShowPassword(false);
    setError("");
    setSuccessMsg("");
  };

  const displayName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim() || "My Profile";
  const initials =
    (formData.firstName?.[0] || "") + (formData.lastName?.[0] || formData.email?.[0] || "?");

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white/10" />
            <div className="flex-1">
              <div className="h-4 w-40 bg-white/10 rounded mb-2" />
              <div className="h-3 w-56 bg-white/10 rounded" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 animate-pulse">
          <div className="h-5 w-48 bg-white/10 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-11 bg-white/10 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-sm font-semibold">
            {initials.toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{displayName}</h2>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <FiMail />
              <span className="truncate">{formData.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-3 flex items-center gap-2 text-rose-200">
          <FiAlertCircle /> <span className="text-sm">{error}</span>
        </div>
      )}
      {successMsg && (
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3 flex items-center gap-2 text-emerald-200">
          <FiCheckCircle /> <span className="text-sm">{successMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            icon={FiMail}
            label="Email (read-only)"
            type="email"
            name="email"
            value={formData.email}
            readOnly
          />

          <Field
            icon={FiUser}
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <Field
            icon={FiUser}
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <Field
            icon={FiPhone}
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 555 123 4567"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <FiLock /> Password (leave empty if unchanged)
          </label>
          <div className="flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <p className="text-xs text-gray-400">Use a strong password with at least 8 characters.</p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={resetChanges}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
            disabled={!dirty || saving}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!dirty || saving}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {saving && <FiRefreshCw className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ icon: Icon, label, ...inputProps }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-300 flex items-center gap-2">
        <Icon /> {label}
      </label>
      <input
        {...inputProps}
        className={`w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/20 ${inputProps.className || ""}`}
      />
    </div>
  );
}