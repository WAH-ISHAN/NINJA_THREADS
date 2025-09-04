import React from "react";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

import Product from "../ProductLayouts/Product.jsx";
import Banner from "../Interface/Banner";
import CategorySlider from "../utils/CategorySlider";
import BannerHome from "./BannerHome";
import Contact from "./Contact";
import ClientReact from "../utils/clientReact.jsx";
import Wrapper from "../utils/wapper.jsx";
import UpcomingProduct from "../ProductLayouts/UpcomingProduct.jsx";

function GradientDivider() {
  return (
    <div className="relative my-10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />
      <div className="absolute inset-x-0 -top-[1px] mx-auto h-[3px] w-2/3 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent blur-sm" />
    </div>
  );
}

export function HomePage() {
  return (
    
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black text-white">
      {/* Ambient gradient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-r from-rose-600/20 via-orange-500/20 to-pink-600/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-200px] right-[-100px] h-[500px] w-[650px] rounded-full bg-gradient-to-tr from-orange-500/10 via-rose-600/10 to-fuchsia-600/10 blur-[120px]"
      />

      <main className="relative z-10">
        {/* Top hero/banner */}
        <BannerHome />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Elevated wrapper section */}
          <section className="relative my-8">
            <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-rose-500/20 via-orange-400/10 to-rose-500/20 blur-2xl" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-md">
              <Wrapper />
            </div>
          </section>

          {/* Banner */}
          <Banner />

          <GradientDivider />

          {/* Categories */}
          <section id="categories" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white/90">
              Shop by Category
            </h2>
            <CategorySlider />
          </section>

          <GradientDivider />

          {/* Upcoming */}
          <section className="relative">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white/90">
              Upcoming Drops
            </h2>
            <UpcomingProduct />
          </section>

          <GradientDivider />

          {/* CTA Banner */}
          <section className="relative mt-12 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,63,94,0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(251,146,60,0.20),transparent_55%)]" />
            <div className="relative flex h-[55vh] items-center justify-center">
              <div className="absolute inset-0">
                {/* Use /banare.jpg if it's placed in public/banare.jpg */}
                <img
                  src="/banare.jpg"
                  alt="Uchiha legacy banner"
                  className="h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
              </div>

              <div className="relative z-10 px-6 text-center">
                <h3 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-rose-500">
                  JOIN THE UCHIHA LEGACY
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-slate-300">
                  Exclusive edits, clan-grade quality, and limited releases. Don’t
                  miss the next drop.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <a
                    href="#products"
                    className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:from-rose-500 hover:to-orange-400"
                  >
                    Shop now
                    <i className="bx bx-right-arrow-alt transition-transform group-hover:translate-x-1" />
                  </a>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:border-white/25 hover:bg-white/10"
                  >
                    Join free
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <GradientDivider />

          {/* Products */}
          <section id="products" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white/90">
              Featured Products
            </h2>
            <Product />
          </section>

          {/* Social proof / Clients */}
          <section className="mt-12">
            <ClientReact />
          </section>

          <GradientDivider />

          {/* Contact */}
          <section className="mt-12">
            <Contact />
          </section>
        </div>

        {/* Footer */}
        <footer className="relative mt-16 border-t border-white/10 bg-black/40 backdrop-blur">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} Uchiha Store. All rights reserved.
              </p>
              <div className="flex items-center gap-5 text-sm text-slate-400">
                <a href="#categories" className="hover:text-white">
                  Categories
                </a>
                <a href="#products" className="hover:text-white">
                  Products
                </a>
                <Link to="/login" className="hover:text-white">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;