import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const Review = model('Review',  reviewSchema);