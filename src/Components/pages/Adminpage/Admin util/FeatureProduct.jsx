import { useState } from "react";
import axios from "axios";

export function FeatureProduct(){
 const [formData, setFormData] = useState({
    productId: "",
    name: "",
    altNames: "",
    price: "",
    description: "",
    images: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      altNames: formData.altNames.split(",").map((s) => s.trim()),
      images: formData.images.split(",").map((s) => s.trim()),
      price: parseFloat(formData.price),
    };

    console.log("Submitting Product:", payload);
    axios.post("/api/product", payload)
   .then(res => console.log(res))
    .catch(err => console.error(err));
  };

    return(

    <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg mt-6 text-white">
      <h2 className="text-2xl font-semibold mb-6">Upcoming New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product ID</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Alternative Names (comma-separated)</label>
          <input
            type="text"
            name="altNames"
            value={formData.altNames}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URLs (comma-separated)</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
    )
}