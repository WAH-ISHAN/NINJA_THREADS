
export function AdminContent(){

return(

    <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-6">🎓Welcome, Admin !</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#1a1a1a] p-4 rounded-xl shadow hover:shadow-blue-500 transition">
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-2xl font-semibold">1,205</p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-xl shadow hover:shadow-[#0eff00] transition">
                <p className="text-sm text-gray-400">New Orders</p>
                <p className="text-2xl font-semibold">321</p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-xl shadow hover:shadow-blue-500 transition">
                <p className="text-sm text-gray-400">Inventory</p>
                <p className="text-2xl font-semibold text-white">5</p>
              </div>
            </div>
          </div>
)
}
export default AdminContent