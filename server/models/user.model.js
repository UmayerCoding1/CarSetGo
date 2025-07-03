import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    username: { type: String },
    password: { type: String },
    avatar: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "seller", "admin","blacklisted"],
      default: "user",
    },
    paymentstatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    isGoogleAccount: { type: Boolean, default: false },
    plan: {
      type: String,
      enum: ["free", "pro", "advanced"],
    },
    isPlanActive: { type: Boolean, default: false },
    planDetails: {
      name: { type: String },
      price: { type: Number },
      features: {
        selingpostpermunth: { type: Number },
        bookingManagement: { type: Boolean },
        testDriveRequests: { type: Boolean },
        aiDescriptionGenerator: { type: Number },
        carPromotion: { type: Boolean },
        prioritySupport: { type: Boolean },
        verifiedSellerBadge: { type: Boolean },
        editpost: { type: Boolean },
        deletepost: { type: Boolean },
        unlimitedChat: { type: Boolean },
        adCreditsForPost: { type: Boolean },
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.role !== "seller") {
    this.paymentstatus = undefined;
  }

  next();
});

export const User = model("User", userSchema);
