import React, { useEffect, useState } from "react";
import "boxicons/css/boxicons.min.css";
import { Link, useNavigate } from "react-router-dom";
import { LiaCartPlusSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import UserData from "../utils/UserData";

export function Header({ onCartClick, cartItemCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!query.trim()) {
      setSearchOpen(false);
      return;
    }
    navigate(`/product?search=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative mt-3 rounded-2xl border border-white/10 px-4 py-3 sm:px-6 md:px-8 transition
            ${scrolled ? "bg-black/60 backdrop-blur-xl" : "bg-black/40 backdrop-blur-md"}
            shadow-[0_10px_30px_-10px_rgba(244,63,94,0.25)]
          `}
        >
          <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Ninja Threads Logo"
                className="h-10 sm:h-12 md:h-12 lg:h-14 w-auto"
              />
              <span className="sr-only">Ninja Threads</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-3">
              <Link
                to="/"
                className="group inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Home
              </Link>
              <Link
                to="/product"
                className="group inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Shop
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2.5 text-white transition hover:border-white/20 hover:bg-white/10"
              >
                <IoIosSearch className="text-2xl" />
              </button>

              {/* Cart */}
              <button
                onClick={onCartClick}
                aria-label="Open cart"
                className="relative inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2.5 text-white transition hover:border-rose-400/50 hover:bg-rose-500/10"
              >
                <LiaCartPlusSolid className="text-2xl" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-black">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </button>

              {/* User */}
              <div className="ml-1 hidden sm:block">
                <UserData />
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2.5 text-white transition hover:border-white/20 hover:bg-white/10 md:hidden"
              >
                <i className="bx bx-menu text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile slide-over menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed right-0 top-0 z-[70] h-full w-[85%] max-w-sm border-l border-white/10 bg-slate-900/95 p-6 shadow-2xl transition">
            <div className="mb-6 flex items-center justify-between">
              <Link to="/" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-3">
                <img src="/logo.png" alt="Ninja Threads Logo" className="h-10 w-auto" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white hover:border-white/20 hover:bg-white/10"
              >
                <i className="bx bx-x text-2xl" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base font-medium text-white hover:border-white/20 hover:bg-white/10"
              >
                Home
              </Link>
              <Link
                to="/product"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base font-medium text-white hover:border-white/20 hover:bg-white/10"
              >
                Shop
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base font-medium text-white hover:border-white/20 hover:bg-white/10"
              >
                Contact
              </Link>

              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Cart</span>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onCartClick?.();
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:border-white/20 hover:bg-white/10"
                  >
                    <LiaCartPlusSolid className="text-xl" />
                    {cartItemCount > 0 && (
                      <span className="rounded-full bg-rose-600 px-2 py-0.5 text-xs font-semibold">
                        {cartItemCount > 99 ? "99+" : cartItemCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="mt-4">
                  <UserData />
                </div>
              </div>
            </nav>
          </aside>
        </>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-24">
            <form
              onSubmit={handleSearchSubmit}
              className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/90 p-4 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <IoIosSearch className="text-2xl text-slate-300" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  placeholder="Search products, categories, drops..."
                  className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-white hover:border-white/20 hover:bg-white/10"
                >
                  <i className="bx bx-x text-2xl" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Tip: Press Enter to search</span>
                <span>Esc to close</span>
              </div>
            </form>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;