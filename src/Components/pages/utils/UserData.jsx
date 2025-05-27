import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function UserData() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

   useEffect(() => {
    if (token != null) {
        axios.get(import.meta.env.VITE_API_URL + "/api/user/current", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((response) => {
            console.log("User data fetched successfully", response.data);
            setUser(response.data.user);
        })
        .catch((error) => {
            console.error("Error fetching user data", error);
            setUser(null);
        });
    }
}, [token]);


    return (
        <>
            {user == null ? (
                <div className="h-full flex justify-center items-center flex-row">
                    <button
          onClick={() => navigate('/login')}
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
                    window.location= "/login";
                   }}>SIGN OUT
                    
                   </button>
                </div>
            )}
        </>
    );
}