export function FeaturePro() {
  return (
    <section className="py-10 px-4 md:px-10 bg-[#000000]">
      <h3 className="text-3xl font-semibold mb-6 text-white">Featured Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {[1, 2, 3].map((i) => (
          <div key={i} className="border  rounded-lg shadow-md overflow-hidden bg-[#1b1b1b]">
            <img src={""}/>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-white">Product Name</h4>
              <p className="text-[#DC2626] mt-2">$29.99</p>
              <button className="mt-4 px-4 py-2 bg-[#DC2626] text-white rounded hover:bg-red-700 transition-colors duration-300">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
