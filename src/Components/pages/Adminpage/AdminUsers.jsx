import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiRefreshCw,
  FiCopy,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiAlertCircle,
  FiUser,
  FiShield,
} from "react-icons/fi";

export function AdminUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [activeTab, setActiveTab] = useState("users"); // 'admins' | 'users'
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("last"); // 'name' | 'email' | 'last'
  const [sortDir, setSortDir] = useState("desc"); // 'asc' | 'desc'
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [copiedId, setCopiedId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const copyTimeoutRef = useRef(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiUrl}/api/user/allusers`);
      const users = res?.data?.users || [];
      setAllUsers(users);
    } catch (err) {
      console.error("Error fetching users", err);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const admins = useMemo(
    () => allUsers.filter((u) => (u?.usertype || "").toLowerCase() === "admin"),
    [allUsers]
  );
  const users = useMemo(
    () => allUsers.filter((u) => (u?.usertype || "").toLowerCase() === "user"),
    [allUsers]
  );

  const baseList = activeTab === "admins" ? admins : users;

  const fullName = (u) => `${u?.firstName || ""} ${u?.lastName || ""}`.trim();
  const safeEmail = (u) => u?.email || "-";

  const formatRelative = (dateString) => {
    if (!dateString) return "Never";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Never";
    const diff = Date.now() - d.getTime();
    const s = Math.floor(diff / 1000);
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const dys = Math.floor(h / 24);
    if (dys < 30) return `${dys}d ago`;
    const mo = Math.floor(dys / 30);
    if (mo < 12) return `${mo}mo ago`;
    const y = Math.floor(mo / 12);
    return `${y}y ago`;
  };

  const sortedFiltered = useMemo(() => {
    let list = [...baseList];

    // Search
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((u) => {
        const name = fullName(u).toLowerCase();
        const email = safeEmail(u).toLowerCase();
        return name.includes(q) || email.includes(q);
      });
    }

    // Sort
    list.sort((a, b) => {
      let A, B;
      if (sortKey === "name") {
        A = fullName(a).toLowerCase();
        B = fullName(b).toLowerCase();
      } else if (sortKey === "email") {
        A = safeEmail(a).toLowerCase();
        B = safeEmail(b).toLowerCase();
      } else {
        // last
        A = new Date(a?.lastLoggedIn || 0).getTime() || 0;
        B = new Date(b?.lastLoggedIn || 0).getTime() || 0;
      }

      if (A < B) return sortDir === "asc" ? -1 : 1;
      if (A > B) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [baseList, search, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedFiltered.length / pageSize));
  useEffect(() => setPage(1), [activeTab, search, sortKey, sortDir, pageSize]);
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedFiltered.slice(start, start + pageSize);
  }, [sortedFiltered, page, pageSize]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "last" ? "desc" : "asc");
    }
  };

  const copyEmail = async (id, email) => {
    try {
      await navigator.clipboard.writeText(String(email || ""));
      setCopiedId(id);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopiedId(null), 1200);
    } catch {
      // fallback: nothing
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "User Type", "Last Logged In"],
      ...sortedFiltered.map((u) => [
        fullName(u) || "-",
        safeEmail(u),
        u?.usertype || "-",
        new Date(u?.lastLoggedIn || 0).toLocaleString() || "Never",
      ]),
    ];
    const csv = rows.map((r) =>
      r
        .map((cell) => {
          const c = String(cell ?? "");
          const needsQuotes = /[",\n]/.test(c);
          const escaped = c.replace(/"/g, '""');
          return needsQuotes ? `"${escaped}"` : escaped;
        })
        .join(",")
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_${activeTab}_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const CountChip = ({ icon: Icon, label, count, active }) => (
    <button
      onClick={label === "Admins" ? () => setActiveTab("admins") : () => setActiveTab("users")}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border transition ${
        active
          ? "bg-white/10 border-white/20 text-white"
          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
      }`}
    >
      <Icon />
      <span className="text-sm">{label}</span>
      <span className="text-xs px-2 py-0.5 rounded-lg bg-black/30 border border-white/10">
        {count}
      </span>
    </button>
  );

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Users</h1>
          <p className="text-gray-400 text-sm">Manage administrators and customers</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
            <span className="text-sm">Refresh</span>
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <FiDownload />
            <span className="text-sm">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Tabs + Search + Page size */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex items-center gap-2">
          <CountChip icon={FiShield} label="Admins" count={admins.length} active={activeTab === "admins"} />
          <CountChip icon={FiUser} label="Users" count={users.length} active={activeTab === "users"} />
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-full lg:w-80">
            <FiSearch className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="bg-transparent outline-none w-full text-sm placeholder:text-gray-400"
            />
          </div>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
            title="Items per page"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}/page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content card */}
      <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        {/* Table head */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-black/20 border-b border-white/10">
              <tr className="text-left">
                <th
                  className="px-4 py-3 font-medium cursor-pointer select-none"
                  onClick={() => toggleSort("name")}
                  title="Sort by name"
                >
                  <div className="inline-flex items-center gap-2">
                    Name
                    <span className={`text-[10px] ${sortKey === "name" ? "opacity-100" : "opacity-30"}`}>
                      {sortKey === "name" && sortDir === "asc" ? "▲" : "▼"}
                    </span>
                  </div>
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer select-none"
                  onClick={() => toggleSort("email")}
                  title="Sort by email"
                >
                  <div className="inline-flex items-center gap-2">
                    Email
                    <span className={`text-[10px] ${sortKey === "email" ? "opacity-100" : "opacity-30"}`}>
                      {sortKey === "email" && sortDir === "asc" ? "▲" : "▼"}
                    </span>
                  </div>
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer select-none"
                  onClick={() => toggleSort("last")}
                  title="Sort by last login"
                >
                  <div className="inline-flex items-center gap-2">
                    Last Logged In
                    <span className={`text-[10px] ${sortKey === "last" ? "opacity-100" : "opacity-30"}`}>
                      {sortKey === "last" && sortDir === "asc" ? "▲" : "▼"}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {/* Loading skeleton */}
              {loading &&
                [...Array(pageSize)].map((_, i) => (
                  <tr key={`sk-${i}`} className="animate-pulse">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-white/10" />
                        <div className="h-4 w-40 bg-white/10 rounded" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-56 bg-white/10 rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-24 bg-white/10 rounded" />
                    </td>
                  </tr>
                ))}

              {!loading && error && (
                <tr>
                  <td colSpan={3} className="px-4 py-6">
                    <div className="flex items-center gap-3 text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-3">
                      <FiAlertCircle />
                      <span className="text-sm">{error}</span>
                      <button
                        onClick={fetchUsers}
                        className="ml-auto px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                      >
                        Try again
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {!loading && !error && paged.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-gray-300">
                    {sortedFiltered.length === 0 ? "No users match your search." : "No users to display."}
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                paged.map((u) => {
                  const name = fullName(u) || "(No name)";
                  const email = safeEmail(u);
                  const initials =
                    (u?.firstName?.[0] || "") + (u?.lastName?.[0] || email?.[0] || "?");

                  return (
                    <tr
                      key={u?._id}
                      className="hover:bg-white/5 transition"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-xs font-semibold">
                            {initials.toUpperCase()}
                          </div>
                          <div className="font-medium">{name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{email}</span>
                          <button
                            onClick={() => copyEmail(u?._id, email)}
                            className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                            title="Copy email"
                          >
                            {copiedId === u?._id ? "Copied" : <FiCopy />}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          title={
                            u?.lastLoggedIn
                              ? new Date(u.lastLoggedIn).toLocaleString()
                              : "Never"
                          }
                          className="text-gray-300"
                        >
                          {formatRelative(u?.lastLoggedIn)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Footer: pagination */}
        {!loading && !error && sortedFiltered.length > 0 && (
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-white/10 text-sm">
            <div className="text-gray-400">
              Showing {(page - 1) * pageSize + 1}-
              {Math.min(page * pageSize, sortedFiltered.length)} of {sortedFiltered.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50"
              >
                <FiChevronLeft />
              </button>
              <div>
                Page {page} of {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}