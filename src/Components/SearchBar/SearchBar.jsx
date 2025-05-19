export function SearchBar() {
  return (
    <main className="flex justify-center items-center mt-10">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Find Your Services"
          className="w-full px-5 py-3 text-white bg-[#0f0f0f] placeholder-gray-400 border border-[#1f1f1f] rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer"
        />
      </div>
    </main>
  );
}
export default SearchBar;
