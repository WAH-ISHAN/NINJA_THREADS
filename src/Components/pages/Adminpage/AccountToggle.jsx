import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";

export function AccountToggle() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/allusers`)
      .then((res) => {
        const allUsers = res?.data?.users || [];
        
        setUser(allUsers[0] || null);
      })
      .catch((err) => {
        console.error("Error fetching users", err);
        setError("Failed to fetch users.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="border-b mb-4 mt-2 p-4 border-stone-600 shadow">
       {loading ? (
        <p className="text-white">Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
            ) : (
              <>
                <button
                  onClick={handleClick}
                  className="flex p-2 hover:bg-gray-700 rounded transition-colors relative gap-2 w-full items-center"
                >
                  <FaUser className="size-8 rounded-full text-white" />
                  <div className="text-start text-white">
                    <span className="text-sm font-bold block">
                      {user ? `${user.firstName} ${user.lastName}` : "No user found"}
                    </span>
                    <span className="text-xs text-stone-400">
                      {user ? user.email : ""}
                    </span>
                  </div>
                  <FiChevronDown className="absolute right-2 top-1/2 translate-y-[-50%] text-xs text-white" />
                </button>
              </>
            )}
          </div>
        );
      }
