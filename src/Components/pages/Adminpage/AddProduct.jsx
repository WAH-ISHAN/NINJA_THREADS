import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../utils/MediaUpdate";

export default function AddProductForm() {
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
			navigate("/admin/products");
				
		} catch (error) {
			console.log(error);
			toast.error("Product adding failed");
		}
	}

	return (
		<div className="w-full h-full rounded-lg  flex justify-center items-center">
			<div className="w-[500px] h-[600px]  rounded-lg shadow-lg flex flex-col items-center">
				<h1 className="text-3xl font-bold text-gray-700 m-[10px]">
					Add Product
				</h1>
				<input
					value={productId}
					onChange={(e) => {
						setProductId(e.target.value);
					}}
					className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
					placeholder="product ID"
				/>
				<input
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
					placeholder="Product Name"
				/>
				<input
					value={altNames}
					onChange={(e) => {
						setAltNames(e.target.value);
					}}
					className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
					placeholder="Alternative Names"
				/>
				<input
					value={price}
					onChange={(e) => {
						setPrice(e.target.value);
					}}
					type="number"
					className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
					placeholder="Price"
				/>
				<input
					value={labeledPrice}
					onChange={(e) => {
						setLabeledPrice(e.target.value);
					}}
					type="number"
					className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
					placeholder="Labelled Price"
				/>
				<textarea
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
					placeholder="Description"
				/>
				<input
					type="file"
					onChange={(e) => {
						setImages(e.target.files);
					}}
					multiple
					className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
					placeholder="Product Images"
				/>

				{/* stock */}
				<input
					value={stock}
					onChange={(e) => {
						setStock(e.target.value);
					}}
					type="number"
					className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
					placeholder="Stock"
				/>
				<div className="w-[400px]  h-[100px]  flex justify-between items-center rounded-lg">
					<Link
						to={"/admin/products"}
						className="bg-red-500 text-white p-[10px] w-[180px] text-center rounded-lg  hover:bg-red-600 "
					>
						Cancel
					</Link>
					<button
						onClick={handleSubmit}
						className="bg-green-500 cursor-pointer text-white p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-green-600"
					>
						Add Product
					</button>
				</div>
			</div>
		</div>
	);
}
