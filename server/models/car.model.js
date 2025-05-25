import { Schema, model } from "mongoose";

// Enum for CarStatus (mimicking Prisma's enum)
const CarStatus = {
  AVAILABLE: "available",
  SOLD: "sold",
  BOOKED: "booked",
};

const carSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    color: { type: String, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    bodyType: { type: String, required: true },
    seats: { type: Number, default: 4 }, // Optional seats field
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(CarStatus),
      default: CarStatus.AVAILABLE,
    },
    featured: { type: Boolean, default: false },
    images: [{ type: String }], // Array of image URLs
    bookingBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dealership: [{ type: Schema.Types.ObjectId, ref: "Dealership" }],
    seller: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, required: true },
    postType: { type: String, required: true, enum: ['booking', 'selling'] },
    paymentsystem: [
      {
        type: {
          type: String,
          required: true,
          enum: ["upfront", "emi", "full payment"],
        },
        description: {
          type: String,
        },
      },
    ],
    addCredits : {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

// Indexes (similar to Prisma's @@index directive)
carSchema.index({ make: 1, model: 1 });
carSchema.index({ bodyType: 1 });
carSchema.index({ price: 1 });
carSchema.index({ year: 1 });
carSchema.index({ status: 1 });
carSchema.index({ fuelType: 1 });
carSchema.index({ featured: 1 });

// Creating the model
export const Car = model("Car", carSchema);
