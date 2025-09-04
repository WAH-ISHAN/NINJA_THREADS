import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiUsers,
  FiShoppingCart,
  FiAlertCircle,
} from "react-icons/fi";

export function AccountToggle() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tokenRef = useRef(localStorage.getItem("token"));
  const containerRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setRole((parsed?.usertype || "guest").toLowerCase());
        setLoading(false);
        return;
      } catch {
        // ignore parsing error, fall through to fetch
      }
    }

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fallback to your existing endpoint and pick the first user
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/allusers`, {
          headers: tokenRef.current ? { Authorization: `Bearer ${tokenRef.current}` } : undefined,
        });
        const list = res?.data?.users || [];
        const u = list[0] || null;
        setUser(u);
        setRole((u?.usertype || "guest").toLowerCase());
      } catch (err) {
        console.error("Error fetching users", err);
        setError("Failed to fetch account.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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

  const displayName =
    (user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "") ||
    (user?.email ? user.email.split("@")[0] : "Guest");

  const initials = (user?.firstName?.[0] || "") + (user?.lastName?.[0] || displayName?.[0] || "?");

  const handlePrimaryClick = () => {
    if (!tokenRef.current) {
      navigate("/login");
    } else {
      setOpen((o) => !o);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
        {loading ? (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="h-10 w-10 rounded-full bg-white/10" />
            <div className="flex-1">
              <div className="h-3 w-32 bg-white/10 rounded mb-2" />
              <div className="h-2.5 w-20 bg-white/10 rounded" />
            </div>
            <div className="h-6 w-6 rounded-lg bg-white/10" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 text-rose-300">
            <FiAlertCircle />
            <span className="text-sm">{error}</span>
            <button
              onClick={() => window.location.reload()}
              className="ml-auto px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs"
            >
              Retry
            </button>
          </div>
        ) : (
          <button
            onClick={handlePrimaryClick}
            className="w-full flex items-center gap-3 hover:bg-white/5 rounded-xl p-2 transition"
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-xs font-semibold">
                {initials.toUpperCase()}
              </div>
              <span
                className={`absolute -bottom-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-md border ${
                  role === "admin"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-white/10 text-gray-300 border-white/20"
                }`}
                title={role === "admin" ? "Admin" : "User"}
              >
                {role === "admin" ? "Admin" : "User"}
              </span>
            </div>

            <div className="flex-1 text-left">
              <div className="text-sm font-semibold">{displayName}</div>
              <div className="text-xs text-gray-400 truncate max-w-[150px]">
                {user?.email || "Not signed in"}
              </div>
            </div>

            <FiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {open && tokenRef.current && (
        <div
          role="menu"
          className="absolute left-0 right-0 mt-2 z-30 rounded-2xl bg-[#0f131a] border border-white/10 shadow-lg overflow-hidden"
        >
          <MenuItem icon={FiUser} label="View Profile" onClick={() => navigate("Profile")} />
          {role === "admin" && (
            <MenuItem icon={FiUsers} label="Users" onClick={() => navigate("Users")} />
          )}
          {role === "admin" && (
            <MenuItem icon={FiShoppingCart} label="Orders" onClick={() => navigate("Orders")} />
          )}
          <div className="h-px bg-white/10 my-1" />
          <MenuItem icon={FiSettings} label="Admin Dashboard" onClick={() => navigate("AdminContent")} />
          <MenuItem
            icon={FiLogOut}
            label="Logout"
            onClick={handleLogout}
            className="text-rose-300 hover:text-rose-200"
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-white/5 transition ${className}`}
      role="menuitem"
    >
      <Icon className="text-gray-300" />
      <span>{label}</span>
    </button>
  );
}