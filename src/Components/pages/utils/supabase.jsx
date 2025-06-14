import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import toast from "react-hot-toast";

export function SupabaseUploader() {
    const [file, setFile] = useState(null);
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
    function handleUpload() {  
        supabase.storage
            .from('img')
            .upload(file.name, file,
                {
                    cacheControl: '3600',
                    upsert: false,
                }
            )
            .then(({ data, error }) => {
                if (error) {
                    toast.error("Upload failed:", error);
                } else {
                    toast.success("File uploaded successfully:", data);
                }
            })
            .catch((err) => {
                toast.error("Error uploading file:", err);
            });
      }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Upload
            </button>
        </div>
    );
}