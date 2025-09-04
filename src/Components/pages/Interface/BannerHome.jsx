import { Link, useNavigate } from "react-router-dom";

export function BannerHome() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[950px] rounded-full bg-gradient-to-r from-rose-600/20 via-orange-500/15 to-pink-600/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-[-10%] h-[480px] w-[680px] rounded-full bg-gradient-to-tr from-orange-500/15 via-rose-600/15 to-fuchsia-600/15 blur-[110px]"
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "center",
        }}
      />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-10">
          {/* Left content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
              New drop is live
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-rose-500">
                Ninja Threads
              </span>
            </h1>

            <p className="mt-4 text-lg text-slate-200/90">
              Discover the ultimate Uchiha Hoodie — inspired by the legendary
              clan. Premium quality, unique design, and perfect for anime fans.
              Limited stock. Don’t miss your drop.
            </p>

            {/* Feature bullets */}
            <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
              <li className="inline-flex items-center gap-2">
                <i className="bx bx-check-circle text-rose-400" />
                Premium build
              </li>
              <li className="inline-flex items-center gap-2">
                <i className="bx bx-check-circle text-rose-400" />
                Limited stock
              </li>
              <li className="inline-flex items-center gap-2">
                <i className="bx bx-check-circle text-rose-400" />
                Fast shipping
              </li>
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/product"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:from-rose-500 hover:to-orange-400"
              >
                Shop now
                <i className="bx bx-right-arrow-alt transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/10"
              >
                Get started
              </button>

              <a
                href="#community"
                className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-6 py-3 text-sm font-semibold text-rose-200 transition hover:border-rose-400/60 hover:bg-rose-500/15"
              >
                Join community <i className="bx bx-link-external" />
              </a>
            </div>
          </div>

          {/* Right visual */}
          <div className="w-full lg:w-[45%]">
            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/25 via-orange-400/20 to-rose-500/25 blur-3xl" />
              {/* Accent ring */}
              <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              {/* Shine */}
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <img
                src="/0001.png"
                alt="Ninja Threads 3D illustration"
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_25px_40px_rgba(244,63,94,0.25)] animate-float"
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default BannerHome;