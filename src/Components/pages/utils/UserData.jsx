import axios from "axios";
import { useEffect, useState } from "react";
import AdminHome from "../Adminpage/AdminHome";
import { Link, useNavigate } from "react-router-dom";

export default function UserData() {
    const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token != null) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					setUser(response.data.user);
				})
				.catch((e) => {
					console.log(e);
					setUser(null);
				});
		}
	}, [token]);


    return (
        <>
            {user == null ? (
                <div className="h-full flex justify-center items-center flex-row">
                    <button
          onClick={() => navigate('/Login')}
          className="hidden md:flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] rounded-md overflow-hidden cursor-pointer
            before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
            hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50">
          SIGN IN
        </button>
                </div>
            ) : (
                <div className="h-full flex justify-center items-center flex-row">
                   <button className="hidden md:flex relative px-6 py-2 font-semibold text-white bg-transparent border-2 border-[#DC2626] rounded-md overflow-hidden cursor-pointer
                     before:absolute before:inset-0 before:border-2 before:border-[#DC2626] before:rounded-md before:scale-0 before:transition-transform before:duration-300
                     hover:before:scale-100 hover:bg-[#DC2626] hover:text-white z-50"
                   onClick={()=>{
                    localStorage.removeItem("token")
                    setUser(null)
                    window.location= "/Login";
                   }}>SIGN OUT
                    
                   </button>
                </div>
            )}
        </>
    );
}