//learn buy yt
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const categories = [
  { label: 'LADY ', img: '/0002.png' },
  { label: 'MEN SHORT ARM', img: '/0005.png' },
  { label: 'HOODIES', img: '/0001.png' },
   { label: 'KIDS SHORT ARM', img: '/0004.png' },
  { label: 'KIDS LONG ARM', img: '/0004.png' },
];

export default function CategorySlider() {
  return (
    <div className="w-full px-4 py-0.1 bg-[#1b1b1b] rounded-full shadow-full">
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
