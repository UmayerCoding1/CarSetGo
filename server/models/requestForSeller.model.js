import mongoose, { Schema, model } from "mongoose";

const requestForSellerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requried: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirm"],
      default: "pending",
    },
  },
  { timestamp: true }
);


export const RequestForSeller = model('RequestForSeller', requestForSellerSchema);