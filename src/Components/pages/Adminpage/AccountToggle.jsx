import React from "react";
import { FaUser } from "react-icons/fa6";
import {  useNavigate } from "react-router-dom/dist";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";

export function AccountToggle(){
    
const navigate = useNavigate()
const handleclick = () => {
    navigate('/login')
};

    return(

        <div className="border-b mb-4 mt-2 pd-4 border-stone-300 shadow ">
            <button onClick={handleclick} className="felx p-0.55 hover:stone-200 rounded transition-color relative gap-2 w-full items-center">
                <FaUser className="size-8 rounded-full" />
                <div className="text-start">
                    <span className="text-sm font-bold block">
                        Tom is loading
                    </span>
                    <span className="text-xs black text-stone-500">
                        test@email.com
                    </span>
                </div>
                <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
                <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
            </button>
        </div>
    )
}