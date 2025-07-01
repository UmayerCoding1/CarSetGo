import { TrackPlatform } from "../../models/trackPlatform.model.js";

export const getAdminAnalyticsState = async (req, res) => {
  const isAdmin = req.isAdmin;
  if(!isAdmin) return res.status(403).json({ message: "Access denied. Admins only." });


   try {

    // find total use platform
    const platforms = await TrackPlatform.find();
    const web = platforms.filter(platform => platform.platform === 'Web');
    const mobile = platforms.filter(platform => platform.platform === 'Mobile');
    const teackPlatformData = {web: web.length, mobile: mobile.length};

    
    
   } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
   }
  
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


