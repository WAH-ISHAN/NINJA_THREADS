import React, { useState } from "react";
import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaUsers, FaUserCircle, FaCartArrowDown, FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { FiMenu, FiSearch, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

import { AdminContent } from "./AdminContent";
import AddProduct from "./AddProduct";
import EditProduct from "./Admin util/FeatureProduct";
import AdminOrder from "./AdminOrder";
import { AdminUsers } from "./AdminUsers";
import Profile from "./Admin util/Profile";
import { HomePage } from "../Interface/HomePage";
import { AccountToggle } from "./AccountToggle";
import AdminCreateProfile from "./Admin util/AdminCreate";

export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(false); // sidebar collapse (md+)
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const navItems = [
    { to: "AdminContent", label: "Dashboard", icon: FaHome },
    { to: "Profile", label: "Profile", icon: FaUserCircle },
    { to: "AdminCreateProfile", label: "Create Admin", icon: FaUsers },
    { to: "Users", label: "Users", icon: FaUsers },
    { to: "Orders", label: "Orders", icon: FaCartArrowDown },
    { to: "AddProduct", label: "Add Product", icon: AiFillProduct },
    { to: "EditProduct", label: "Edit Product", icon: AiFillProduct },
    { to: "pageoverview", label: "Page Overview", icon: GrView },
  ];

  const cn = (...classes) => classes.filter(Boolean).join(" ");

  const currentKey = location.pathname.split("/").filter(Boolean).slice(-1)[0] || "AdminContent";
  const currentItem =
    navItems.find((i) => i.to.toLowerCase() === currentKey.toLowerCase()) || navItems[0];

  const renderNav = (onNavigate) => (
    <nav className="flex-1 overflow-y-auto space-y-1 pr-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          title={collapsed ? label : undefined}
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-3 px-3 py-2 rounded-xl transition-colors",
              isActive
                ? "bg-white/10 text-white shadow-inner border border-white/10"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            )
          }
        >
          <Icon className="text-xl shrink-0" />
          <span className={cn("truncate", collapsed ? "hidden" : "block")}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0b0e14] via-[#0d1117] to-[#0a0d12] text-white">
      <div className="flex gap-2 md:gap-4 p-2 md:p-4">

        {/* Sidebar (desktop) */}
        <aside
          className={cn(
            "hidden md:flex md:flex-col sticky top-2 self-start h-[calc(100vh-16px)]",
            "bg-white/5 border border-white/10 rounded-2xl p-3",
            collapsed ? "md:w-20" : "md:w-64"
          )}
        >
          {/* Brand / Title */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
              {!collapsed && <h2 className="text-lg font-semibold">Admin Panel</h2>}
            </div>
            {/* Collapse toggle */}
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="hidden md:inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-white/10 transition"
              title={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
          </div>

          {/* Account / user quick switch */}
          {!collapsed && (
            <div className="mb-3">
              <AccountToggle />
            </div>
          )}

          {/* Nav */}
          {renderNav(undefined)}

          {/* Bottom actions */}
          <div className="mt-2 space-y-2">
            <button
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl",
                "bg-red-500/10 text-red-300 hover:text-white hover:bg-red-500/20 transition"
              )}
              title="Log out"
            >
              <IoLogOut className="text-xl" />
              {!collapsed && <span>Log Out</span>}
            </button>
          </div>
        </aside>

        {/* Sidebar (mobile drawer) */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 z-50 bg-[#12161d] border-r border-white/10 p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
                  <h2 className="text-lg font-semibold">Admin Panel</h2>
                </div>
                <button
                  className="p-2 rounded-lg hover:bg-white/10"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FiX />
                </button>
              </div>
              <div className="mb-3">
                <AccountToggle />
              </div>
              {renderNav(() => setSidebarOpen(false))}
              <div className="mt-auto">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-red-500/10 text-red-300 hover:text-white hover:bg-red-500/20 transition"
                >
                  <IoLogOut className="text-xl" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Main content */}
        <main className="flex-1 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          {/* Topbar */}
          <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/10 bg-black/20 backdrop-blur px-3 md:px-6 py-3">
            {/* Mobile sidebar toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">You are on</span>
              <span className="font-medium">{currentItem.label}</span>
            </div>

            {/* Search (decorative) */}
            <div className="ml-auto hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 gap-2 w-72">
              <FiSearch className="text-gray-400" />
              <input
                className="bg-transparent outline-none text-sm placeholder:text-gray-400 w-full"
                placeholder="Search..."
              />
            </div>

            {/* Quick logout (optional) */}
            <button
              onClick={handleLogout}
              className="ml-2 hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              <IoLogOut />
              <span className="text-sm">Logout</span>
            </button>
          </div>

          {/* Routed content */}
          <div className="h-[calc(100%-56px)] overflow-y-auto p-3 md:p-6">
            <Routes>
              <Route index element={<AdminContent />} />
              <Route path="AdminContent" element={<AdminContent />} />
              <Route path="AddProduct" element={<AddProduct />} />
              <Route path="EditProduct" element={<EditProduct />} />
              <Route path="Orders" element={<AdminOrder />} />
              <Route path="Users" element={<AdminUsers />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="AdminCreateProfile" element={<AdminCreateProfile />} />
              <Route path="pageoverview" element={<HomePage />} />
              <Route path="logout" element={<h1>Logging Out...</h1>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}