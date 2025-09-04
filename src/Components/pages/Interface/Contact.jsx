import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheckCircle } from "react-icons/fi";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Prefer using an env var. Fallback to your existing key.
  const ACCESS_KEY =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "eed9404d-69fb-4573-ba81-a7bc46cb57be";

  const validateEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast.error("Please fill out all fields.");
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (trimmedMessage.length < 10) {
      toast.error("Message should be at least 10 characters.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        access_key: ACCESS_KEY,
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        subject: "New message from Ninja Threads contact form",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      }).then((r) => r.json());

      if (res?.success) {
        toast.success("Message sent! We’ll get back to you soon.");
        setSent(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(res?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden py-16">
      {/* Ambient gradient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-gradient-to-r from-rose-600/20 via-orange-500/15 to-fuchsia-600/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-[-10%] h-[420px] w-[620px] rounded-full bg-gradient-to-tr from-orange-500/15 via-rose-600/15 to-pink-600/15 blur-[110px]"
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

      <div className="relative z-10 mx-auto w-full max-w-2xl px-4">
        {/* Card frame */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-[1px] backdrop-blur-xl">
          <div className="rounded-2xl bg-slate-900/70 p-6 sm:p-8">
            <header className="mb-6 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Contact Us
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Reach out for support, inquiries, or collaboration.
              </p>
            </header>

            {sent ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <FiCheckCircle className="text-4xl text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Thanks for contacting us!</h3>
                <p className="text-slate-300">
                  We received your message and will respond as soon as possible.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" aria-live="polite">
                {/* Name */}
                <div className="relative">
                  <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    required
                    disabled={loading}
                    className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                  />
                  <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                    Name
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    required
                    disabled={loading}
                    className="peer w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                  />
                  <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                    Email
                  </label>
                </div>

                {/* Message */}
                <div className="relative">
                  <FiMessageSquare className="pointer-events-none absolute left-3 top-3 text-slate-400" />
                  <textarea
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder=" "
                    required
                    disabled={loading}
                    className="peer w-full resize-y rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-white placeholder-transparent outline-none transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-60"
                  />
                  <label className="pointer-events-none absolute left-10 top-3 bg-transparent px-1 text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                    Message
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:from-rose-500 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send <FiSend />
                    </>
                  )}
                </button>

                {/* Small reassurance text */}
                <p className="text-center text-xs text-slate-400">
                  We typically reply within 24–48 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}