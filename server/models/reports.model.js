import { Schema, Types, model } from "mongoose";

const reportSchema = new Schema(
  {
    reporterId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    carId: {
        type: Schema.Types.ObjectId,
        ref: "Car",
        
    },
    reportedUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reportReason: {
        type: String,
        required: true,
    },
    reportStatus: {
        type: String,
        enum: ["pending", "resolved"],
        default: "pending",
    },
    reportDate: {
        type: Date,
        default: Date.now,
    },
    reportDescription: {
        type: String,
        required: true, 
    },
  
  },
  {
    timestamps: true,
  }
);


export const Report = model("Report", reportSchema);