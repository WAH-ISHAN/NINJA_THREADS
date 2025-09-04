import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (loading) return;

    // Basic client-side checks
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill all required fields");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
    };

    try {
      const { data } = await axios.post(`${API_URL}/api/user/saveUser`, payload);
      console.log("Registration successful", data);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log("Registration failed", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  const disabled = loading;

  return (
    <div className="relative min-h-screen text-white">
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0">
        {/* Put your image in public/reg.jpg or adjust the path below */}
        <img
          src="/reg.jpg"
          alt="Background"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/70 to-black" />
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left showcase panel */}
          <div className="hidden lg:flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-rose-500 to-orange-400" />
              <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Join Ninja Threads to get tailored drops, fits, and deals. Your style, your rules.
            </p>

            <ul className="mt-8 space-y-4 text-slate-300">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Quick registration with secure auth
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                Curated recommendations
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Clean, modern UI
              </li>
            </ul>
          </div>

          {/* Right form card */}
          <div className="relative">
            {/* Subtle glow behind card */}
            <div className="pointer-events-none absolute -inset-[1px] -z-10 rounded-2xl bg-gradient-to-r from-rose-500/30 via-orange-400/20 to-rose-500/30 blur-2xl" />

            <div className="rounded-2xl border border-white/10 bg-white/10 p-[1px] backdrop-blur-xl">
              <div className="rounded-2xl bg-slate-900/70 p-8 sm:p-10">
                <div className="mb-8 text-center lg:hidden">
                  <h2 className="text-3xl font-extrabold tracking-tight">NINJA THREADS</h2>
                  <p className="mt-2 text-sm text-slate-300">
                    Create your account to get started
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleRegister}>
                  {/* First Name */}
                  <div className="relative">
                    <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      disabled={disabled}
                      placeholder=" "
                      className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                    />
                    <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                      First Name
                    </label>
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      disabled={disabled}
                      placeholder=" "
                      className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                    />
                    <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                      Last Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      disabled={disabled}
                      placeholder=" "
                      className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                    />
                    <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                      Email
                    </label>
                  </div>

                  {/* Phone (optional) */}
                  <div className="relative">
                    <FiPhone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={disabled}
                      placeholder=" "
                      className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                    />
                    <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                      Phone (optional)
                    </label>
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                      disabled={disabled}
                      placeholder=" "
                      className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                    />
                    <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      disabled={disabled}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                    <p className="mt-2 text-xs text-slate-400">At least 6 characters</p>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                      disabled={disabled}
                      placeholder=" "
                      className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                    />
                    <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                      Confirm Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                      disabled={disabled}
                    >
                      {showConfirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>

                  {/* Register */}
                  <button
                    type="submit"
                    disabled={disabled}
                    className="relative inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 px-4 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:from-rose-500 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    )}
                    {loading ? "Registering..." : "Create account"}
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-300">
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-rose-400 hover:text-rose-300">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {/* End right card */}
        </div>
      </div>
    </div>
  );
}