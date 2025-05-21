import 'boxicons/css/boxicons.min.css';
import { useNavigate , Link } from "react-router-dom";
import { LiaCartPlusSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import SearchBar from "../utils/SearchBar"

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20 font-bold text-md">

      <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl  tracking-wider ">
        DEVOXS
      </h1>

<div>

   <nav className="hidden md:flex items-center gap-16 text-1xl sm:text-2xl md:text-3xl lg:text-4xl">
        <Link className="text-base tracking-wider transition-colors text-gray-400 hover:text-white z-50" to="/">Home</Link>
        <Link className="text-base tracking-wider transition-colors text-gray-400 hover:text-white z-50" to="/introduction">Introduction</Link>
        <Link className="text-base tracking-wider transition-colors text-gray-400 hover:text-white z-50" to="/product">Product</Link>
        <Link className="text-base tracking-wider transition-colors text-gray-400 hover:text-white z-50" to="/contact">Contact</Link>
      
      </nav>
</div>
    
      

      <div className="flex gap-4 ">
        <button
          onClick={SearchBar}
          className="hidden md:flex items-center justify-center bg-black text-white font-semibold py-2 px-4 rounded-full transition-colors hover:bg-gray-200 hover:text-black z-50 cursor-pointer">
            <IoIosSearch className="text-2xl"  />
        </button>

         <button
          className="hidden md:flex items-center justify-center bg-black text-white font-semibold py-2 px-4 rounded-full transition-colors hover:bg-gray-200 hover:text-black z-50 cursor-pointer">
            <LiaCartPlusSolid className="text-2xl"  />
        </button>
         
       
        <button
          onClick={() => navigate('/login')}
          className="hidden md:flex items-center justify-center bg-black text-white font-semibold py-2 px-4 rounded-full transition-colors hover:bg-gray-200 hover:text-black z-50 cursor-pointer">
          SIGN IN
        </button>
        
      </div>
    

    </header>
  );
};

export default Header;
