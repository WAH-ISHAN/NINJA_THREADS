import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Keyboard, A11y } from "swiper/modules";

const categories = [
  { label: "LADY", img: "/0002.png" },
  { label: "MEN SHORT ARM", img: "/0005.png" },
  { label: "HOODIES", img: "/0001.png" },
  { label: "KIDS SHORT ARM", img: "/0004.png" },
  { label: "KIDS LONG ARM", img: "/0004.png" },
];

export default function CategorySlider({ items = categories, onSelect }) {
  return (
    <div className="w-full px-4 py-6">
      <Swiper
        slidesPerView={2}
        spaceBetween={16}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 18 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 22 },
        }}
        modules={[Pagination, Navigation, Keyboard, A11y]}
        className="pb-10"
      >
        {items.map((cat, index) => (
          <SwiperSlide key={index}>
            <button
              onClick={() => onSelect?.(cat)}
              className="group w-full flex flex-col items-center gap-3 cursor-pointer outline-none"
              aria-label={`Category: ${cat.label}`}
            >
              {/* Gradient ring */}
              <div className="p-[2px] rounded-full bg-gradient-to-br from-rose-500/60 via-fuchsia-500/60 to-indigo-500/60 group-hover:from-indigo-500 group-hover:to-rose-500 transition">
                {/* Inner avatar */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white/5 border border-white/10 shadow-lg backdrop-blur-md flex items-center justify-center">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    loading="lazy"
                    className="h-5/6 w-5/6 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Label */}
              <p className="text-[13px] sm:text-sm font-semibold text-center tracking-wide">
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent group-hover:from-fuchsia-300 group-hover:to-indigo-300 transition">
                  {cat.label}
                </span>
              </p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Subtle helper text (optional) */}
      {/* <div className="mt-2 text-center text-xs text-gray-400">Use arrows or swipe to explore categories</div> */}
    </div>
  );
}