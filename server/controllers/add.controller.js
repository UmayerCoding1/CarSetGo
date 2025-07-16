import { Add } from "../models/add.model.js";
import { Car } from "../models/car.model.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.service.js";

export const postAds = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      image,
      phone,
      email,
      productUrl,
      carId,
    } = req.body;
    const userId = req.userId;

    if (
      !title ||
      !description ||
      !price ||
      !phone ||
      !image ||
      !email ||
      !productUrl ||
      !carId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (userId !== req.body.userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found", success: false });
    }

    const user = await User.findById(userId);

    const adsData = {
      userId,
      carId,
      adsData: {
        title,
        description,
        price,
        image,
        phone,
        email,
        productUrl,
      },
    };

    if (user.plan !== "free") {
      const newAdd = await Add.create(adsData);

      console.log(newAdd);
      car.add = newAdd._id;
      car.addCredits = true;
      await car.save();
      return res
        .status(200)
        .json({ message: "Add created successfully", success: true });
    }
  } catch (error) {
    console.log("Car add create error", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

export const uploadProductImage = async (req, res) => {
  try {
    const productLocalPath = req.file?.path;
    console.log(productLocalPath);

    const productImage = await uploadCloudinary(productLocalPath);

    if (!productImage) {
      return res.status(500).json({
        message: "Product image upload failed, try again",
        success: false,
      });
    }

    return res.status(200).json({ url: productImage.url, success: true });
  } catch (error) {
    console.log("product image upload error", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
