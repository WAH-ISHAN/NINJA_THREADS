
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const categories = [
  { label: 'LADY SHORT ARM', img: '/images/lady_short_arm.png' },
  { label: 'MEN SHORT ARM', img: '/images/men_short_arm.png' },
  { label: 'HOODIES', img: '/images/hoodies.png' },
   { label: 'KIDS SHORT ARM', img: '/images/lady_short_arm.png' },
  { label: 'KIDS LONG ARM', img: '/images/men_short_arm.png' },
];

export default function CategorySlider() {
  return (
    <div className="w-full px-4 py-6">
      <Swiper
        slidesPerView={2}
        spaceBetween={16}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        modules={[Pagination]}
        className="pb-10"
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105 cursor-pointer">
              <img
                src={cat.img}
                alt={cat.label}
                className="h-24 object-contain mb-4"
              />
              <p className="text-sm font-semibold text-center tracking-wide">
                {cat.label}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
