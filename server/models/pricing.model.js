import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Free", "Pro", "Advanced"],
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
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
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

// Middleware to auto-assign feature values based on plan name
pricingPlanSchema.pre("save", function (next) {
  const planFeatures = {
    Free: {
      selingpostpermunth: 1,
      bookingManagement: false,
      testDriveRequests: false,
      aiDescriptionGenerator: 0,
      carPromotion: false,
      prioritySupport: false,
      verifiedSellerBadge: false,
      editpost: false,
      deletepost: true,
      unlimitedChat: false,
      adCreditsForPost: false,
    },
    Pro: {
      selingpostpermunth: 6,
      bookingManagement: true,
      testDriveRequests: true,
      aiDescriptionGenerator: 6,
      carPromotion: false,
      prioritySupport: false,
      verifiedSellerBadge: true,
      editpost: true,
      deletepost: true,
      unlimitedChat: true,
      adCreditsForPost: false,
    },
    Advanced: {
      selingpostpermunth: 12,
      bookingManagement: true,
      testDriveRequests: true,
      aiDescriptionGenerator: 12,
      carPromotion: true,
      prioritySupport: true,
      verifiedSellerBadge: true,
      editpost: true,
      deletepost: true,
      unlimitedChat: true,
      adCreditsForPost: true,
    },
  };

  const defaults = planFeatures[this.name] || {};
  this.features = { ...defaults }; // overwrite the features with default values based on plan name

  next();
});

export const PricingPlan = mongoose.model("PricingPlan", pricingPlanSchema);

