

export default function Profile() {


  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <form
        
        className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg space-y-4"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">
            Email (read-only)
          </label>
          <input
            type="email"
           
            readOnly
            className="w-full bg-gray-700 px-4 py-2 rounded text-gray-300 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
          
           
            className="w-full bg-gray-700 px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            
            className="w-full bg-gray-700 px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Password (leave empty if unchanged)
          </label>
          <input
            type="password"
            name="password"
    
            className="w-full bg-gray-700 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            
            className="w-full bg-gray-700 px-4 py-2 rounded"
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
