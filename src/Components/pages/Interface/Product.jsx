export function Product() {
  const products = [
    {
      id: 1,
      name: "Red Sneakers",
      price: "$29.99",
      img: "/0001.png",
    },
    {
      id: 3,
      name: "Sport Watch",
      price: "$49.99",
      img: "/0003.png",
    },
    {
      id: 4,
      name: "Wireless Earbuds",
      price: "$59.99",
      img: "/0004.png",
    },
  ];

  return (
    <section className="py-10 px-4 md:px-10 bg-[#000000]">
      <h3 className="text-3xl font-semibold mb-6 text-white">Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-md overflow-hidden bg-[#1b1b1b]">
            <img
              src={product.img}
              alt={product.name}
              className="w-auto h-auto flex justify-center items-center mx-auto mt-4"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-white">{product.name}</h4>
              <p className="text-[#DC2626] mt-2">{product.price}</p>
              <div className="flex mt-4 gap-2 flex-wrap">
                <button className="px-4 py-2 bg-[#DC2626] text-white rounded hover:bg-red-700 transition duration-300">
                  Buy Now
                </button>
                <button className="px-4 py-2 bg-[#DC2626] text-white rounded hover:bg-red-700 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Product;
