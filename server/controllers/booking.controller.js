import { Booking } from "../models/booking.model.js";
import { Car } from "../models/car.model.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    if (!bookings) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }
    return res.status(200).json({ bookings, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createBooking = async (req, res) => {
  const { bookingData } = req.body;

  const {
    name,
    email,
    phone,
    pickupLocation,
    numberOfPassengers,
    duration,
    durationType,
    bookingStartDate,
    bookingEndDate,
    totalPrice,
    carId,
    userId,
    sellerId,
  } = bookingData;

  for (const key in bookingData) {
    if (!bookingData[key]) {
      return res.status(400).json({ message: "All fields are required" });
    }
  }

  const totalPriceAndServiceFee = totalPrice + totalPrice * 0.1;

  try {
    const existingBooking = await Booking.findOne({
      userId,
      sellerId,
      carId,
      status: "pending",
    });
   
    

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "You have already booked this car", success: false });
    }
    const booking = await Booking.create({
      ...bookingData,
      totalPrice: totalPriceAndServiceFee.toFixed(2),
    });

    const bookingCar = await Car.findByIdAndUpdate(carId, {
      $push: {
        bookingBy: booking._id,
      },
    });

    return res
      .status(201)
      .json({ message: "Booking created successfully", success: true });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookings = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ userId }).populate("carId sellerId");
    if (!bookings) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }

 
    return res.status(200).json({ bookings, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const checkExistingBookings = async (req, res) => {
  const { startDate, endDate , carId} = req.query;
  try {
    const existingBooking = await Booking.findOne({
      carId,
      status: "pending",
      $or: [
        { bookingStartDate: { $lte: endDate }, bookingEndDate: { $gte: startDate } },
      ]
    })

    if(existingBooking){
      return res.status(200).json({ existingBooking, message: "Car is already booked for the selected dates", success: true });
    }
    
    return res.status(200).json({ existingBooking, message: "Car is not booked for the selected dates", success: false });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookingsBySeller = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const bookings = await Booking.find({ sellerId });
    if (!bookings) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }
    return res.status(200).json({ bookings, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Booking status updated successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBooking = async (req, res) => {
  const bookingId  = req.params.bookingId;
  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Booking deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
