import { Link } from 'react-router-dom';

export function Register  ()  {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white">
      <div className="bg-slate-800 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none"
          />
          <button className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-md">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-green-400 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
