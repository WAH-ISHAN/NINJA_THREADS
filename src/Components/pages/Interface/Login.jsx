import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        setIsGoogleLoading(true);
        const { data } = await axios.post(`${API_URL}/api/user/google`, {
          accessToken: res.access_token,
        });

        toast.success("Login successful");
        localStorage.setItem("token", data.token);

        const user = data.user;
        navigate(user?.usertype === "admin" ? "/AdminHome" : "/");
      } catch (error) {
        console.error("Google login failed", error?.response?.data || error.message);
        toast.error(error?.response?.data?.message || "Google login failed");
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => toast.error("Google login was cancelled"),
  });

  async function handleLogin(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(`${API_URL}/api/user/login`, {
        email,
        password,
      });

      toast.success("Login successful");
      localStorage.setItem("token", data.token);

      const user = data.user;
      navigate(user?.usertype === "admin" ? "/AdminHome" : "/");
    } catch (error) {
      console.error("Login failed", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  const disabled = isSubmitting || isGoogleLoading;

  return (
    <div className="relative min-h-screen text-white">
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0">
        {/* Put your image in public/login.jpg or adjust the path below */}
        <img
          src="/login.jpg"
          alt="Background"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/70 to-black" />
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left showcase panel (only on lg+) */}
          <div className="hidden lg:flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-rose-500 to-orange-400" />
              <h1 className="text-2xl font-bold tracking-tight">NINJA THREADS</h1>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Welcome back. Sign in to continue discovering curated fits, drops,
              and deals tailored to your vibe.
            </p>

            <ul className="mt-8 space-y-4 text-slate-300">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Secure auth with Google and Email
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                Admin dashboard ready
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Clean, modern UI
              </li>
            </ul>
          </div>

          {/* Right auth card */}
          <div className="relative">
            {/* Subtle glow behind card */}
            <div className="pointer-events-none absolute -inset-[1px] -z-10 rounded-2xl bg-gradient-to-r from-rose-500/30 via-orange-400/20 to-rose-500/30 blur-2xl" />

            {/* Card with gradient border and glass effect */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-[1px] backdrop-blur-xl">
              <div className="rounded-2xl bg-slate-900/70 p-8 sm:p-10">
                <div className="mb-8 text-center lg:hidden">
                  <h2 className="text-3xl font-extrabold tracking-tight">NINJA THREADS</h2>
                  <p className="mt-2 text-sm text-slate-300">
                    Welcome back — sign in to continue
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                  {/* Email */}
                  <div className="relative">
                    <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

                  {/* Password */}
                  <div className="relative">
                    <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
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

                    <div className="mt-2 flex justify-end">
                      <Link
                        to="/ForgotPass"
                        className="text-sm text-rose-400 hover:text-rose-300"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  {/* Email sign in */}
                  <button
                    type="submit"
                    disabled={disabled}
                    className="relative inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 px-4 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:from-rose-500 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    )}
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="flex items-center">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="px-3 text-xs uppercase tracking-wider text-slate-400">
                        or
                      </span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                  </div>

                  {/* Google sign in */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!disabled) loginWithGoogle();
                    }}
                    disabled={disabled}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-medium text-white transition hover:border-white/25 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isGoogleLoading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <FcGoogle className="text-2xl" />
                    )}
                    {isGoogleLoading ? "Connecting to Google..." : "Sign in with Google"}
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-300">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-rose-400 hover:text-rose-300"
                  >
                    Register
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