import { useState } from "react";

export function Counter() {
    const [number, setNumber] = useState(0);

    function increment() {
        let newNumber = number + 1;
        setNumber(newNumber + 1);
    }
    function decrement() {
        let newNumber = number - 1;
        setNumber(newNumber - 1);
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-[10px] ">
            <span className="text-2xl font-bold text-gray-800 mb-4 p-[10px]">
            {number}
            </span>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
                <button onClick={increment} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Increment</button>
                <button onClick={decrement} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Decrement</button>
            </div>
        </div>
    );
}

export default Counter;