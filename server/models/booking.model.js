import mongoose, { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    bookingStartDate: {
      type: String,
      required: true,
    },
    bookingEndDate: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'confirm'],
    }
  },
  { timestamps: true }
);


export const Booking = model('Booking', bookingSchema);