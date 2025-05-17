import { useState } from "react";
import { FaPlus } from "react-icons/fa"; 
import { FaMinus } from "react-icons/fa";

export function Counter() {
   const [number, setNumber] = useState(0);

  function increment() {
    setNumber(number + 1);
  }

  function decrement() {
    setNumber(number - 1);
  }
    return (
        <div className=" flex flex-col items-center justify-center transpernt p-[10px]">
            <span className="text-2xl font-bold text-white mb-4 p-[10px]">
                {number}
            </span>
            <div className="rounded-full p-3 max-w-sm w-full flex justify-between gap-3">
                <button
                    onClick={increment}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded"
                >
                    <FaPlus />
                </button>
                <button
                    onClick={decrement}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-8 rounded"
                >
                    <FaMinus />
                </button>
            </div>
        </div>
    );
}

export default Counter;