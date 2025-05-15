import { Car } from "../models/car.model.js";
import { Dealership } from "../models/dealership.model.js";

export const createDealership = async (req, res) => {
  const { name, address, phone, email, userId, carId, sellerId } = req.body;

  if (!name || !address || !phone || !email || !userId || !carId || !sellerId) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {

    const existingDealership = await Dealership.findOne({$and: [{userId}, {carId}]});
    if(existingDealership){
      return res.status(400).json({message: "Dealership already exists", success: false});
    }
    const dealership = await Dealership.create({
      name,
      address,
      phone,
      email,
      userId,
      carId,
      sellerId,
    });

    await Car.findByIdAndUpdate(carId, 
        { $push: { dealership: dealership._id },
        $set: { status: "booked" }
        
     });
    return res.status(201).json({
      message: "Dealership created successfully",
      success: true,
    
    });
  } catch (error) {
    console.log("error in create dealership");
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getDealership = async (req, res) => {
  const { userId } = req.params;
  try {
    const dealership = await Dealership.find({ userId })
      .populate({path: "carId", select: "make model year images price"})
      .populate({path: "sellerId", select: "fullname email avatar"});

    return res
      .status(200)
      .json({
        message: "Dealership fetched successfully",
        success: true,
        dealership,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


export const getDealershipBySeller = async (req, res) => {
  const { sellerId } = req.body;
  try {
    const dealership = await Dealership.find({ sellerId });
    return res.status(200).json({ message: "Dealership fetched successfully", success: true, dealership });
  } catch (error) { 
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


