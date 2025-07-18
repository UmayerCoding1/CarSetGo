import { SaveCars } from "../models/save.car.model.js";
import { User } from "../models/user.model.js";

export const saveCar = async (req, res) => {
  const { carId, userId } = req.body;
  if (!carId || !userId) {
    return res.status(400).json({ message: "Car ID and User ID are required" });
  }

  try {
    const existingSave = await SaveCars.findOne({ carId, userId });
    if (existingSave) {
      return res.status(400).json({ message: "Car already saved", success: false });
    }

    const newSave = await SaveCars.create({ carId, userId });

    if (newSave) {
      const user = await User.findById(userId);
      if (user) {
        user.savedCars.push(carId);
        await user.save();
      }
    }
    res.status(200).json({ message: "Car saved successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSavedCars = async (req, res) => {
  const { userId } = req.params;
 const {page, limit} = req.query;
 
 

  try {
    const savedCars = await SaveCars.find({ userId }).limit(limit).skip((page - 1) * limit).populate("carId");
    res
      .status(200)
      .json({ message: "Saved cars fetched successfully", savedCars, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const unsaveCar = async (req, res) => {

  const { carId, userId } = req.query;
 
   
  if (!carId || !userId) {
    return res.status(400).json({ message: "Car ID and User ID are required" });
  }

  try {
   const existingSave = await SaveCars.findOneAndDelete({ carId, userId });
if (!existingSave) {
  return res.status(400).json({ message: "Car not saved" });
}

const user = await User.findById(userId);
if (user) {
  user.savedCars = user.savedCars.filter((car) => car.toString() !== carId);
  await user.save();
}

res.status(200).json({ message: "Car unsaved successfully", success: true });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: error.message });
  }
};

