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


export const clearDealership = async (req,res) => {
   const {dealershipId} = req.body;
   try {
    const dealership = await Dealership.findByIdAndUpdate(dealershipId, {
      $set: {status: "cancelled"}
    });
    if(!dealership){
      return res.status(400).json({message: "Dealership not found", success: false});
    }
    await Car.findByIdAndUpdate(dealership.carId, {
      $pull: {dealership: dealershipId},
      $set: {status: "available"}
    });
    
    return res.status(200).json({message: "Dealership cancelled successfully", success: true});
   } catch (error) {
    res.status(500).json({message: "Internal server error", success: false});
   }
}

export const getDealershipBySeller = async (req, res) => {
  const { sellerId } = req.params;

 
  
  const dealership = await Dealership.find({ sellerId })
    .populate({path: "carId", select: "make model year images price"})
    .populate({path: "userId", select: "fullname email avatar"});

  const validDealership = dealership.filter((dealership) => dealership.status !== "rejected");
  
  
  return res
    .status(200)
    .json({
      message: "Dealership fetched successfully",
      success: true,
      validDealership,
    });
};


export const rejectedDealershipRequest = async (req,res) => {
  try {
    const {requestId,status} = req.body;

    if (!requestId || !status) {
      return res.status(400).json({message: 'All credential are requried', success: false});
    }

    const existRequest = await Dealership.findByIdAndUpdate(
      requestId,
      {$set: {
        "status": status
      }},
      {new: true}
    );
    if (!existRequest) {
      return res.status(404).json({message: 'Request not found', success: false});
    }

    return res.status(200).json({message: 'Request rejected successfully', success: true});

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({message: 'Internal server error'})
  }

}


