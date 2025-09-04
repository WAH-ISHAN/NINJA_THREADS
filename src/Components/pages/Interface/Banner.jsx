import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Banner() {
  const slides = [
    {
      id: 1,
      kicker: "Curated Comfort",
      title: "Best Furniture collection for your interior",
      cta: "Shop Now",
    },
    {
      id: 2,
      kicker: "Modern Aesthetics",
      title: "Elegant Designs for Your Modern Living",
      cta: "Explore",
    },
    {
      id: 3,
      kicker: "Cozy Meets Class",
      title: "Transform Spaces with Comfort and Style",
      cta: "Discover",
    },
    {
      id: 4,
      kicker: "Smart Choices",
      title: "Luxury & Affordability Combined",
      cta: "Browse Deals",
    },
    {
      id: 5,
      kicker: "Limited Drop",
      title: "Unleash Your Inner Ninja — Lanka’s Boldest Uchiha Hoodie Drop!",
      cta: "Grab Yours",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <section
      className="relative mt-10 overflow-hidden"
      style={{ backgroundImage: "url('/login.jpg')" }} // Place login.jpg in public/
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/75 backdrop-blur-[2px]" />

      {/* Ambient gradient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[420px] w-[700px] rounded-full bg-gradient-to-r from-rose-600/25 via-orange-400/20 to-pink-600/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-120px] right-[-80px] h-[360px] w-[520px] rounded-full bg-gradient-to-tr from-orange-500/20 via-rose-600/15 to-fuchsia-600/20 blur-[110px]"
      />

      {/* Optional subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-[32vh] max-w-7xl items-center px-4 sm:h-[38vh] md:h-[46vh] lg:h-[52vh]">
        <Slider {...settings} className="w-full">
          {slides.map((item) => (
            <div key={item.id} className="h-full">
              <div className="flex h-full flex-col justify-center py-6">
                {/* Kicker */}
                <span className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
                  {item.kicker}
                </span>

                {/* Title */}
                <h2 className="max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-5xl">
                  {item.title}
                </h2>

                {/* CTA */}
                <div className="mt-5">
                  <Link
                    to="/product"
                    className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:from-rose-500 hover:to-orange-400"
                  >
                    {item.cta} <MoveRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom slick dots styling */}
      <style>{`
        .custom-dots {
          bottom: 14px !important;
        }
        .custom-dots li {
          margin: 0 4px;
        }
        .custom-dots li button:before {
          font-size: 10px;
          opacity: 1;
          color: rgba(255, 255, 255, 0.45);
        }
        .custom-dots li.slick-active button:before {
          color: #f43f5e; /* rose-500 */
          text-shadow: 0 0 6px rgba(244, 63, 94, 0.7);
        }
      `}</style>
    </section>
  );
}

export default Banner;