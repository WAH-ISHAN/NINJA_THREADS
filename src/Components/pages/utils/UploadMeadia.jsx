import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiUploadCloud,
  FiX,
  FiCopy,
  FiExternalLink,
  FiFileText,
  FiImage,
  FiVideo,
  FiMusic,
  FiRefreshCw,
} from "react-icons/fi";
import uploadMedia from "../utils/MediaUpdate";

export default function UploadMedia() {
  const [file, setFile] = useState(null); // File | null
  const [previewUrl, setPreviewUrl] = useState(""); // object URL
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  // Config
  const ACCEPT = "image/*,video/*,audio/*,application/pdf";
  const MAX_SIZE_MB = 20;

  const formatBytes = (bytes = 0) => {
    const sizes = ["B", "KB", "MB", "GB"];
    if (bytes === 0) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
    // eslint-disable-next-line
  };

  const isImage = (f) => f?.type?.startsWith("image/");
  const isVideo = (f) => f?.type?.startsWith("video/");
  const isAudio = (f) => f?.type?.startsWith("audio/");

  // Preview management
  useEffect(() => {
    if (file && isImage(file)) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (file && (isVideo(file) || isAudio(file))) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [file]);

  const validateFile = (f) => {
    if (!f) return false;
    const sizeMb = f.size / (1024 * 1024);
    if (sizeMb > MAX_SIZE_MB) {
      toast.error(`File too large. Max ${MAX_SIZE_MB}MB`);
      return false;
    }
    // You can add more validation rules here
    return true;
  };

  const pickFile = () => inputRef.current?.click();

  const handleFileChange = (fileList) => {
    const f = fileList?.[0];
    if (!f) return;
    if (!validateFile(f)) return;
    setFile(f);
    setUploadedUrl("");
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadMedia(file);
      setUploadedUrl(url);
      toast.success("File uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const clearSelection = () => {
    setFile(null);
    setUploadedUrl("");
    setPreviewUrl("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(uploadedUrl);
      toast.success("URL copied to clipboard");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-5 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Upload Media</h2>
        <p className="text-sm text-gray-400 mb-4">
          Drag & drop your file here or click to browse. Supported: images, videos, audio, PDF. Max {MAX_SIZE_MB}MB.
        </p>

        {/* Dropzone */}
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pickFile()}
          onClick={pickFile}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={onDrop}
          className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition
            ${dragActive ? "border-emerald-400 bg-emerald-500/5" : "border-white/15 bg-black/20 hover:bg-black/10"}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
          />
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <FiUploadCloud className="text-xl" />
            </div>
            <div className="text-sm">
              <span className="text-white font-medium">Click to upload</span> or drag and drop
            </div>
            <div className="text-xs text-gray-400">
              {ACCEPT.replaceAll(",", ", ")} • up to {MAX_SIZE_MB}MB
            </div>
          </div>
        </div>

        {/* Selected file info and preview */}
        {file && (
          <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center shrink-0">
                  {isImage(file) ? (
                    <FiImage />
                  ) : isVideo(file) ? (
                    <FiVideo />
                  ) : isAudio(file) ? (
                    <FiMusic />
                  ) : (
                    <FiFileText />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{file.name}</div>
                  <div className="text-xs text-gray-400">
                    {file.type || "unknown"} • {formatBytes(file.size)}
                  </div>
                </div>
              </div>
              <button
                onClick={clearSelection}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                title="Clear"
              >
                <FiX />
              </button>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="mt-3">
                {isImage(file) && (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="max-h-60 w-full object-contain rounded-lg border border-white/10"
                  />
                )}
                {isVideo(file) && (
                  <video
                    src={previewUrl}
                    controls
                    className="max-h-60 w-full rounded-lg border border-white/10"
                  />
                )}
                {isAudio(file) && (
                  <audio
                    src={previewUrl}
                    controls
                    className="w-full mt-1"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={clearSelection}
            disabled={!file || uploading}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50"
          >
            Clear
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition disabled:opacity-60`}
          >
            {uploading ? <FiRefreshCw className="animate-spin" /> : <FiUploadCloud />}
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Result */}
        {uploadedUrl && (
          <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-2">
            <div className="text-xs truncate flex-1">{uploadedUrl}</div>
            <button
              onClick={copyUrl}
              className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm"
              title="Copy URL"
            >
              <FiCopy />
            </button>
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm"
              title="Open"
            >
              <FiExternalLink />
            </a>
          </div>
        )}
      </div>

      <ToastContainer position="top-center" theme="dark" autoClose={2200} />
    </div>
  );
}