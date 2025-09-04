import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import {
  FiUploadCloud,
  FiX,
  FiHash,
  FiType,
  FiTag,
  FiDollarSign,
  FiInfo,
  FiBox,
  FiRefreshCw,
} from "react-icons/fi";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const MAX_IMAGES = 8;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export default function AddProduct() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState([]); // tags
  const [altInput, setAltInput] = useState("");
  const [price, setPrice] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]); // [{file, url, id}]
  const [submitting, setSubmitting] = useState(false);
  const [uploadStep, setUploadStep] = useState({ current: 0, total: 0 });

  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  const discountPercent = useMemo(() => {
    const lp = Number(labeledPrice || 0);
    const p = Number(price || 0);
    if (!lp || !p || lp <= p) return null;
    return Math.round(100 - (p / lp) * 100);
  }, [labeledPrice, price]);

  const handleAddAlt = (value) => {
    const clean = value.trim();
    if (!clean) return;
    if (!altNames.includes(clean)) {
      setAltNames((prev) => [...prev, clean]);
    }
    setAltInput("");
  };

  const handleAltKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddAlt(altInput);
    } else if (e.key === "Backspace" && !altInput && altNames.length) {
      // remove last on backspace
      setAltNames((prev) => prev.slice(0, -1));
    }
  };

  const handleFiles = (fileList) => {
    const currentCount = images.length;
    const incoming = Array.from(fileList || []);
    const valid = [];

    for (const f of incoming) {
      if (!ACCEPTED_TYPES.includes(f.type)) {
        toast.error(`Unsupported file type: ${f.name}`);
        continue;
      }
      valid.push(f);
    }

    const allowed = Math.max(0, MAX_IMAGES - currentCount);
    const final = valid.slice(0, allowed);

    if (final.length === 0) {
      if (images.length >= MAX_IMAGES) toast.error(`Max ${MAX_IMAGES} images allowed`);
      return;
    }

    const withPreviews = final.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...withPreviews]);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const generateIdFromName = () => {
    if (!name) {
      toast("Enter a product name first");
      return;
    }
    const base = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const id = `${base}-${Date.now().toString(36).slice(-4)}`;
    setProductId(id);
  };

  const validate = () => {
    if (!productId || !name) {
      toast.error("Product ID and Name are required");
      return false;
    }
    if (price === "" || Number(price) <= 0) {
      toast.error("Price must be a positive number");
      return false;
    }
    if (stock === "" || Number(stock) < 0) {
      toast.error("Stock must be 0 or greater");
      return false;
    }
    if (labeledPrice && Number(labeledPrice) < Number(price)) {
      // This is optional, depends on your use-case
      // toast("Tip: Labeled Price is usually higher than Price");
    }
    return true;
  };

  async function handleSubmit() {
    if (!validate()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add products");
      return;
    }

    setSubmitting(true);
    setUploadStep({ current: 0, total: images.length });

    try {
      // Upload images to Supabase
      const uploadedUrls = [];
      for (let i = 0; i < images.length; i++) {
        const file = images[i].file;
        const ext = file.name.split(".").pop().toLowerCase();
        const fileName = `products/${productId}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;

        const { data, error } = await supabase.storage.from("img").upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

        if (error) {
          console.error("Upload error:", error);
          toast.error(`Error uploading ${file.name}`);
          setSubmitting(false);
          return;
        }

        const publicUrl = supabase.storage.from("img").getPublicUrl(data.path).data.publicUrl;
        uploadedUrls.push(publicUrl);
        setUploadStep({ current: i + 1, total: images.length });
      }

      const product = {
        productId,
        name,
        altNames, // already an array of tags
        price: Number(price),
        labeledPrice: labeledPrice ? Number(labeledPrice) : 0,
        description,
        stock: Number(stock),
        images: uploadedUrls,
      };

      await axios.post(import.meta.env.VITE_API_URL + "/api/product/Create", product, {
        headers: { Authorization: "Bearer " + token },
      });

      toast.success("Product added successfully");
      // Reset form (optional)
      resetForm();
      // Navigate as needed
      navigate("/Product"); // adjust if your route differs
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Product adding failed");
    } finally {
      setSubmitting(false);
    }
  }

  const resetForm = () => {
    setProductId("");
    setName("");
    setAltNames([]);
    setAltInput("");
    setPrice("");
    setLabeledPrice("");
    setDescription("");
    setStock("");
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages([]);
    setUploadStep({ current: 0, total: 0 });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Add Product</h1>
        <div className="text-sm text-gray-400">
          {submitting && uploadStep.total > 0
            ? `Uploading ${uploadStep.current}/${uploadStep.total}`
            : null}
        </div>
      </div>

      {/* Form grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Basic info */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <FiHash /> Product ID
            </label>
            <button
              onClick={generateIdFromName}
              className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
              type="button"
            >
              Generate from name
            </button>
          </div>
          <input
            type="text"
            placeholder="e.g. headset-xyz-1"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/20"
          />

          <label className="text-sm text-gray-300 flex items-center gap-2">
            <FiType /> Product Name
          </label>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/20"
          />

          <label className="text-sm text-gray-300 flex items-center gap-2">
            <FiTag /> Alternative Names
          </label>
          <div className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10">
            <div className="flex flex-wrap gap-2">
              {altNames.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs"
                >
                  {tag}
                  <button
                    onClick={() =>
                      setAltNames((prev) => prev.filter((t) => t !== tag))
                    }
                    className="hover:text-rose-300"
                    type="button"
                  >
                    <FiX />
                  </button>
                </span>
              ))}
              <input
                value={altInput}
                onChange={(e) => setAltInput(e.target.value)}
                onKeyDown={handleAltKeyDown}
                placeholder={altNames.length ? "Add more…" : "Type and press Enter"}
                className="flex-1 min-w-[160px] bg-transparent outline-none text-sm placeholder:text-gray-500"
              />
            </div>
          </div>

          <label className="text-sm text-gray-300">Description</label>
          <textarea
            placeholder="Short product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/20"
          />
        </div>

        {/* Right: Pricing and stock */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-4">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <FiDollarSign /> Price
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 49.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Labeled Price (optional)</label>
              {discountPercent !== null && (
                <span className="text-xs px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {discountPercent}% off
                </span>
              )}
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 59.99"
              value={labeledPrice}
              onChange={(e) => setLabeledPrice(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/20"
            />
          </div>

          <label className="text-sm text-gray-300 flex items-center gap-2">
            <FiBox /> Stock
          </label>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 100"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/20"
          />

          <div className="text-xs text-gray-400 flex items-start gap-2">
            <FiInfo className="mt-0.5 shrink-0" />
            Ensure prices are accurate; Labeled Price is the crossed-out MSRP if you want to show a discount.
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div
          className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center bg-black/20 hover:bg-black/10 transition"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={onDrop}
          onClick={() => inputFileRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          <input
            ref={inputFileRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="flex flex-col items-center gap-2">
            <FiUploadCloud className="text-2xl" />
            <div className="text-sm">
              Drag & drop images here, or click to browse
            </div>
            <div className="text-xs text-gray-400">
              PNG, JPG, WEBP — up to {MAX_IMAGES} images
            </div>
          </div>
        </div>

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/30"
              >
                <img
                  src={img.url}
                  alt="preview"
                  className="h-32 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80"
                  title="Remove"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
          disabled={submitting}
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition ${
            submitting ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {submitting && <FiRefreshCw className="animate-spin" />}
          Add Product
        </button>
      </div>
    </div>
  );
}