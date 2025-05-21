
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export function AccountToggle() {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/login');
  };


  return (
    <div className="border-b mb-4 mt-2 p-4 border-stone-600 shadow">
      <button
        onClick={handleClick}
        className="flex p-2 hover:bg-gray-700 rounded transition-colors relative gap-2 w-full items-center"
      >
        <FaUser className="size-8 rounded-full text-white" />
        <div className="text-start text-white">
          <span className="text-sm font-bold block">
            {"Account Name"}
          </span>
          <span className="text-xs text-stone-400">
            {"user@email.com"}
          </span>
        </div>
        <FiChevronDown className="absolute right-2 top-1/2 translate-y-[-50%] text-xs text-white" />
      </button>
    </div>
  );
}
