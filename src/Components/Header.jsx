import 'boxicons/css/boxicons.min.css';



const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20 font-bold text-md">

        <h1 className="text-3x1 md:text-4x1 lg:text-5x1 font-light m-0 font-bold text-lg">DEVOXS</h1>

        <nav className="hidden md:flex item-center gap-10">
          <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">Home</a>  
          <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">Interduction</a>  
          <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">Product</a>  
          <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">Contact</a>  
        </nav>
        <div className="flex gap-x-4">
  <button className="hidden md:flex items-center justify-center bg-[#FFFFF] text-white font-semibold py-2 px-4 rounded-full transition-colors hover:bg-[#E5E4E2]/80 hover:text-black z-50 cursor-pointer">
    SIGN IN
  </button>
  <button className="hidden md:flex items-center justify-center bg-[#FFFFF] text-white font-semibold py-2 px-4 rounded-full transition-colors hover:bg-[#E5E4E2]/80 hover:text-black z-50 cursor-pointer">
    LOG IN
  </button>
  
</div>


        

    </header>
  )
}

export default Header