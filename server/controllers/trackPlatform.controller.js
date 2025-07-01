export const createTrackPlatform = async (req, res) => {
    try {
        const {platform} = req.body;
    } catch (error) {
        return res
              .status(500)
              .json({ message: "Internal server error", success: false });
    }
}