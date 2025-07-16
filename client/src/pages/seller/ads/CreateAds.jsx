import React, { useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { callGetApis, callPostApis } from "../../../api/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const CreateAds = () => {
  const [adsData, setAdsData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    phone: "",
    email: "",
    productUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showAdsPolicy, setShowAdsPolicy] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const { user } = useAuth();
  const carId = useParams();

  const { data: car = {} } = useQuery({
    queryKey: ["car"],
    queryFn: async () => {
      if (!carId?.id) throw new Error("carId is missing");
      const res = await callGetApis(`/car/${carId?.id}`);
      return res.data;
    },
  });

  const handleChange = (e) => {
    setAdsData({ ...adsData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUploaded(true);
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      const formData = new FormData();
      formData.append("image", file);
      const res = await callPostApis("/ads/image", formData);
      if (res.success) {
        setAdsData({ ...adsData, image: res.url });
        setImageUploaded(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return;
    }

    try {
      const res = await callPostApis(`/ads`, {
        ...adsData,
        carId: car._id,
        userId: user._id,
      });
      console.log(res);

      if (res.success) {
        toast.success(res.message, { duration: 1000 });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message, { duration: 1000 });
    }
  };

  console.log(car?.add );

  return (
    <div className="px-4 py-10 flex items-center  justify-between p-10">
      <div className="flex-1">
        <h2>Create Ads</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 flex-1 bg-white shadow-md rounded-2xl space-y-5"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>

        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            value={adsData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            required
            value={adsData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            type="number"
            name="price"
            required
            value={adsData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="w-full file:border file:border-gray-300 file:rounded-lg file:p-2 file:bg-gray-100"
          />

          {imageUploaded ? (
            <>
              <Loader2 size={20} className="animate-spin" />
            </>
          ) : (
            <>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 w-40 " />
              )}
            </>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={adsData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={adsData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Product URL</label>
          <input
            type="url"
            name="productUrl"
            required
            value={adsData.productUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default CreateAds;
