import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
      name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bookingStartDate: {
      type: Date,
      required: true,
    },
    bookingEndDate: {
      type: Date,
      required: true,
    },
    
    totalPrice: {
      type: Number,
      required: true,
    },
   
    pickupLocation: {
      type: String,
      required: true,
    },
    
    durationType: {
      type: String,
      enum: ["hour", "day", "week"],
      default: "hour",
    },
    duration: {
      type: Number,
      required: true,
    },
    numberOfPassengers: { 
      type: Number,
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "processing"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking =  mongoose.model("Booking", bookingSchema);
