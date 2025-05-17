import 'boxicons/css/boxicons.min.css';
import Introduction from './pages/Introduction';
import Product from './pages/Product';
import Contact from './pages/Contact';

export function HomePage() {
  return (
    <>
      <main className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(75vh-6rem)] px-4 lg:px-[5%] mt-12">

        
        <div className="max-w-xl z-10 gap-2 flex flex-col items-start justify-center">
          
          <div className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-blue-500 via-white to-blue-500 shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full">
            <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1">
              <i className='bx bxs-color'></i> INTRODUCTION
            </div>
          </div>

          
          <div className="flex flex-col items-start justify-center p-2 m-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider my-8">
              WELCOME TO <br /> DEVOXS
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-[30rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
            </p>
          </div>

          
          <div className="flex gap-4 mt-8">
            <a className="border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]" href="#">
              Documentation <i className="bx bx-link-external"></i>
            </a>
            <a className="border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-white" href="#">
              GetStarted <i className="bx bx-link-external"></i>
            </a><br />
            
          </div>
          <div className="flex justify-center items-center mt-4 ">
            <a className="border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-white" href="https://wah-ishan.github.io/WAHIshan.webpage/">
              My_Details <i className="bx bx-link-external"></i>
            </a>
          </div>
          
        </div>

        
        <img
          src="/0001.png"
          alt="3D Illustration"
          className="w-[90%] lg:w-[50%] mt-12 lg:mt-0 animate-float"
        />
      </main>

      
      <hr
        className="w-full h-[5px] border-none bg-gradient-to-r from-blue-500 via-white to-blue-500 bg-[length:200%_100%] animate-colorChange"/>

      {/*body*/}

    <Introduction/>
    <Product/>
    <Contact/>
      









    </>
    
  );
};

export default HomePage
