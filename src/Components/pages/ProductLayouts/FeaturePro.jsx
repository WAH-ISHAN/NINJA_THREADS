import React from "react";
import { useNavigate } from "react-router-dom";


const products = [
  { id: 1, name: "Uchiha Hoodie", price: 29.99, image: "/0001.png" },
  { id: 2, name: "Akatsuki Hoodie", price: 29.99, image: "/0001.png" },
  { id: 3, name: "Naruto Hoodie", price: 29.99, image: "/0001.png" },
];

export function FeaturePro({ onAddToCart }) {
  const navigate = useNavigate();

  return (
    <section className="py-10 px-4 md:px-10 bg-[#000000]">
      <h3 className="text-3xl font-semibold mb-6 text-white">Upcoming Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md overflow-hidden bg-[#1b1b1b]"
          >
            <img src={product.image} alt={product.name} className="w-full h-auto" />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-white">{product.name}</h4>
              <p className="text-[#DC2626] mt-2">${product.price}</p>

              <div className="mt-4 flex gap-2">
               
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 px-4 py-2 bg-[#DC2626] text-white rounded hover:bg-red-950 transition-colors duration-300"
                >
                  Add to Cart
                </button>

                
                <button
                  onClick={() => navigate(`/ProductCart/${product.id}`)}
                  className="flex-1 px-4 py-2 bg-[#DC2626] text-white rounded hover:bg-red-950 transition-colors duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
