import React from "react"



export default function ForgetPass(){


    return(
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-slate-900 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center"></h2>
        <form className="space-y-5" >
          <input
           
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
          />
          <input
           
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md"
          >
           
          </button>

          <button
    type="submit"
   
    
    className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md flex items-center justify-center gap-2"
  >
    <FcGoogle className="text-2xl" />
     
    
  </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-700 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}