import React from 'react';
import 'boxicons/css/boxicons.min.css';
import Product from "./Product"
import Login from "./Login";
import { useNavigate } from 'react-router-dom';
import { FeaturePro } from '../utils/FeaturePro';
import CategorySlider from '../utils/CategorySlider';


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <main className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(75vh-6rem)] px-4 lg:px-[5%] mt-12 relative">
        <div className="h-0 w-[35rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#DC2626] -rotate-[30deg] -z-"></div>

        <div className="max-w-xl z-10 gap-2 flex flex-col items-start justify-center">
         

          <div className="flex flex-col items-start justify-center p-2 m-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider my-8 text-[#DC2626]">
              WELCOME TO <br /> NINJA <span className='text-white'>THREADS</span> 
            </h1>

            <p className="text-lg text-gray-100 max-w-[30rem]">
              Discover the ultimate Uchiha Hoodie - inspired by the legendary Uchiha clan. Premium quality, unique design, and perfect for anime fans. Limited stock available - grab yours now!
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            <a className="border border-[#DC2626] py-2 sm:py-3 px-4 sm:px-5 rounded-full text-white font-semibold tracking-wider transition-all duration-300 hover:bg-[#DC2626]" href="#">
              JOIN COMMUNITY <i className="bx bx-link-external"></i>
            </a>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-black py-2 sm:py-3 px-8 sm:px-10 rounded-full text-sm sm:text-lg font-semibold tracking-wider transition-all duration-300 hover:bg-gray-200">
              Get Started
            </button>
          </div>
        </div>

        
        <img src="/0001.png" alt="3D Illustration" className="w-[90%] lg:w-[45%] mt-12 lg:mt-0  animate-float" />
      </main>

      <hr className="w-full h-[5px] border-none bg-gradient-to-r from-[#DC2626] via-[#000000] to-white bg-[length:200%_100%] animate-colorChange" />
      <CategorySlider />
      <FeaturePro />
    <hr className="w-full h-[5px] border-none bg-gradient-to-r from-[#DC2626] via-[#000000] to-white bg-[length:200%_100%] animate-colorChange" />
      <section className="relative h-[60vh] bg-cover bg-center mt-10" style={{ backgroundImage: "url('./public/banare.jpg')" }}>
        <div className="absolute inset-0 bg-[#000000] bg-opacity-80 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl text-[#DC2626] font-extrabold">JOIN THE UCHIHA LEGACY</h2>
        </div>
      </section>
    <hr className="w-full h-[5px] border-none bg-gradient-to-r from-[#DC2626] via-[#000000] to-white bg-[length:200%_100%] animate-colorChange" />
      <Product />
      
    
      <footer className="bg-[#1b1b1b] text-white text-center p-4 mt-10">
        
        <p>© 2025 Uchiha Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
