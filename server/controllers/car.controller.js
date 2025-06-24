import mongoose from "mongoose";
import { Car } from "../models/car.model.js";
import { User } from "../models/user.model.js";
import { AlAnalyzeCarImage } from "../utils/car.js";
import { log } from "console";
import { uploadCloudinary } from "../utils/cloudinary.service.js";


export const getCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    // Get filter parameters from query
    const { price, make, bodyType, fuelType,search} = req.query;
  
    // Build filter object
    const filter = {};

    // Add filters only if they are provided
    if (price) {
      filter.price = { $lte: parseInt(price) };
    }
    if (make) {
      filter.make = {$regex : make, $options : 'i'};
    }
    if (bodyType) {
      filter.bodyType = {$regex : bodyType, $options : 'i'};
    }
    if (fuelType) {
      filter.fuelType = {$regex : fuelType, $options : 'i'};
    }

    if (search) {
      filter.make = { $regex: search, $options: 'i' };
    }

    
    

    // Get total count of cars with filters
    const totalcar = await Car.countDocuments(filter);
    const totalPage = Math.ceil(totalcar / limit);
  
   
    // Get paginated cars with filters
    const cars = await Car.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: cars,
      pagination: {
        currentPage: page,
        totalPages: totalPage,
        totalCars: totalcar,
        limit,
      },
      message: "Cars fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cars",
      error: error.message,
    });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
   
    
    const car = await Car.findById(id).populate('seller').select('-password');
    
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    //  car.seller.password = undefined;

    
    

    return res.status(200).json({
      success: true,
      data: car,
      message: "Cars fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};


export const getCarByCategory = async (req, res) => {
    try {
      const { category } = req.params;
      console.log(category);
      
      const cars = await Car.find({ make: category });
  
      if (!cars) {
        return res.status(404).json({
          success: false,
          message: "Cars not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: cars,
        message: "Cars fetched successfully",
      });
    } catch (error) {
      return res.status(500).json({});
    }
  };


// post car

export const postCar = async (req, res) => {
  try {
    const {make,model,year,price,mileage, color, fuelType, transmission, bodyType, seats, description,   seller, category, postType} = req.body;
   

  
  
    const requiredFields = ['make', 'model', 'year', 'price', 'mileage', 'color', 'fuelType', 'transmission', 'bodyType', 'seats', 'description',    'seller', 'category', 'postType', ];

    for(const field of requiredFields){
      if ( !req.body[field]) {
        return res.status(400).json({message: `${field} is required`});
      }
    }

    if (postType !== "selling" && postType !== 'booking') {
      return res.status(400).json({message: 'Invalid post type'});
    } 

    const user = await User.findById( seller).populate('planDetails');

    if(!user && user.role !== 'seller'){
      return res.status(403).json({message: 'Only sellers can post cars'});
    }


    const plan = user.planDetails;

    if(!plan || plan.features.selingpostpermunth  <= 0) {
      return res.status(403).json({ message: 'Post limit reached. Upgrade your plan.'});
    }


    
    

     const carImages = req.files;
    const imageUrl = [];

    for (const image of carImages) {
      const isValidUrl =await uploadCloudinary(image.path);

      if(isValidUrl){
        imageUrl.push(isValidUrl.url);
      }
    }

   
    

    
    
    if (imageUrl.length === 0) {
      return res.status(400).json({message: 'At least one image is required'});
    }
    
    const car = await Car.create({
      make,
      model,
      year,
      price,
      mileage,
      color,
      fuelType,
      transmission,
      bodyType,
      seats,
      description,
      images: imageUrl,
      seller,
      category,
      postType
    });

    
    
 
    plan.features.selingpostpermunth -= 1;
    await user.save();
   
   

    return res.status(201).json({message: 'Car posted successfully', car, success: true});
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({message: 'Internal server error', error: error.message});
  }
};


export const updateCarById = async (req, res) => {
  try {
    const id = req.query.id;
    const data = req.body;

    const existinCarAndUpdate = await Car.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });

    if (!existinCarAndUpdate) {
      return res.status(400).json({ message: "Car not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Car updated successfully.", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};


export const deleteSellerCarById = async (req, res) => {
  try {
    const { carId, sellerId } = req.params;
    console.log(carId, sellerId);
    
    const user = await User.findById(sellerId);

    if(!user) return res.status(404).json({message: "User not found", success: false})
    const deletedCar = await Car.findOneAndDelete({
      _id: carId,
      seller: sellerId,
    });

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found", success: false });
    }




    return res.status(200).json({ message: "Delete car in successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const getCarsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { postType, searchValue, page, limit } = req.query;

   
    // Validate sellerId
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }

    // Optional: Check if seller actually exists
    const user = await User.findById(sellerId);
    if (!user) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const filter = {};

    if (postType) filter.postType = postType;

    if (searchValue) filter.make = { $regex: searchValue, $options: "i" };
    if (sellerId) filter.seller = sellerId;

    const totalCars = await Car.countDocuments(filter);
    const totalPages = Math.ceil(totalCars / (limit ? parseInt(limit) : 10));
    const skip =
      (page ? parseInt(page) - 1 : 1) * (limit ? parseInt(limit) : 10);

    // Fetch cars posted by the seller
    const cars = await Car.find(filter)
      .populate("seller", "name email role")
      .skip(skip)
      .limit(limit ? parseInt(limit) : 10)
      .sort({ createdAt: -1 })
      .lean();

    // Check if any cars found
    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No cars found for this seller" });
    }

    // Success response
    return res.status(200).json({
      success: true,
      data: {
        cars,
        totalPages,
        totalCars,
        currentPage: Number(page)
      },
      message: "Cars fetched successfully",
    });
  } catch (error) {
    console.error('Error fetching cars by seller:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};




// AI car image analysis
export const analyzeCarImage = async (req, res) => {
  try {
      const file = req.file;
    const userId = req.userId;

    if(!file){
      return res.status(400).json({message: 'No image file provided'});
    }

    const carDetails = await AlAnalyzeCarImage(file);
    
    
    if(!carDetails.success){
      return res.status(400).json({message: carDetails.error});
    } else {
      return res.status(200).json({message: carDetails.message, data: carDetails.data});
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  
    
    
}


// AI car description generation
 export const generateCarDescription = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.userId;
    
    if(!file){
      return res.status(400).json({message: 'No image file provided'});
    }

    const user = await User.findById(userId).populate('planDetails');
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }

    if(user.role !== 'seller'){
      return res.status(403).json({message: 'Only sellers can post cars'});
    }

    if(!user.isPlanActive){
      return res.status(403).json({message: 'Please activate your plan to post cars'});
    }

    if(user.planType === 'free'){
      return res.status(403).json({message: 'Please upgrade your plan to use AI features'});
    }

    if(user.planDetails.aiDescriptionGenerator <= 0){
      return res.status(403).json({message: 'You have no remaining AI description generator.'});
    }

    const carDetails = await AlAnalyzeCarImage(file);

    if(!carDetails.success){
      return res.status(500).json({
        success: false,
        message: 'Failed to analyze car image',
        error: carDetails.error
      });
    }

    

    user.planDetails.features.aiDescriptionGenerator -= 1;
    await user.save();

    
    


    
    

    return res.status(200).json({
      success: true,
      message: 'Car description generated successfully',
      carDetails: carDetails.data
    });
     
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
 }


 

