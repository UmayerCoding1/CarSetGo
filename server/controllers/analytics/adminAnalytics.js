import { TrackPlatform } from "../../models/trackPlatform.model.js";

export const getAdminAnalyticsState = async (req, res) => {
  const isAdmin = req.isAdmin;
  if(!isAdmin) return res.status(403).json({ message: "Access denied. Admins only." });


  
  
};

export const trackPlatform = async (req, res) => {
  const { platform } = req.body;
  try {
    const result = await TrackPlatform.create({ platform });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


