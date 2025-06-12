

import React, { useEffect, useState } from "react";
import axios from "axios";
import CartSidebar from "../utils/CardSideBar";
import { useNavigate } from "react-router-dom";

export function FeaturePro() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/api/product/getProducts"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.id === product.productId
    );
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          id: product.productId,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
    setIsCartOpen(true);

    
    const updatedCart = [...cartItems];
    const index = updatedCart.findIndex(
      (item) => item.id === product.productId
    );

    if (index > -1) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({
        id: product.productId,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const openBuyNowModal = (product) => {
    localStorage.setItem("buyNowProduct", JSON.stringify(product));
    navigate("/placeorder");
  };

  if (loading) {
    return <p className="text-white p-4">Loading products...</p>;
  }

  return (
    <>
      <section className="py-10 px-4 md:px-10 bg-black min-h-screen">
        <h3 className="text-3xl font-semibold mb-6 text-white">Upcoming Products</h3>
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
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "/placeholder.png"
                    }
                    alt={product.name}
                    className="h-40 object-contain mx-auto"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {product.name}
                    </h4>
                    <p className="text-[#DC2626] mt-1 text-md font-medium">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex mt-4 gap-2 flex-wrap">
                    <button
                      onClick={() => openBuyNowModal(product)}
                      className="px-4 py-2 bg-[#DC2626] text-white rounded hover:bg-red-700 transition duration-300 w-full"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-transparent border border-[#DC2626] text-[#DC2626] rounded hover:bg-[#DC2626] hover:text-white transition duration-300 w-full"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
      />
    </>
  );
}

export default FeaturePro;
