import React from 'react';

export function Product() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-8 py-20">
        <div className="text-center max-w-3xl mb-12">
          <h2 className="text-4xl font-bold mb-6">Our Product</h2>
          <p className="text-gray-400">
            Discover our cutting-edge platform designed to streamline your workflow and boost productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Card 1 */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl duration-300 transition-[margin-top] ease-in hover:mt-[-20px]">
            <h3 className="text-xl font-semibold mb-2">Fast Performance</h3>
            <p className="text-gray-400">
              Experience lightning-fast load times and smooth interactions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl duration-300 transition-[margin-top] ease-in hover:mt-[-20px]">
            <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
            <p className="text-gray-400">
              Intuitive design for effortless navigation and usage.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl duration-300 transition-[margin-top] ease-in hover:mt-[-20px]">
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-400">
              Our team is here to help you anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

      <hr className="w-full h-[5px] border-none bg-gradient-to-r from-blue-500 via-white to-blue-500 bg-[length:100%_100%] animate-colorChange" />
    </>
  );
}

export default Product;
