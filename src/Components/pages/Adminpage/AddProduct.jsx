import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function AddProduct() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [price, setPrice] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!productId || !name || !price || !stock) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      // Upload images to Supabase
      const uploadedUrls = [];

      for (const file of images) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from("img")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error("Upload error:", error);
          toast.error("Error uploading image");
          return;
        }

        const publicUrl = supabase.storage.from("img").getPublicUrl(data.path).data.publicUrl;
        uploadedUrls.push(publicUrl);
      }

      const altNamesArray = altNames
        ? altNames.split(",").map((n) => n.trim())
        : [];

      const product = {
        productId,
        name,
        altNames: altNamesArray,
        price: Number(price),
        labeledPrice: labeledPrice ? Number(labeledPrice) : 0,
        description,
        stock: Number(stock),
        images: uploadedUrls,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add products");
        return;
      }

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/product/Create",
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product added successfully");
      navigate("/Product");
    } catch (error) {
      console.error(error);
      toast.error("Product adding failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0e1013] p-6">
      <div className="w-full max-w-md bg-[#1c212d] p-6 rounded-lg shadow-lg overflow-auto">
        <h1 className="text-white text-3xl mb-6 font-bold text-center">Add Product</h1>

        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="mb-4 w-full p-3 rounded bg-[#2a2f3d] text-white"
          required
        />

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full p-3 rounded bg-[#2a2f3d] text-white"
          required
        />

        <input
          type="text"
          placeholder="Alternative Names (comma separated)"
          value={altNames}
          onChange={(e) => setAltNames(e.target.value)}
          className="mb-4 w-full p-3 rounded bg-[#2a2f3d] text-white"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mb-4 w-full p-3 rounded bg-[#2a2f3d] text-white"
          required
        />

        <input
          type="number"
          placeholder="Labeled Price (optional)"
          value={labeledPrice}
          onChange={(e) => setLabeledPrice(e.target.value)}
          className="mb-4 w-full p-3 rounded bg-[#2a2f3d] text-white"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 w-full p-3 rounded bg-[#2a2f3d] text-white"
          rows={4}
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="mb-4 w-full p-2 rounded cursor-pointer bg-[#2a2f3d] text-white"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="mb-6 w-full p-3 rounded bg-[#2a2f3d] text-white"
          required
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
