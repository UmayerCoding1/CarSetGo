import { Car } from "../models/car.model.js";
import { User } from "../models/user.model.js";

export const getCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    // Get filter parameters from query
    const { price, make, bodyType, fuelType,search} = req.query;
    console.log(req.query);
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

     car.seller.password = undefined;

    
    

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
    const {make,model,year,price,mileage, color, fuelType, transmission, bodyType, seats, description, status, featured, images, bookingBy, seller, category, postType, paymentsystem} = req.body;


    const requiredFields = ['make', 'model', 'year', 'price', 'mileage', 'color', 'fuelType', 'transmission', 'bodyType', 'seats', 'description', 'status', 'featured', 'images', 'bookingBy', 'seller', 'category', 'postType', 'paymentsystem'];

    for(const field of requiredFields){
      if ( !req.body[field]) {
        return res.status(400).json({message: `${field} is required`});
      }
    }

    if (postType !== 'sell' && postType !== 'rent') {
      return res.status(400).json({message: 'Invalid post type'});
    } 

    const user = await User.findById( seller);

    if(user.role !== 'seller'){
      return res.status(403).json({message: 'Only sellers can post cars'});
    }

    
    
    

    const car = await Car.create({make,model,year,price,mileage, color, fuelType, transmission, bodyType, seats, description, status, featured, images, bookingBy, seller, category, postType, paymentsystem});

    return res.status(201).json({message: 'Car posted successfully', car, success: true});
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({message: 'Internal server error', error: error.message});
  }
}




