import { Booking } from "../../models/booking.model.js";
import { Car } from "../../models/car.model.js";
import { Dealership } from "../../models/dealership.model.js";
import mongoose, { isObjectIdOrHexString } from "mongoose";
import { Review } from "../../models/review.model.js";
export const getSellerAnalyticsState = async (req, res) => {
  const sellerId = req.sellerId;

  if (!sellerId) {
    return res
      .status(400)
      .json({ message: "This user is not a selller!", success: false });
  }

  if (!isObjectIdOrHexString(sellerId)) {
    return res.status(400).send({ error: "Invalid seller ID" });
  }

  const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
  // find total car
  const totalCar = await Car.find({ seller: sellerId }).countDocuments();

  // find active booking
  const bookings = await Booking.find({ sellerId: sellerId });
  const activeBookings = bookings.filter(
    (booking) => booking.status !== "completed"
  );

  // find total sells cars
  const totalCarSells = await Dealership.find({ sellerId }).countDocuments();



//    find total review 
const   totalReviews = await Review.find({ sellerId: sellerId }).countDocuments();
  // Seller total revenue
  const carSells = await Dealership.aggregate([
    {
      $match: {
        sellerId: sellerObjectId,
        "paymentInfo.paymentStatus": "success",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$paymentInfo.paymentAmount" },
      },
    },
  ]);

  const carBookings = await Booking.aggregate([
    { $match: { sellerId: sellerObjectId, paymentStatus: "success" } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
        totalBookings: { $sum: 1 },
      },
    },
  ]);

  console.log("carBookings", carBookings);

  const sellRevenue = carSells[0]?.totalRevenue || 0;
  const bookingRevenue = carBookings[0]?.totalRevenue || 0;
  const totalRevenue = sellRevenue + bookingRevenue;

  return res.json({
    totalRevenue,
    sellRevenue,
    bookingRevenue,
    totalCar,
    totalCarSells,
    activeBookings: activeBookings.length,
    totalReviews,
    success: true
  });
};
