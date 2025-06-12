
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../utils/MediaUpdate";

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
		const promisesArray = [];
		for (let i = 0; i < images.length; i++) {
			const promise = mediaUpload(images[i]);
			promisesArray[i] = promise;
		}
		try {
			const result = await Promise.all(promisesArray);

			const altNamesInArray = altNames.split(",");
			const product = {
				productId: productId,
				name: name,
				altNames: altNamesInArray,
				price: price,
				labeledPrice: labeledPrice,
				description: description,
				stock: stock,
				images: result,
			};
			const token = localStorage.getItem("token");
			console.log(token);

			await axios
				.post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
			toast.success("Product added successfully");
			navigate("/Create");
				
		} catch (error) {
			console.log(error);
			toast.error("Product adding failed");
		}
	}

	return (
  <div className="w-full h-full rounded-lg flex justify-center items-center bg-[#0e1013]">
    <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center bg-[#1c212d] p-6">
      <h1 className="text-3xl font-bold text-white m-[10px]">Add Product</h1>

      <input
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="w-[400px] h-[50px] bg-[#2a2f3d] border border-gray-600 rounded-xl text-white text-center m-[5px]"
        placeholder="Product ID"
      />

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-[400px] h-[50px] bg-[#2a2f3d] border border-gray-600 rounded-xl text-white text-center m-[5px]"
        placeholder="Product Name"
      />

      <input
        value={altNames}
        onChange={(e) => setAltNames(e.target.value)}
        className="w-[400px] h-[50px] bg-[#2a2f3d] border border-gray-600 rounded-xl text-white text-center m-[5px]"
        placeholder="Alternative Names (comma separated)"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        className="w-[400px] h-[50px] bg-[#2a2f3d] border border-gray-600 rounded-xl text-white text-center m-[5px]"
        placeholder="Price"
      />

      <input
        value={labeledPrice}
        onChange={(e) => setLabeledPrice(e.target.value)}
        type="number"
        className="w-[400px] h-[50px] bg-[#2a2f3d] border border-gray-600 rounded-xl text-white text-center m-[5px]"
        placeholder="Labelled Price"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-[400px] h-[80px] bg-[#2a2f3d] border border-gray-600 rounded-xl text-white p-2 m-[5px]"
        placeholder="Description"
      />

      <input
        type="file"
        onChange={(e) => setImages(e.target.files)}
        multiple
        className="w-[400px] h-[50px] border border-gray-600 rounded-xl text-white text-center m-[5px] cursor-pointer bg-[#2a2f3d]"
      />

      <input
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        type="number"
        className="w-[400px] h-[50px] bg-[#2a2f3d] border border-gray-600 rounded-xl text-white text-center m-[5px]"
        placeholder="Stock"
      />

      <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg mt-4">
        <Link
          to={"/admin/products"}
          className="bg-blue-600 text-white p-[10px] w-[180px] text-center rounded-lg hover:bg-red-700"
        >
          Cancel
        </Link>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 cursor-pointer text-white p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-red-700"
        >
          Add Product
        </button>
      </div>
    </div>
  </div>
);
}