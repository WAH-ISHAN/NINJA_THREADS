import React from 'react';
import 'boxicons/css/boxicons.min.css';
import Product from "./Product";
import Login from "./Login";
import Banner from '../Interface/Banner';
import { FeaturePro } from '../ProductLayouts/FeaturePro';
import CategorySlider from '../utils/CategorySlider';
import BannerHome from './BannerHome';
import Contact from "./Contact"
import ClientReact from '../utils/clientReact.jsx';
import Wrapper from '../utils/wapper.jsx';



export function HomePage() {
 
  
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      
      <BannerHome />
      <div className="relative z-20 -m-20">
          <Wrapper />
         </div>
      <Banner />
      <hr className="w-full h-[5px] border-none bg-gradient-to-r from-[#DC2626] via-[#000000] to-white bg-[length:200%_100%] animate-colorChange" />
      <br />
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
     <ClientReact />
      <Contact/>
      <footer className="bg-[#1b1b1b] text-white text-center p-4 mt-10">
        <p>© 2025 Uchiha Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
