import React, { useState } from "react";
import { Camera, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import {motion} from 'motion/react';
const SearchInput = () => {
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTextValue,setSearchTextValue] = useState('');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less then 5MB");
        return;
      }

      setIsUploading(true);
      setSearchImage(file);

      const render = new FileReader();

      render.onloadend = () => {
        console.log(render);
        setImagePreview(render.result);
        setIsUploading(false);
        toast.success("Image upload successfully");
      };

      render.onerror = () => {
        setIsUploading(false);
        toast.error("Failed to read the image");
      };

      render.readAsDataURL(file);
    }
  };
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: { "image/*": [".jpeg", ".jpg", ".png"] },
      maxFiles: 1,
    });

  const handleTextSubmit = (e) => {
    e.preventDefault();
  };
  const handleImageSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full md:w-[470px] lg:w-[670px]">
      <div className="relative w-full">
        <form
          onSubmit={handleTextSubmit}
          className="bg-white w-full md:w-[470px] lg:w-[670px] h-14 rounded-3xl flex items-center justify-between gap-2 mb-2 p-2"
        >
          <input
            onChange={(e) => setSearchTextValue(e.target.value)}
            className="h-full w-full text-lg font-medium outline-none pl-1"
            type="text"
            placeholder="Search your Dream car. Make,model, or use our AI image srarch..."
          />

          <div className="flex items-center h-full gap-2">
            <Camera
              size={32}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className={`${
                isImageSearchActive
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } p-2  rounded-full cursor-pointer`}
            />
            <motion.button whileTap={{scale: 0.8}} className="bg-black text-white text-sm w-20 h-full rounded-lg cursor-pointer">
              Search
            </motion.button>
          </div>
        </form>

        {isImageSearchActive && (
          <div className="w-full  absolute  left-0 ">
            <div
            className={`bg-white    ${
              imagePreview ? "h-60" : "h-52"
            }   rounded-4xl border-2 border-dashed border-black p-2 flex flex-col items-center justify-center w-full`}
          >
            <form onSubmit={handleImageSubmit} className="w-full h-full">
              {imagePreview ? (
                <div className="flex  flex-col items-center justify-between">
                  <img
                    src={imagePreview}
                    alt="car preview"
                    loading="lazy"
                    className="w-64 h-40"
                  />

                  <div className="flex items-center gap-3">
                  <motion.button
                  whileTap={{scale: 0.8}}
                  onClick={() => {
                    setIsUploading(false);
                    setImagePreview(null);

                    toast.info('Image Remove')
                  }}
                    type="button"
                    className="bg-red-500 text-white p-2 mt-2 rounded-lg cursor-pointer"
                  >
                    Remove Image
                  </motion.button>

                  <motion.button whileTap={{scale: 0.8}} type="submit" disabled={isUploading} className="mt-2 p-2 bg-black text-white rounded-lg cursor-pointer">
                        {isUploading 
                        ? 'Uploding'
                        : "Search with this Image" //after fecth car by image to add Analyzing image
                      }
                   </motion.button>
                  </div>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className=" w-full h-full cursor-pointer "
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-500 mb-2">
                      {isDragActive && !isDragReject
                        ? "Leave the file here to upload"
                        : "Drag & drop a car image or click to select"}
                    </p>
                    {isDragReject && (
                      <p className="text-red-500 mb-2">Invalid image type</p>
                    )}
                    <p className="text-gray-400 text-sm">
                      Supports: JPG, PNG (max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </form>
            
          </div>

         
          
          </div>
                
        )}
      </div>
    </div>
  );
};

export default SearchInput;
