import {Schema,model} from "mongoose";

const trackPlatformSchema = new Schema({
    platform: {
    type: String,
    enum: ["Web", "Mobile"],
    required: true,
  },
},{timestamps: true});

export const TrackPlatform = model('TrackPlatform', trackPlatformSchema);