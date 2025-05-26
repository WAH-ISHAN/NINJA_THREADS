
import React from 'react'
import { useNavigate } from 'react-router-dom';

export function BannerHome () {
     const navigate = useNavigate();
  return (
    <main className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(75vh-6rem)] px-2 lg:px-[1%] mt-12 relative">
            <div className="h-0 w-[35rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#DC2626] -rotate-[30deg] -z-"></div>
    
            <div className="max-w-xl z-10 gap-2 flex flex-col items-start justify-center">
              <div className="flex flex-col items-start justify-center p-9 m-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider my-8 text-[#DC2626]">
                  WELCOME TO <br /> NINJA <span className='text-white'>THREADS</span>
                </h1>
                <p className="text-lg text-gray-100 max-w-[30rem]">
                  Discover the ultimate Uchiha Hoodie - inspired by the legendary Uchiha clan. Premium quality, unique design, and perfect for anime fans. Limited stock available - grab yours now!
                </p>
              </div>
    
              <div className="flex gap-4 mt-2 sm:mt-3">
                <a className="border border-[#DC2626] py-2 sm:py-4 px-3 sm:px-2 rounded-full text-white font-semibold tracking-wider transition-all duration-300 hover:bg-[#DC2626]" href="#">
                  JOIN COMMUNITY <i className="bx bx-link-external"></i>
                </a>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white text-black py-2 sm:py-3 px-8 sm:px-10 rounded-full text-sm sm:text-lg font-semibold tracking-wider transition-all duration-300 hover:bg-gray-600">
                  Get Started
                </button>
              </div>
            </div>
    
            <img src="/0001.png" alt="3D Illustration" className="w-[90%] lg:w-[45%] mt-12 lg:mt-0 animate-float" />
          </main>
  )
}

export default BannerHome