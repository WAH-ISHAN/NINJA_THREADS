import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiKey,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiRefreshCcw,
} from "react-icons/fi";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [sending, setSending] = useState(false);
  const [changing, setChanging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [resendTimer, setResendTimer] = useState(0); // seconds cooldown for resend
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const validateEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());

  async function sendEmail(e) {
    e?.preventDefault?.();
    if (sending) return;

    if (!email.trim() || !validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      setSending(true);
      const { data } = await axios.post(`${API_URL}/api/user/sendmail`, {
        email: email.trim(),
      });
      console.log("SendMail:", data);
      setEmailSent(true);
      setResendTimer(45);
      toast.success("Verification code sent to your email");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSending(false);
    }
  }

  async function changePassword(e) {
    e?.preventDefault?.();
    if (changing) return;

    const trimmedOtp = otp.trim();
    if (!trimmedOtp) {
      toast.error("Please enter the OTP sent to your email.");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setChanging(true);
      const { data } = await axios.post(`${API_URL}/api/user/changePass`, {
        email: email.trim(),
        otp: trimmedOtp,
        password,
      });
      console.log("ChangePass:", data);
      toast.success("Password changed successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setChanging(false);
    }
  }

  async function handleResend() {
    if (resendTimer > 0 || sending) return;
    await sendEmail(); // reuse sendEmail logic
  }

  function resetToEmailStep() {
    setEmailSent(false);
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black text-white">
      <Toaster position="top-center" />

      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[580px] w-[900px] rounded-full bg-gradient-to-r from-rose-600/20 via-orange-500/15 to-pink-600/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-180px] right-[-80px] h-[420px] w-[620px] rounded-full bg-gradient-to-tr from-orange-500/15 via-rose-600/15 to-fuchsia-600/15 blur-[110px]"
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-12">
        {/* Card frame */}
        <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-[1px] backdrop-blur-xl">
          <div className="rounded-2xl bg-slate-900/70 p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {emailSent ? "Reset Password" : "Forgot Password"}
              </h1>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
              >
                <FiArrowLeft />
                Back to login
              </Link>
            </div>

            {!emailSent ? (
              // Step 1: Send OTP
              <form onSubmit={sendEmail} className="space-y-5">
                <p className="text-sm text-slate-300">
                  Enter your email address and we’ll send you a verification code.
                </p>

                <div className="relative">
                  <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder=" "
                    autoComplete="email"
                    disabled={sending}
                    className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                  />
                  <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                    Email
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="relative inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:from-rose-500 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending code...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            ) : (
              // Step 2: Verify & Reset
              <form onSubmit={changePassword} className="space-y-5">
                <p className="text-sm text-slate-300">
                  We sent a verification code to{" "}
                  <span className="font-semibold text-white">{email}</span>. Check your inbox
                  (and spam folder). Not you?{" "}
                  <button
                    type="button"
                    onClick={resetToEmailStep}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    change email
                  </button>
                </p>

                {/* OTP */}
                <div className="relative">
                  <FiKey className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder=" "
                    required
                    disabled={changing}
                    className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                  />
                  <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                    OTP Code
                  </label>
                </div>

                {/* New Password */}
                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder=" "
                    required
                    disabled={changing}
                    className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                  />
                  <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                    New Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={changing}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder=" "
                    required
                    disabled={changing}
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
                    disabled={changing}
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={changing}
                    className="relative inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:from-rose-500 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {changing ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Updating...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendTimer > 0 || sending}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                    title={resendTimer > 0 ? `Resend available in ${resendTimer}s` : "Resend OTP"}
                  >
                    <FiRefreshCcw />
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}