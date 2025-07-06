import React, { useState } from "react";
import { Camera, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { callPostApis } from "../../api/api";
const SearchInput = () => {
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTextValue, setSearchTextValue] = useState("");
  const [searchImageUploadActive, setSearchImageUploadActive] = useState(false);

  const navigate = useNavigate();
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less then 5MB");
        return;
      }

      setIsUploading(true);
      setSearchImage(file);

      const render = new FileReader();

      render.onloadend = () => {
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
    if (searchTextValue.trim() === "") {
      toast.error("Please enter a search query");
      return;
    }

    navigate(`/future-cars?search=${searchTextValue}`);
  };
  const handleImageSubmit = (e) => {
    e.preventDefault();
  };

  const handleImageSearch = async () => {
    setSearchImageUploadActive(true);
    const formData = new FormData();
    formData.append("carImage", searchImage);

    try {
      const res = await callPostApis(`/cars/image-search`, formData);

      if (res.data) {
        setSearchImageUploadActive(false);
        navigate(
          `/future-cars?make=${res.data.make}&model=${res.data.model}&year=${res.data.fuelType}&price=${res.data.price}`
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="w-full md:w-[470px] lg:w-[670px]">
      <div className="relative w-full">
        <form
          onSubmit={handleTextSubmit}
          className="bg-white w-full md:w-[470px] lg:w-[670px] h-14 rounded-full flex items-center justify-between gap-2 mb-2 p-2 shadow-lg border border-gray-200 transition-all duration-300 focus-within:shadow-2xl"
        >
          <input
            onChange={(e) => setSearchTextValue(e.target.value)}
            className="h-full w-full text-lg font-medium outline-none pl-3 bg-transparent placeholder-gray-400 focus:placeholder-gray-300 transition-colors"
            type="text"
            placeholder="Search your dream car: Make, model, or use AI image search..."
          />

          <div className="flex items-center h-full gap-2">
            <Camera
              size={32}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className={`transition-colors duration-200 p-2 rounded-full cursor-pointer border-2 ${
                isImageSearchActive
                  ? "bg-black text-white border-black shadow"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
              title="AI Image Search"
            />
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="bg-black hover:bg-gray-900 text-white text-base w-24 h-full rounded-full cursor-pointer font-semibold shadow transition-colors duration-200"
            >
              Search
            </motion.button>
          </div>
        </form>

        {isImageSearchActive && (
          <div className="w-full absolute left-0 z-20">
            <div
              className={`bg-white shadow-2xl ${
                imagePreview ? "h-60" : "h-52"
              } rounded-3xl border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center w-full transition-all duration-300`}
            >
              <form onSubmit={handleImageSubmit} className="w-full h-full">
                {imagePreview ? (
                  <div className="flex flex-col items-center justify-between gap-2">
                    <img
                      src={imagePreview}
                      alt="car preview"
                      loading="lazy"
                      className="w-64 h-40 object-cover rounded-xl border border-gray-200 shadow"
                    />
                    <div className="flex items-center gap-3 mt-2">
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => {
                          setIsUploading(false);
                          setImagePreview(null);
                          toast.info("Image Removed");
                        }}
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer font-semibold shadow transition-colors duration-200"
                      >
                        Remove Image
                      </motion.button>
                      <motion.button
                        onClick={() => handleImageSearch()}
                        whileTap={{ scale: 0.92 }}
                        type="submit"
                        disabled={isUploading}
                        className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-lg cursor-pointer font-semibold shadow transition-colors duration-200"
                      >
                        {searchImageUploadActive
                          ? "Uploading..."
                          : "Search with this Image"}
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className="w-full h-full cursor-pointer flex flex-col items-center justify-center transition-all duration-200 hover:bg-gray-50 rounded-2xl"
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-500 mb-2 font-medium">
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
