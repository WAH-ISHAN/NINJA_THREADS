import React, { useMemo, useRef } from "react";
import Slider from "react-slick";
import {
  User as UserIcon,
  Star as StarIcon,
  CaretLeft,
  CaretRight,
} from "phosphor-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SectionTitle = ({ title, subtitle, align = "left", mb = "mb-6" }) => {
  const justify =
    align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";
  return (
    <div className={`w-full flex items-center ${justify}`}>
      <div>
        <h3 className={`text-2xl md:text-3xl text-white font-semibold ${mb}`}>{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-400 -mt-4 mb-6">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

const Arrow = ({ className = "", style, onClick, direction = "next" }) => {
  return (
    <button
      className={`${className} !z-10 !flex !items-center !justify-center !h-9 !w-9 !rounded-full !bg-white/10 hover:!bg-white/20 !backdrop-blur-md !border !border-white/20`}
      style={{ ...style }}
      onClick={onClick}
      aria-label={direction === "next" ? "Next testimonials" : "Previous testimonials"}
    >
      {direction === "next" ? <CaretRight size={18} /> : <CaretLeft size={18} />}
    </button>
  );
};

const getInitials = (name = "") => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (!parts.length) return "U";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] || "" : "";
  return (first + last).toUpperCase();
};

const Rating = ({ value = 5 }) => {
  const stars = useMemo(() => {
    const s = [];
    const v = Math.max(0, Math.min(5, Number(value || 0)));
    for (let i = 1; i <= 5; i++) {
      s.push(
        <StarIcon
          key={i}
          weight={i <= v ? "fill" : "regular"}
          className={i <= v ? "text-amber-400" : "text-gray-500"}
          size={16}
        />
      );
    }
    return s;
  }, [value]);
  return <div className="flex items-center gap-1">{stars}</div>;
};

const TestimonialCard = ({ item }) => {
  const { description, name, position, rating = 5, avatar } = item || {};
  const initials = getInitials(name);

  return (
    <div className="h-full p-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-emerald-500/20">
      <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col justify-between hover:bg-white/10 transition">
        <div className="flex items-center justify-between mb-3">
          <Rating value={rating} />
          <span className="text-[10px] text-gray-400">Verified</span>
        </div>

        <p className="text-gray-200 leading-relaxed italic">
          “{description || "Amazing service and quality. Will definitely recommend!"}”
        </p>

        <div className="flex items-center gap-3 mt-5">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt={name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-semibold text-white">{initials}</span>
            )}
          </div>
          <div>
            <div className="text-white text-sm font-medium">
              {name || "Anonymous User"}
            </div>
            <div className="text-xs text-gray-400">
              {position || "Customer"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function ClientReact({ items }) {
  const sliderRef = useRef(null);

  const clientSays =
    items ||
    [
      { id: 1, description: "Top-notch quality and fast delivery!", name: "Alex Johnson", position: "Designer", rating: 5 },
      { id: 2, description: "Great experience shopping here.", name: "Taylor Smith", position: "Entrepreneur", rating: 4 },
      { id: 3, description: "Support team was super helpful.", name: "Jordan Lee", position: "Marketer", rating: 5 },
      { id: 4, description: "Products exceeded expectations.", name: "Sam Carter", position: "Engineer", rating: 5 },
    ];

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    swipeToSlide: true,
    adaptiveHeight: true,
    accessibility: true,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
    appendDots: (dots) => (
      <ul className="!mt-6 flex items-center justify-center gap-2">{dots}</ul>
    ),
  };

  return (
    <div className="lg:container mx-auto bg-[#000000] rounded-2xl p-6 md:p-8">
      <SectionTitle
        title="What our clients say about us"
        subtitle="Real feedback from people who love our products"
        align="left"
        mb="mb-8"
      />

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {clientSays.map((client) => (
            <div key={client.id} className="px-2">
              <TestimonialCard item={client} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ClientReact;