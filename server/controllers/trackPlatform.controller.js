import { TrackPlatform } from "../models/trackPlatform.model.js";

export const createTrackPlatform = async (req, res) => {
    try {
        const {platform} = req.body;

        // const result = await TrackPlatform.create({
        //     platform
        // });
console.log(platform);

        return res.status(200).json({success: true})
    } catch (error) {
        console.log(error);
        
        return res
              .status(500)
              .json({ message: "Internal server error", success: false });
    }
}