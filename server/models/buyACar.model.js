import mongoose, { Schema, model } from "mongoose";

const buyCarSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  carId: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true
  },
  dealershipFormId: {
    type: Schema.Types.ObjectId,
    ref: "Dealership",
    required: true
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    required: true
  },
 
}, { timestamps: true });

export const BuyCar = model('BuyCar', buyCarSchema);
