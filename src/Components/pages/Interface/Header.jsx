import 'boxicons/css/boxicons.min.css';
import { useNavigate, Link } from "react-router-dom";
import { LiaCartPlusSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import SearchBar from "../utils/SearchBar";

export function Header() {
  const navigate = useNavigate();
  

  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20 font-bold text-md bg-black text-white">
      <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wider text-[#DC2626]">
            <img
           src="/logo.png"
            alt="Ninja Threads Logo"
           className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto "
            />
              </h1>


      <nav className="hidden md:flex justify-event items-center gap-16 text-lg">
        <Link className="hidden md:flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] rounded-md overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50" to="/">
          Home
        </Link>
        <Link className="hidden md:flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] rounded-md overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50" to="/product">
          Shop
        </Link>
        <Link className="hidden md:flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] rounded-md overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50" to="/contact">
          Contact
        </Link>
      </nav>

      <div className="flex gap-4">
        <button
          onClick={SearchBar}
          className="hidden md:flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] rounded-md overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50">
          <IoIosSearch className="text-2xl" />
        </button>

        <button
          className="hidden md:flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] rounded-md overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50">
          <LiaCartPlusSolid className="text-2xl" />
          <span className='top-2/3 right-1/2 bg-red-700 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'> 0 </span>
        </button>

        <button
          onClick={() => navigate('/login')}
          className="hidden md:flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] rounded-md overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50">
          SIGN IN
        </button>
      </div>
    </header>
  );
}

export default Header;