import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditProduct() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/getProducts`);
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/product/${editingProduct._id}/update`,
        editingProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product updated");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/product/${productId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-[#0e1013] min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">Manage Products</h2>

      {editingProduct && (
        <div className="bg-[#1c212d] p-6 rounded-lg mb-8">
          <h3 className="text-2xl mb-4 font-semibold">Edit Product</h3>
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
            className="mb-4 w-full p-3 rounded bg-[#2a2f3d]"
            placeholder="Product Name"
          />
          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
            }
            className="mb-4 w-full p-3 rounded bg-[#2a2f3d]"
            placeholder="Price"
          />
          <input
            type="number"
            value={editingProduct.stock}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })
            }
            className="mb-4 w-full p-3 rounded bg-[#2a2f3d]"
            placeholder="Stock"
          />
          <textarea
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, description: e.target.value })
            }
            className="mb-4 w-full p-3 rounded bg-[#2a2f3d]"
            placeholder="Description"
            rows={4}
          />
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditingProduct(null)}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product._id} className="bg-[#1c212d] rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="mb-1">Price: ${product.price}</p>
            <p className="mb-1">Stock: {product.stock}</p>
            <p className="mb-2 text-sm text-gray-400">{product.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.productId)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
