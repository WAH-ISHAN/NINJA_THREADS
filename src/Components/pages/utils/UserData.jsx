import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiLogIn,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

export default function UserData({ className = "" }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL;

  useEffect(() => {
    let cancelled = false;

    const hydrateFromStorage = () => {
      try {
        const cached = JSON.parse(localStorage.getItem("user") || "null");
        if (cached && !cancelled) setUser(cached);
      } catch {}
    };

    const fetchCurrent = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${apiBase}/api/user/current`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const u = res?.data?.user || null;
        if (!cancelled) {
          setUser(u);
          try {
            localStorage.setItem("user", JSON.stringify(u || {}));
          } catch {}
        }
      } catch (e) {
        // If token invalid, clear it
        if (e?.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    hydrateFromStorage();
    fetchCurrent();

    return () => {
      cancelled = true;
    };
  }, [token, apiBase]);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const signIn = () => navigate("/Login");
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/Login", { replace: true });
  };

  const displayName =
    (user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "") ||
    (user?.email ? user.email.split("@")[0] : "Guest");

  const initials =
    (user?.firstName?.[0] || "") + (user?.lastName?.[0] || user?.email?.[0] || "U");

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Loading skeleton */}
      {loading ? (
        <div className="h-10 w-36 rounded-full bg-white/10 border border-white/10 animate-pulse" />
      ) : !user ? (
        // Logged out: Sign In button
        <button
          onClick={signIn}
          className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-transparent text-white border-2 border-rose-600/80 hover:bg-rose-600/90 hover:border-rose-600 transition"
        >
          <FiLogIn />
          <span className="text-sm font-semibold">Sign In</span>
        </button>
      ) : (
        // Logged in: Avatar button with dropdown
        <>
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-2 pl-2 pr-3 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
            aria-haspopup="menu"
            aria-expanded={open}
            title={displayName}
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-[11px] font-semibold flex items-center justify-center">
              {initials.toUpperCase()}
            </div>
            <span className="text-sm max-w-[120px] truncate">{displayName}</span>
            <FiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0f131a] border border-white/10 shadow-xl overflow-hidden z-50"
            >
              <MenuItem
                icon={FiUser}
                label="Profile"
                onClick={() => {
                  setOpen(false);
                  navigate("/Profile");
                }}
              />
              <div className="h-px bg-white/10 my-1" />
              <MenuItem
                icon={FiLogOut}
                label="Sign Out"
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="text-rose-300 hover:text-rose-200"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick, className = "" }) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-white/5 transition ${className}`}
    >
      <Icon className="text-gray-300" />
      <span>{label}</span>
    </button>
  );
}