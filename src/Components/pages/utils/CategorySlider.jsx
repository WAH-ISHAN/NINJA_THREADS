

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const categories = [
  { label: 'LADY', img: '/0002.png' },
  { label: 'MEN SHORT ARM', img: '/0005.png' },
  { label: 'HOODIES', img: '/0001.png' },
  { label: 'KIDS SHORT ARM', img: '/0004.png' },
  { label: 'KIDS LONG ARM', img: '/0004.png' },
];

export default function CategorySlider() {
  return (
    <div className="w-full px-4 py-6 ">
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
              
             
             <div className="w-24 h-24 rounded-full border-4 border-[#1b1b1b] overflow-hidden flex items-center justify-center shadow-md mb-4 hover:border-red-500 transition-colors duration-300">
                <img
                  src={cat.img}
                  alt={cat.label}
                 className="w-auto h-auto flex justify-center items-center mx-auto mt-4"
                />
              </div>


             
              <p className="text-sm font-semibold text-center tracking-wide text-white">
                {cat.label}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
