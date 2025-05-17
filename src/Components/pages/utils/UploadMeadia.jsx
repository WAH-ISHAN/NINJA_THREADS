import { file,setFile } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadMedia from "../utils/MediaUpdate";

export default function UploadMedia() {
  
  function handleUpload() {
    uploadMedia(file).then(
        (url) => {
            console.log(url);
            toast.success("File uploaded successfully");
        
  }).catch((err) => {
        console.error(err);
        toast.error("Error uploading file");
      })
}

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button
        onClick={handleUpload}
        className="bg-gray-700 text-white p-2 rounded-lg mt-2"
      >
        Upload
      </button>
      <ToastContainer />
    </div>
  );
}
