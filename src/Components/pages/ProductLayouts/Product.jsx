import React, { useEffect, useState } from "react";
import axios from "axios";

export function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      // Changed endpoint to match backend route
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/product/getProducts");
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-white p-4">Loading products...</p>;
  }

  return (
    <section className="py-10 px-4 md:px-10 bg-black">
      <h3 className="text-3xl font-semibold mb-6 text-white">Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-white">No products available</p>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="border rounded-xl shadow-md overflow-hidden bg-[#1b1b1b] flex flex-col"
            >
              <div className="flex justify-center items-center bg-black p-4 h-48">
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.png"}
                  alt={product.name}
                  className="h-40 object-contain mx-auto"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="text-lg font-semibold text-white">{product.name}</h4>
                  <p className="text-[#DC2626] mt-1 text-md font-medium">${product.price.toFixed(2)}</p>
                </div>
                <div className="flex mt-4 gap-2 flex-wrap">
                  <button className="px-4 py-2 bg-[#DC2626] text-white rounded hover:bg-red-700 transition duration-300 w-full">
                    Buy Now
                  </button>
                  <button className="px-4 py-2 bg-transparent border border-[#DC2626] text-[#DC2626] rounded hover:bg-[#DC2626] hover:text-white transition duration-300 w-full">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Product;
