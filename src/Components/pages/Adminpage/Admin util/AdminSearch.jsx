import { FaSearch } from "react-icons/fa";


export function AdminSearch(){

    return(
        <>
            <div>
                <div className="relative flex items-center bg-[#272727] rounded-full">
                    <input 
                        className="w-full bg-transparent placeholder:text-stone-100 focus:outline-none pr-8 placeholder:text-center"
                        placeholder="Search"
                        type="text"
                    />
                    <span className="absolute right-2 text-stone-400">
                        <FaSearch />
                    </span>
                </div>
            </div>
        </>
    )
}