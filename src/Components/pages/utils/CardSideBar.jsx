import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems, onRemove }) => {
  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

     
      <div
        className={`fixed top-4 bottom-4 right-0 h-[calc(100%-2rem)] w-80 bg-white/30 backdrop-blur-md shadow-2xl border-l border-white z-50 transform transition-transform duration-300 rounded-lg ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
      
        <div className="absolute w-72 h-72 bg-[#DC2626]/30 rotate-45 top-[-5rem] right-[-5rem] z-0 blur-2xl rounded-full"></div>

      
        <div className="flex justify-between items-center p-4 border-b border-white/50 relative z-10">
          <h2 className="text-xl font-bold text-white">Cart Details</h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold text-lg hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>

        
        <div className="p-4 overflow-y-auto h-[calc(100%-10rem)] text-black relative z-10">
          {cartItems.length === 0 ? (
            <p className="text-center text-white">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-300 py-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-700">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-700">
                    Price: ${item.price?.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        
        <div className="p-2 border-t border-white/50 bg-white/40 backdrop-blur-sm relative z-10 rounded-b-lg">
          <div className="flex justify-between font-semibold text-lg mb-4 text-black">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
          <button
            className={`w-full relative px-6 py-1 font-semibold text-white border-2 border-[#DC2626] rounded-md overflow-hidden cursor-pointer
              before:absolute before:inset-0 before:bg-[#DC2626] before:scale-x-0 before:origin-left before:transition-transform before:duration-300
              hover:before:scale-x-100 hover:text-white z-10
              ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => alert('Proceeding to checkout...')}
            disabled={cartItems.length === 0}
          >
            <span className="relative z-10">Proceed to Checkout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
