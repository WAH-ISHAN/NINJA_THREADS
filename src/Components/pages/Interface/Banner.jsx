import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MoveRight } from "lucide-react";

export function Banner() {
  const products = [
  {
  id: 1,
  title: "Best Furniture collection for your interior"
},
{
  id: 2,
  title: "Elegant Designs for Your Modern Living"
},
{
  id: 3,
  title: "Transform Spaces with Comfort and Style"
},
{
  id: 4,
  title: "Luxury & Affordability Combined"
},
{
  id: 5,
  title: "Unleash Your Inner Ninja - Lanka's Boldest Uchiha Hoodie Drop!"
}

  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

 return (
  <>
    <section
      className="relative h-[30vh] bg-cover bg-center mt-10  "
      style={{ backgroundImage: "url('./public/login.jpg')" }}
    >
   
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

   
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 h-full flex items-center">
        <Slider {...settings} className="w-full">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col lg:flex-row items-center justify-between gap-8 py-8"
            >
              
              <div className="flex-1 text-left">
                <p className="text-sm uppercase text-white mb-2">
                  {product.subTitle}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-white max-w-xl leading-tight mb-6">
                  {product.title}
                </h2>
                <button className="flex items-center gap-2 bg-[#ff2424] hover:bg-[#e94040] text-white px-6 py-3 rounded-lg transition">
                  Shop Now <MoveRight />
                </button>
              </div>
                <div className="flex-1 flex justify-center">
                
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  </>
);

};

export default Banner;
