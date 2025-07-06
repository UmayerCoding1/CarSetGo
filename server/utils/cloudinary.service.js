import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config("../.env");

const configInfo = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localPath) => {
  try {
    if (!localPath) return null;

    const respone = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localPath);

    return respone;
  } catch (error) {
    fs.unlinkSync(localPath);
    return null;
  }
};

export { uploadCloudinary };
